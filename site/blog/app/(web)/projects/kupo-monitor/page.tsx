import Footer from "@/app/(web)/components/Footer";
import seo from "@/utils/seo";

import PicGallery from "../components/PicGallery";

export async function generateMetadata() {
  return seo({
    title: "事中监控平台",
    description:
      "针对金融机构提供对各类金融活动产生的的事件进行监控管理降低业务风险。提供针对事件的预警管理、案件管理，以及黑白名单、规则引挚、策略包、数据看盘等方面功能。",
  });
}

const pic_url01 = "/images/projects/kupo-monitor/monitor-01.png";
const pic_url02 = "/images/projects/kupo-monitor/monitor-02.png";
const pic_url03 = "/images/projects/kupo-monitor/monitor-03.png";
const pic_url04 = "/images/projects/kupo-monitor/monitor-04.png";
const pic_url05 = "/images/projects/kupo-monitor/monitor-05.png";
const pic_url06 = "/images/projects/kupo-monitor/monitor-06.png";
const pic_urlDashboard = "/images/projects/kupo-monitor/monitor-dashboard.png";
const pic_url08 = "/images/projects/kupo-monitor/rule-01.png";
const pic_url09 = "/images/projects/kupo-monitor/rule-02.png";
const pic_url10 = "/images/projects/kupo-monitor/rule-03.png";
const pic_url11 = "/images/projects/kupo-monitor/rule-04.png";

export default function Preview() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert mx-auto">
        <h2>事中监控平台</h2>
        <p>
          针对金融机构提供对各类金融活动产生的的事件进行监控管理降低业务风险。提供针对事件的预警管理、案件管理，以及黑白名单、规则引挚、策略包、数据看盘等方面功能。
        </p>
        <h4>所用技术</h4>
        <p>
          react@^18、antd@^4、@ant-design/pro-components@^2、@antv/g6@^v4、@antv/g2@^4、@antv/l7@^4、umi@^4、less、qiankun
        </p>

        <h4>项目展示</h4>
        <PicGallery
          id="kupo-monitor"
          images={[
            { url: pic_url01, thumbnail: pic_url01, width: 1920, height: 946 },
            { url: pic_url02, thumbnail: pic_url02, width: 1920, height: 946 },
            { url: pic_url03, thumbnail: pic_url03, width: 1920, height: 946 },
            { url: pic_url04, thumbnail: pic_url04, width: 1920, height: 946 },
            { url: pic_url05, thumbnail: pic_url05, width: 1920, height: 946 },
            { url: pic_url06, thumbnail: pic_url06, width: 1920, height: 946 },
            {
              url: pic_urlDashboard,
              thumbnail: pic_urlDashboard,
              width: 1920,
              height: 1470,
            },
            { url: pic_url08, thumbnail: pic_url08, width: 1920, height: 946 },
            { url: pic_url09, thumbnail: pic_url09, width: 1920, height: 946 },
            { url: pic_url10, thumbnail: pic_url10, width: 1920, height: 946 },
            { url: pic_url11, thumbnail: pic_url11, width: 1920, height: 946 },
          ]}
        />
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
