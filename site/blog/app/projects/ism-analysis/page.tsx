import Footer from "@/app/components/Footer";
import seo from "@/utils/seo";

import PicGallery from "./PicGallery";

export async function generateMetadata() {
  return seo({ title: "Projects" });
}

const pic_url = "/images/projects/ism-analysis/IMG_3008.jpg";

export default function Preview() {
  return (
    <>
      <div className="prose mx-auto">
        <h3>智能制度解析</h3>
        <p>
          关注于银行金融方面规章制度的自动解析与分析，便于相关人员快速掌握规章制度。提供对制度的导入、解析、分词、标注、核对、图谱生成、对比等方面的支持。
        </p>

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
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
