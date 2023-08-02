import { Button, Divider, Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import DropDownForm from 'components/DropDownForm/DropDownForm';
import './index.less';
import { useState } from 'react';

export default function MainPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImages, setLoadingImages] = useState<string>('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider className="mainPage">
      <Sider theme="light" width={400} className="sider">
        <DropDownForm
          setImages={setImages}
          setLoading={setLoading}
          setLoadingImages={setLoadingImages}
        />
      </Sider>
      <Layout className="pageContent">
        <Layout.Header
          style={{
            background: colorBgContainer,
          }}
          className="header"
        >
          <span className="title">主页面</span>
        </Layout.Header>
        <Layout.Content className="content">
          {loading && (
            <>
              <div>loading...</div>
              {loadingImages && (
                <img
                  src={`data:image/png;base64,${loadingImages}`}
                  width="256"
                  alt={loadingImages}
                />
              )}
            </>
          )}
          {images.length > 0 &&
            images.map((image) => (
              <img
                key={`${image}`}
                src={`data:image/png;base64,${image}`}
                width="256"
                alt="generated"
              />
            ))}
        </Layout.Content>
        <Divider />
        <Layout.Footer className="footer">
          <Button type="primary">预览</Button>
          <Button type="primary">垃圾篓</Button>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
