import React from 'react';
import { Checkbox } from 'antd';
import ReactImageMagnify from '@blacklab/react-image-magnify';

interface IPictureProps {
  width: number;
  height: number;
  image: string;
  selected: boolean;
  index: number;
  handleCheck: (index: number) => void;
  className: string;
}

export default function Picture(props: IPictureProps) {
  const { className, width, height, image, selected, index, handleCheck } =
    props;

  return (
    <div className={className}>
      <Checkbox checked={selected} onChange={() => handleCheck(index)} />
      {/* <img
        key={`${image}`}
        src={`data:image/png;base64,${image}`}
        width={width}
        height={height}
        alt="generated"
      /> */}
      <ReactImageMagnify
        imageProps={{
          alt: 'generated',
          src: `data:image/png;base64,${image}`,
          width,
          height,
        }}
        magnifiedImageProps={{
          src: `data:image/png;base64,${image}`,
          width: 4 * width,
          height: 4 * height,
        }}
      />
    </div>
  );
}
