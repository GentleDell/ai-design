import React from 'react';
import { Checkbox } from 'antd';

interface IPictureProps {
  width: number;
  height: number;
  image: string;
  selected: boolean;
  index: number;
  handleCheck: (index: number) => void;
}

export default function Picture(props: IPictureProps) {
  const { width, height, image, selected, index, handleCheck } = props;

  return (
    <div>
      <Checkbox checked={selected} onChange={() => handleCheck(index)} />
      <img
        key={`${image}`}
        src={`data:image/png;base64,${image}`}
        width={width}
        height={height}
        alt="generated"
      />
    </div>
  );
}
