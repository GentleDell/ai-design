import { Button, Divider, Layout, theme } from 'antd';
import './index.less';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PrevewPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { images } = location.state;

  return (
    <Layout hasSider className="previewPage">
      <Layout.Sider theme="light" width={400} className="sider" />
      <Layout className="pageContent">
        <Layout.Header
          style={{
            background: colorBgContainer,
          }}
          className="header"
        >
          <span className="title">预览页面</span>
        </Layout.Header>
        <Layout.Content className="content">
          <PhotoProvider>
            {images.length > 0 &&
              images.map((image: string | undefined) => (
                <PhotoView
                  key={`${image}`}
                  src={`data:image/png;base64,${image}`}
                >
                  <img
                    key={`${image}`}
                    src={`data:image/png;base64,${image}`}
                    width="256"
                    alt={image}
                  />
                </PhotoView>
              ))}
          </PhotoProvider>
        </Layout.Content>
        <Divider />
        <Layout.Footer className="footer">
          <Button type="primary" onClick={() => navigate('/')}>
            返回
          </Button>
          <Button type="primary">垃圾篓</Button>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
