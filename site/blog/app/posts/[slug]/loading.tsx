import ContentLoader from "react-content-loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <ContentLoader viewBox="0 0 400 100">
        <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
        <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
        <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
      </ContentLoader>
      <ContentLoader viewBox="0 0 400 100">
        <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
        <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
        <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
      </ContentLoader>
    </>
  );
}
