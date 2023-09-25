import seo from "@/utils/seo";
import PageContent from "./PageContent";

export async function generateMetadata() {
  return seo({ title: "PPT" });
}

export default function PPT() {
  return <PageContent />;
}
