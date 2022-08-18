import IconFolder from "../Icons/folder";
import "./styles.scss";

export default ({ title, type }: { title: string; type?: string }) => (
  <span className={`post-category post-category-${type}`}>
    <IconFolder />
    {title}
  </span>
);
