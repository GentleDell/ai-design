import { Button, Form, Select, Slider } from 'antd';
import {
  collarOptions,
  designElementOptions,
  fitTypeOptions,
  garmentCategoryOptions,
  imageDetailOptions,
  lengthOptions,
  patternOptions,
  shoulderStyleOptions,
  sleeveLengthOptions,
  sleeveStyleOptions,
  styleOptions,
} from 'utils/consts/options';
import './index.less';
import { useEffect, useState } from 'react';
import { useTxt2img } from 'hook/useTxt2img.hook';
import { useProgress } from 'hook/useProgress.hook';
import { useDispatch, useSelector } from 'react-redux';
import { generatePrompt } from 'utils/consts/prompt';
import { RootState } from 'redux/store';
import { height, steps, width } from 'config/config';
import { setSettings as setTxt2imgSettings } from '../../redux/Txt2imgState/Txt2imgSlice';

interface IDropDownFormProps {
  setImages: any;
  setLoading: any;
  setLoadingImages: any;
}

export default function DropDownForm({
  setImages,
  setLoading,
  setLoadingImages,
}: IDropDownFormProps) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<any>(null);
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.txt2img.settings);

  const { query, result: result4 } = useProgress({
    url: 'http://127.0.0.1',
    port: '7861',
  });

  const {
    images: generatedImages,
    loading,
    txt2img,
  } = useTxt2img({
    url: 'http://127.0.0.1',
    port: '7861',
  });

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    if (generatedImages.length > 0) {
      setImages(generatedImages);
      clearInterval(intervalId!);
    }
  }, [generatedImages, intervalId, setImages]);

  useEffect(() => {
    if (result && result.current_image) {
      setLoadingImages(result.current_image);
    }
  }, [result, setLoadingImages]);

  useEffect(() => {
    if (result4) {
      setResult(result4);
    }
  }, [result4]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('changedValues', changedValues);
    console.log('allValues', allValues);
    dispatch(
      setTxt2imgSettings({
        ...settings,
        n_iter: allValues.picture_number,
        batch_size: allValues.group_number,
        steps,
        width,
        height,
        prompt: generatePrompt({
          garment_category: allValues.garment_category,
          style: allValues.style,
          clothes_length: allValues.clothes_length,
          fit_type: allValues.fit_type,
          version_type: allValues.version_type,
          design_element: allValues.design_element,
          sleeve_length: allValues.sleeve_length,
          collar_type: allValues.collar_type,
          sleeve_type: allValues.sleeve_type,
          shoulder_type: allValues.shoulder_type,
          picture_detail: allValues.picture_detail,
        }),
      })
    );
  };

  const handle2imgClick = () => {
    txt2img();
    const id = setInterval(() => {
      query();
    }, 1000);
    setIntervalId(id);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className="mainPageForm"
      onValuesChange={handleValuesChange}
      onFinish={handle2imgClick}
      initialValues={{
        picture_number: 1,
        group_number: 1,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="成衣品类"
        name="garment_category"
        className="item"
        rules={[{ required: true, message: 'Please input garment category!' }]}
      >
        <Select options={garmentCategoryOptions} />
      </Form.Item>

      <Form.Item
        label="风格"
        name="style"
        className="item"
        rules={[{ required: true, message: 'Please input style!' }]}
      >
        <Select options={styleOptions} />
      </Form.Item>

      <Form.Item
        label="衣长/裤长"
        name="clothes_length"
        className="item"
        rules={[{ required: true, message: 'Please input cloth length!' }]}
      >
        <Select options={lengthOptions} />
      </Form.Item>

      <Form.Item
        label="合身类型"
        name="fit_type"
        className="item"
        rules={[{ required: true, message: 'Please input fit type!' }]}
      >
        <Select options={fitTypeOptions} />
      </Form.Item>

      <Form.Item
        label="版型"
        name="version_type"
        className="item"
        rules={[{ required: true, message: 'Please input version type!' }]}
      >
        <Select options={patternOptions} />
      </Form.Item>

      <Form.Item
        label="设计元素"
        name="design_element"
        className="item"
        rules={[{ required: true, message: 'Please input design element!' }]}
      >
        <Select options={designElementOptions} />
      </Form.Item>

      <Form.Item
        label="袖长"
        name="sleeve_length"
        className="item"
        rules={[{ required: true, message: 'Please input sleeve length!' }]}
      >
        <Select options={sleeveLengthOptions} />
      </Form.Item>

      <Form.Item
        label="领型"
        name="collar_type"
        className="item"
        rules={[{ required: true, message: 'Please input collar type!' }]}
      >
        <Select options={collarOptions} />
      </Form.Item>

      <Form.Item
        label="袖型"
        name="sleeve_type"
        className="item"
        rules={[{ required: true, message: 'Please input sleeve type!' }]}
      >
        <Select options={sleeveStyleOptions} />
      </Form.Item>

      <Form.Item
        label="肩型"
        name="shoulder_type"
        className="item"
        rules={[{ required: true, message: 'Please input shoulder type!' }]}
      >
        <Select options={shoulderStyleOptions} />
      </Form.Item>

      <Form.Item
        label="图片细致程度"
        name="picture_detail"
        className="item"
        rules={[{ required: true, message: 'Please input picture detail!' }]}
      >
        <Select options={imageDetailOptions} />
      </Form.Item>

      <Form.Item label="图数" name="picture_number" className="item">
        <Slider min={1} max={10} />
      </Form.Item>

      <Form.Item label="组数" name="group_number" className="item">
        <Slider min={1} max={10} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          生成
        </Button>
      </Form.Item>
    </Form>
  );
}
