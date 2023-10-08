---
title: E2E测试之Playwright身份验证
date: 2022-03-30T09:55:00+08:00
category: test
tags: [test, playwright, js]
---

### TOC

> 以下测试用例，均基于`ant design pro`编写。  
> 引自：https://www.yuque.com/qhan/dufpgr/mumkhw

## 初始登录

最简单、方便的登录验证是为每个测试都新初始化登录状态。在运行每个测试之前，运行一些浏览器自动化代码，这些代码执行用户登录及其它额包操作。

这种方式执行速度比较慢。其原因是，如果有`n(n>=0)`个测试，那么就需要执行`n(n>=0)`次登录。其好处是每个测试都有一个新的登录会话，例如：如果我们创建一个新用户，然后为这个用户的每个测试登录，这样就可以让测试彼此完全隔离。

### 独立

e2e/basic.e2e.spec.ts

```ts
import { test, expect } from '@playwright/test';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

test.describe('The sub page below the admin is rendered', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/user/login`);

    // 登录授权
    await page.waitForSelector('button[class="ant-btn ant-btn-primary ant-btn-lg"]');
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'ant.design');
    await page.click('button[class="ant-btn ant-btn-primary ant-btn-lg"]');
    await page.waitForNavigation(); // 登录后定向跳转
  });

  test('Sub page render', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/sub-page`);
    const title = page.locator('.ant-pro-page-container-content');
    await expect(title).toHaveText('这个页面只有 admin 权限才能查看');
  });
});
```

这些步骤可以针对每个浏览器上下文执行。但是，为每个测试重新登录可能会减慢测试执行速度。为了防止这种情况，我们将在新的浏览器上下文中重用现有的身份验证状态，详细见重用登录。也可以对登录进行封装抽象，不过在编写测试用例时减少了代码的工作量，但测试时间并未得到优化。

### 抽象

如果我们有多个依赖这个登录代码的测试文件，`beforeEach()`在每个文件中重复代码会变得有点麻烦。我们可以用 Playwright 的Page Object Model解决这个问题。页面对象模型允许我们在 Web 应用程序页面上创建抽象，以减少跨多个测试的代码重复。

首先，我们创建一个用户注册页面对象模型：

tests/config.ts

```ts
export const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;
```

tests/sign-page-model.ts

```ts
import type { Page } from '@playwright/test';

import { BASE_URL } from './config';

export class SignPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async login() {
    const { page } = this;
    await page.goto(`${BASE_URL}/user/login`);

    // 登录授权
    await page.waitForSelector('button[class="ant-btn ant-btn-primary ant-btn-lg"]');

    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'ant.design');
    await page.click('button[class="ant-btn ant-btn-primary ant-btn-lg"]');
    await page.waitForNavigation();
  }
}
```

简化的测试文件

```ts
import { test, expect } from '@playwright/test';
import { SignPage } from '../../tests/sign-page-model';
import { BASE_URL } from '../../tests/config';

test.describe('The sub page below the admin is rendered', () => {
  test('Sub page render', async ({ page }) => {
    const signIn = new SignPage(page);
    await signIn.login();
    await page.goto(`${BASE_URL}/admin/sub-page`);
    const title = page.locator('.ant-pro-page-container-content');
    await expect(title).toHaveText('这个页面只有 admin 权限才能查看');
  });
});
```

当然，只有当我们有多个测试文件时，这种重构才会开始带来好处。

## 重用登录

全局登录一次并在测试中重用状态。

全局设置身份验证或应用程序状态，必须在`Playwright`配置文件中定义一个全局设置脚本，该脚本在任何测试之前首先运行。在脚本中，自动执行浏览器进入所需状态（例如登录）及任何交互，然后将获取所有`cookie`和`storage`(本地和会话存储)数据，并通过`browserContext.storageState()`方法从经过身份验证的上下文中检索存储状态，然后创建具有预填充状态的新上下文。

tests/global-setup.ts

```ts
import { chromium } from '@playwright/test';

import { SignPage } from './sign-page-model';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const sign = new SignPage(page);
  await sign.login();

  await context.storageState({ path: './tests/.tmp/state.json' });
  await browser.close();
}
export default globalSetup;
```

playwright.config.ts

```diff
// playwright.config.ts
...
const config: PlaywrightTestConfig = {
+ globalSetup: require.resolve('./tests/global-setup'),
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
+   storageState: './tests/.tmp/state.json',
  },
  ...
};
export default config;
```

测试用例：

```ts
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../tests/config';

test.describe('The sub page below the admin is rendered', () => {
  test('Sub page render', async ({ page }) => {
    // 已经登录了,可以做任何想做的事情需要
    // 这里作为登录用户来实现我们的测试目标和断言
  });
});
```

现在每个测试都将使用相同的用户登录会话。

**其它**：在有不同上下文的不同状态数据时，可以通过`test.use()`方法在测试用列中，设置`storageState`配置选项，示例如下：

```ts
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../tests/config';

test.describe('The sub page below the admin is rendered', () => {
  test.use({ storageState: './tests/.tmp/state.json' });
  test('Sub page render', async ({ page }) => {
    // 已经登录了,可以做任何想做的事情需要
    // 这里作为登录用户来实现我们的测试目标和断言
  });
});
```

## 会话

思考???

## 国际化

在`playwright`中，默认为英语启动，在涉及到国际化项目中，我们需要对语言作一定的调整。

playwright.config.ts

```diff
// playwright.config.ts
...
const config: PlaywrightTestConfig = {
  use: {
  	 ...
+    locale: 'zh-CN', // 国际化处理，默认为英语
  },
  ...
};
export default config;
```

## 参考：

<https://playwright.dev/docs/auth>