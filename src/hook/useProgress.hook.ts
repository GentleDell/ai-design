import { message } from 'antd';
import { useState } from 'react';

export const useProgress = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState<string | null>(null);

  const query = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${url}:${port}/sdapi/v1/progress?${new URLSearchParams({
          skip_current_image: 'false',
        })}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await res.json();
      setResult(json);
      setImage(json.current_image);
    } catch (err: any) {
      setError(err.message);
      message.error(err.message);
    }
    setLoading(false);
  };

  return { error, loading, result, image, query };
};
