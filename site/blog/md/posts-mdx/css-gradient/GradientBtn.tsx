import "./styles.scss";

// import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default function GradientBtn() {
  return (
    <button className="relative flex justify-center items-center css">
      这是一个渐变圆角按钮
    </button>
  );

  //   return (
  //     <LiveProvider code="<strong>Hello World!</strong>">
  //       <LiveEditor />
  //       <LiveError />
  //       <LivePreview />
  //     </LiveProvider>
  //   );
}
