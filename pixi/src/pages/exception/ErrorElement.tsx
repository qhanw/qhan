import { useAsyncError } from 'react-router-dom';
import { Result } from 'antd';

export default function ErrorElement() {
  const error = useAsyncError() as Error;

  return <Result status="error" title="Uh Oh, something went wrong!" subTitle={error.message} />;
}
