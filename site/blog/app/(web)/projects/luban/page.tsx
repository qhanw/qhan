import Footer from "@/app/(web)/components/Footer";
import seo from "@/utils/seo";
import Image from "next/image";

import PicGallery from "../components/PicGallery";

import pics from "./images";

export async function generateMetadata() {
  return seo({
    title: "鲁班系统",
    description:
      "微信客户端逆向工具，用于支撑课程顾问、班主任老师对客户转化、社群运营的诉求，协助一线老师完成销售、运营目标。",
  });
}

export default function Preview() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert mx-auto">
        <h2>鲁班系统</h2>
        <p>
          包含桌面端与WEB端，定位于关注精细化运营、高效运营支撑。主要支撑课程顾问、班主任老师对客户转化、社群运营的诉求，协助一线老师完成销售、运营目标。
        </p>
        <h4>所用技术</h4>
        <p>react、antd、electron、node、c++、umi、less</p>

        <h4>项目展示（桌面端）</h4>
        <PicGallery id="luban-electron" images={pics} />
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
