import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Button, Result } from 'antd';

import Exception403 from './403';

export default function ErrorBoundary() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 403) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return <Exception403 />;
  }

  if (error.message.includes('Failed to fetch dynamically imported module')) {
    return (
      <Result
        status="error"
        title="The resource does not exist."
        subTitle={error.message}
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/')}>
            Go Home
          </Button>,
          <Button key="Refresh" onClick={() => window.location.reload()}>
            Refresh
          </Button>,
        ]}
      />
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
