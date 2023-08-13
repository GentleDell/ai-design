import { Button, Divider, Layout, theme } from 'antd';
import DropDownForm from 'components/DropDownForm/DropDownForm';
import './index.less';
import { useEffect, useState } from 'react';
import Picture from 'components/Picture';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImages, setLoadingImages] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<boolean[]>([]);
  // const [PreviewImages, setPreviewImages] = useState<string[]>(new Array(0));
  // const [recycleImages, setRecycleImages] = useState<string[]>(new Array(0));
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImages(new Array(images.length).fill(false));
    }
  }, [images]);

  const handleCheck = (index: number) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = !newSelectedImages[index];
    setSelectedImages(newSelectedImages);
    console.log(newSelectedImages);
  };

  const handlePreview = () => {
    const newPreviewImages: string[] = [];
    const newImages: string[] = [];
    selectedImages.forEach((selected, index) => {
      if (selected) {
        newPreviewImages.push(images[index]);
      } else {
        newImages.push(images[index]);
      }
    });
    // setPreviewImages(newPreviewImages);
    setImages(newImages);
    navigate('/preview', { state: { images: newPreviewImages } });

    console.log(newPreviewImages);
    console.log(newImages);
  };

  const handleRecycle = () => {
    const newRecycleImages: string[] = [];
    const newImages: string[] = [];
    selectedImages.forEach((selected, index) => {
      if (selected) {
        newRecycleImages.push(images[index]);
      } else {
        newImages.push(images[index]);
      }
    });
    // setRecycleImages(newRecycleImages);
    setImages(newImages);
    // navigate('/recycle', { state: { images: newRecycleImages } });

    console.log(newRecycleImages);
    console.log(newImages);
  };

  return (
    <Layout hasSider className="mainPage">
      <Layout.Sider theme="light" width={400} className="sider">
        <DropDownForm
          setImages={setImages}
          setLoading={setLoading}
          setLoadingImages={setLoadingImages}
        />
      </Layout.Sider>
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
          <div className="pictures">
            {images.length > 0 &&
              images.map((image, index) => (
                <Picture
                  key={`${image}`}
                  image={image}
                  width={256}
                  height={256}
                  selected={selectedImages[index]}
                  index={index}
                  handleCheck={handleCheck}
                  className="picture"
                />
              ))}
          </div>
        </Layout.Content>
        <span className="checkText">
          已选择{selectedImages.filter((i) => i === true).length}张图片
        </span>
        <Divider />
        <Layout.Footer className="footer">
          <Button type="primary" onClick={handlePreview}>
            预览
          </Button>
          <Button type="primary" onClick={handleRecycle}>
            删除
          </Button>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
