import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useSelector } from './useSelector.hook';
import { setUrl } from '../redux/Txt2imgState/Txt2imgSlice';

export const useTxt2img = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [images, setImages] = useState<any[]>([]);

  const dispatch = useDispatch();

  const txt2imgSettings = useSelector((state) => state.txt2img.settings);

  dispatch(setUrl(`${url}:${port}`));

  const txt2img = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('txt2imgSettings', txt2imgSettings);
      const res = await fetch(`${url}:${port}/sdapi/v1/txt2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(txt2imgSettings),
      });
      // console.log("res in hook", res);
      if (res.status === 200) {
        const json = await res.json();
        setImages(json.images);
        setResult(json);
      } else {
        const json = await res.json();
        setError(json.error);
      }
    } catch (err: any) {
      // console.log("err in hook", err);
      setError(err.message);
      message.error(err.message);
    }
    setLoading(false);
  };

  return { images, error, loading, result, txt2img };
};
