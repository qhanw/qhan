const router = require("koa-router")();


router
  .get("/", async ctx => {
    const html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
    ctx.body = html;
  });

module.exports = router;
