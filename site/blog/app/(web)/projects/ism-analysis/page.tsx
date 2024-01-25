import Footer from "@/app/(web)/components/Footer";
import seo from "@/utils/seo";
import Image from "next/image";

import PicGallery from "../components/PicGallery";

export async function generateMetadata() {
  return seo({ title: "Projects" });
}

const pics = new Array(15).fill("").map((_, idx) => {
  const url = `/images/projects/kupo-ism-analysis/${("" + (idx + 1)).padStart(
    2,
    "00"
  )}.jpg`;

  return { url, thumbnail: url, width: 3578, height: 1826 };
});

export default function Preview() {
  return (
    <>
      <div className="prose prose-gray mx-auto">
        <h2>智能制度解析</h2>

        <p>
          关注于银行金融方面规章制度的自动解析与分析，便于相关人员快速掌握规章制度。提供对制度的导入、解析、分词、标注、核对、图谱生成、对比等方面的支持。
        </p>
        <h4>主要功能</h4>
        <ul>
          <li>制度库：管理监管、金融机构相关制度。</li>
          <li>制度检索：用于查询相关制度，实现方式为模糊查询匹配。</li>
          <li>
            制度分析：用于两两制度对比、分析差异，找出问题所在，并出具项目分析报告。同时涵盖人工评价
          </li>
          <li>
            图谱管理：监管、金融机构制度图谱管理，提供制度的导入、解析、分词、标注、核对、图谱生成、对比等功能，并包括图谱升级等功能。
          </li>
          <li>系统管理：应用基本配置设置，如权限等基础功能。</li>
        </ul>
        <h4>所用技术</h4>
        <p>
          react@^18、antd@^4、@ant-design/pro-components@^2、@antv/g6@^v4、@antv/g2@^4、umi@^4、less、
          <a href="https://github.com/nlplab/brat" target="_blank">
            brat
          </a>
        </p>

        <h4>项目展示</h4>
        <PicGallery id="ism-analysis" images={pics} />

        <h4>前端架构</h4>
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          width={500}
          height={300}
          alt=""
          src="/images/projects/kupo-ism-analysis/architecture-diagram.jpeg"
        />
        <h4>核心流程-图谱管理</h4>
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          width={500}
          height={300}
          alt=""
          src="/images/projects/kupo-ism-analysis/graph-management-flowchart.jpeg"
        />
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
