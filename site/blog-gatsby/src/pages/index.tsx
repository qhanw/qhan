import { useEffect } from "react";
import { graphql, Link } from "gatsby";
import type { PageProps } from "gatsby";
import ScrollReveal from "scrollreveal";
import { CalendarIcon } from "@heroicons/react/24/outline";

import Seo from "../components/Seo";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <h1 className="mt-4 text-xl text-slate-900 tracking-tight max-w-5xl">
        前端开发工程师一枚，早年从事UI设计工作，现以前端开发为主，有丰富的ToB系统开发架构经验。喜欢工程化方面领域，喜欢交互设计。
      </h1>
      <ul className="mt-4 text-slate-500 font-light">
        <li>
          🎉 技术栈包括:
          NodeJs、React、Typescript、Electron、Antd、Sass、NextJs等。
        </li>
        <li>🌱 目前正在学习前端自动化测试方面知识。</li>
        <li>
          💬 如何联系我: 微信搜索 AsQhan 或邮箱：
          <a className="text-sky-500" href="mailto:whenhan@foxmail.com">
            whenhan@foxmail.com
          </a>
        </li>
      </ul>
      <h2 className="mb-8 mt-12 pb-2 text-xl text-slate-500 tracking-tight border-b border-slate-100">
        项目经历
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">鲁班系统</span>
              <span className="hidden text-slate-400 lg:block">
                React, Electron, NodeJs
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            包含桌面端与WEB端，定位于关注精细化运营、高效运营支撑。主要支撑课程顾问、班主任老师对客户转化、社群运营的诉求，协助一线老师完成销售、运营目标。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">工单系统</span>
              <span className="hidden text-slate-400 lg:block">
                React, Antd
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            包含WEB端、H5（微信客户端、钉钉管理端）。主要为解决公司内部业务上需要通过工单的方式进行流转的工作流程，降低在使用三方记录工具与人力占用的成本。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">权限平台</span>
              <span className="hidden text-slate-400 lg:block">
                React, Antd
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            微前端架构，内部中台系统、三方应用、员工部门及权限相关管理系统。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">仿真镜像平台</span>
              <span className="hidden text-slate-400 lg:block">
                React, Antd
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            克隆线上产品（如淘宝、天猫）环境的真实数据后，在镜像环境中能引流更多流量做更多真实的验证，包括核对监控等。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">
                倍事达管理系统
              </span>
              <span className="hidden text-slate-400 lg:block">
                React, Antd
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            一个PCO有害生物防治行业SaaS软件系统，主要服务于食品行业、连锁餐厅等PCO虫控企业用户。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">幼学空间</span>
              <span className="hidden text-slate-400 lg:block">
                React, Antd
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            一个集资源组织、专家、园长、后台管理及移动H5五个端所组成的中大型项目。主要用于管理幼儿教师资格认证、培训、幼儿教育、教育资源维护等功能。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">
                青少年毒品预防教育平台
                {/* http://www.jxjd627.com/ */}
              </span>
              <span className="hidden text-slate-400 lg:block">
                Jquery, RequireJS
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            针对青少年毒品知识的宣传与教育，加强青少年对毒品危害的认识。其方式有文章、视频、及毒品知识测试。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">
                营养健康专家端管理应用
              </span>
              <span className="hidden text-slate-400 lg:block">
                React, Redux, Sass, WeUI
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            用于营养专家对客户咨询支持以前专家对营养资讯及食谱和关注者的管理。
          </p>
        </div>
        <div className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100">
          <h2>
            <button className="flex gap-2 transition">
              <span className="absolute inset-0 rounded-xl"></span>
              <span className="font-semibold text-slate-900">
                DSP广告投放平台
              </span>
              <span className="hidden text-slate-400 lg:block">
                Angular, Mui, echarts
              </span>
            </button>
          </h2>
          <p className="mt-1 text-slate-500">
            用于广告投放管理包括了分时、资源、媒体、受众等报表以及创意、订单、用户等子系统，容括了广告投放等系列功能，便于使用者全面掌握当前自己的所有情况。
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const Head = () => <Seo title="主页" />;
