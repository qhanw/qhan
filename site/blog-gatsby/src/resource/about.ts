type AboutData = {
  type: "company" | "project";
  organization: string;

  position: string;
  date: string;
  tags?: string[];
  desc?: string;
  url?: string;
  duty?: string[];
};

const data: AboutData[] = [
  {
    type: "company",
    organization: "成都柠檬时光科技有限公司",
    position: "WEB前端工程师",
    date: "2018.04",
    tags: ["React", "Mobx", "AntDesign", "ES6", "Webpack"],
    desc: "参与小萌钱包后台管理系统开发，该项目以React技术体系作为前端开发技术栈，其功能主要为小萌钱包APP提供数据内容管理以及其它内容管理平台权限管理。",
  },
  {
    type: "project",
    organization: "大诺科学(H5)",
    position: "前端负责人",
    date: "2018.02 - 2018.04",
    tags: ["React", "Redux", "AntdMobile", "ES6", "SCSS", "Webpack"],
    desc: "该项目为用于对幼儿教师管理及幼儿成长管理，主要功能包括了资源管理（课程及素材管理）、社区社交互动、任务管理（任务树，大小任务创建维护）等功能。项目由react+redux搭建而成，并最终作为优课优信APP内嵌H5应用。",
  },
  {
    type: "project",
    organization: "优信直播管理平台",
    position: "前端负责人",
    date: "2017.10 - 2017.12",
    tags: ["React", "Redux", "AntDesign", "ES6", "SCSS", "Webpack"],
    desc: "该平台采用creact-react-app生成并集成scss，AntDesign一系列私有配置。该项目主要用于维护管理平台视频直播与录播，涉及校园活动事件管理与相关视频关联，以及发布视频人员、直播视频人员及各个组织个人对视频的观看操作等信息统计与维护。",
  },
  {
    type: "project",
    organization: "幼学空间",
    position: "前端负责人",
    date: "2017.07 - 2017.10",
    tags: ["React", "Redux", "AntDesign", "SCSS", "ES6", "Webpack"],
    desc: "幼学空间是一个集资源组织、专家、园长、后台管理及移动H5五个端所组成的中大型项目。主要用于管理幼儿教师资格认证、培训。涉及各类资源整合如：视频、图片、各类文本文件、测试试题题库、培训课程管理等。项目所用技术React、ES2015、antdesign、echarts、SASS、webpack。",
  },
  {
    type: "project",
    organization: "江西省青少年毒品预防教育平台官网站",
    position: "前端负责人",
    url: "http://www.jxjd627.com/index.html",
    date: "2017.03 - 2017.04",
    tags: ["JQuery", "RequireJS", "ArtTemplate", "Pug", "SCSS", "Gulp"],
    desc: "江西省青少年毒品预防教育平台官网站如其名称是一个对青少年毒品预防教育的平台，平台主要用于对毒品知识的宣传，其方式有文章、视频、及毒品知识测试。且包括了对个人测试的统计与评价。该官网实现方式也是采用前后端分离的方式完成，主要是利用RequireJS、artTemplate、SCSS、JQuery及其它插件完成。",
  },
  {
    type: "project",
    organization: "优课优信内嵌H5应用-营养健康专家端管理应用",
    position: "前端负责人",
    date: "2017.02 - 2017.03",
    tags: ["React", "Redux", "WeUI", "ES6", "SCSS", "Webpack"],
    desc: "项目利用Webpack2所构建，主要采有ES6标准进行开发，运用React+WeUI搭建项目，并采用react-router与redux分别作为路由与状态管理。该项目主要包括的功能有：1.专家个人基本信息展示；2. 免费咨询问展示与答复，专家导测、营养健康咨询（与客户端关联）；3.客户人群分组；4.食谱维护（新增、修改、删除等）；5.会话；",
  },
  {
    type: "project",
    organization: "应用平台管理系统",
    position: "模块功能开发",
    date: "2016.08 - 2017.03",
    tags: ["Angular 1.x", "JQuery", "UEditor", "Echarts"],
    desc: "该平台主要用于对优课优信APP各类内嵌应用管理，应用主要使用对象为学校及其它合作商。该平台实现技术主要是AngularJs以及各类插件所构建，目前所包含功能已非常之多，但根据不同权限所开放的功能也各有不同。目前本人所主涉及功能主要有：应用缴费管理、心理健康管理、营养健康管理",
  },
  {
    type: "company",
    organization: "四川福豆科技有限公司",
    position: "WEB前端工程师",
    date: "2016.08",
    // tags: ["React", "Redux", "AntDesign", "ES6", "Webpack"],
    // desc: "",
    duty: [
      "负责公司PC端各类应用管理平台功能开发",
      "负责公司移动端内嵌H5应用开发",
      "与公司团队制定前端团队开发规范",
      "确立公司前端技术选型",
      "协同后端与UI制定前后端分离后，协同开发规范",
    ],
  },
  {
    type: "project",
    organization: "信息统计平台",
    position: "前端开发",
    date: "2015.10 - 2015.12",
    tags: ["Angular 1.x", "JQuery", "RequireJS", "BootStrap", "Echarts"],
    desc: "该平台为DSP广告平台的子系统，主要用于广告投放平台的订单、趋势、来源、页面、访客等信息分析，利用报表及图表的形式进行形象展示，利于平台使用者更轻松和便捷的掌握当前广告投放的成效，从而优化广告投放方式。",
  },
  {
    type: "project",
    organization: "DSP广告平台系统2.0 (AngularJS)",
    position: "前端开发",
    date: "2015.03 - 2015.07",
    tags: ["Angular 1.x", "JQuery", "RequireJS", "BootStrap", "Echarts"],
    desc: "平台采用AngularJs作为项目框架实现视图与数据分离，达成前端组件化。系统集成JQuery、Bootstrap与RequireJS，并使用HTML5与CSS3完成页面制作，利用Select2、zTree、Bootstrap-Switch、eCharts、ionRangeSlider等插件构建平台功能。平台系统主要用于广告投放管理包括了分时、资源、媒体、受众等报表以及创意、订单、用户等管理等子系统，容括了广告投放等系列功能，便于使用者全面掌握当前自己的所有情况。",
  },
  {
    type: "project",
    organization: "DSP广告平台系统",
    position: "前端开发",
    date: "2014.02 - 2014.05",
    tags: ["JQuery", "RequireJS", "BootStrap", "Echarts", "EasyUI"],
    desc: "规划设计DSP广告平台，使用Bootstrap框架与RequireJS构建平台系统，使用HTML5与CSS3完成页面制作，利用EasyUI、Select2、Bootstrap-Switch、Amcharts、echarts等插件构建平台功能，运用JQUERY编写平台交互功能与效果。平台系统主要用于广告投放管理包括了分时、资源、媒体、受众等报表以及创意、订单、用户等管理等子系统，容括了广告投放等系列功能，便于使用者全面掌握当前自己的所有情况。",
  },
  {
    type: "company",
    organization: "广州信息技术科技有限公司",
    position: "WEB前端工程师/UI",
    date: "2013.10",
    duty: [
      "负责公司网站设与制作，及相关网站模板和兼容性处理，与后端完善数据与UI交互，优化各平台性能。",
      "负责公司CRM、DSP等系统平台设计与前端开发。",
    ],
  },
  {
    type: "project",
    organization: "IREAD网站开发",
    position: "前端设计",
    date: "2013.03 - 2013.05",
    tags: ["JQuery", "BootStrap", "PS", "HTML5", "CSS3"],
    desc: "使用PS进行网站页面设计，并运用HTML5、CSS3、JS根据设计稿进行切片布局，最大化还原页面效果。制定网站前端HTML、CSS规范，调试网站兼容性问题并更正，优化并维护网站性能及前端代码，运用JQUERY编写网站交互所用功能及效果。网站用于图书推广、与图书资源整合，实现书友摘抄记录，并作为公司旗下阅读APP的数据支持。",
  },
  {
    type: "company",
    organization: "成都君德鑫力达科技发展有限公司",
    position: "UI/前端",
    date: "2013.02",

    duty: [
      "负责公司网站设计制作及相关产品UI设计和前端开发维护，完善网站页面数据交互，解决网站应用兼容性问题。",
      "整合网站相关文件，进行网站重构，优化网站相关性能。",
    ],
  },
  {
    type: "company",
    organization: "毕业于成功理工大学",
    position: "大专",
    date: "2012.07",
    desc: "软件技术",
  },
];

export default data;
