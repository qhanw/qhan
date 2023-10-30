import Footer from "@/app/components/Footer";
import seo from "@/utils/seo";
import Image from "next/image";

import PicGallery from "../components/PicGallery";

export async function generateMetadata() {
  return seo({ title: "Projects" });
}

const pic_url = "/images/projects/kupo-ism-analysis/IMG_3008.jpg";

export default function Preview() {
  return (
    <>
      <div className="prose mx-auto">
        <h3>智能制度解析</h3>
        <p>
          关注于银行金融方面规章制度的自动解析与分析，便于相关人员快速掌握规章制度。提供对制度的导入、解析、分词、标注、核对、图谱生成、对比等方面的支持。
        </p>
        <h4>所用技术</h4>
        <div>
          react@^18、antd@^4、@ant-design/pro-components@^2、@antv/g6@^v4、@antv/g2@^4、umi@^4、less、
          <a href="https://github.com/nlplab/brat" target="_blank">
            brat
          </a>
        </div>

        <h4>项目展示</h4>
        <PicGallery
          id="ism-analysis"
          images={[
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
            { url: pic_url, thumbnail: pic_url, width: 1600, height: 1200 },
          ]}
        />

        <h4>前端架构</h4>
        <div className="relative aspect-auto">
          <img src="/images/projects/kupo-ism-analysis/architecture-diagram.jpeg" />
        </div>
        <h4>核心流程-图谱管理</h4>
        <img src="/images/projects/kupo-ism-analysis/graph-management-flowchart.jpeg" />
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
