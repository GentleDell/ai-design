export const PROMPT = 'a girl ';

interface valueInterface {
  garment_category: string;
  style: string;
  clothes_length: string;
  fit_type: string;
  version_type: string;
  design_element: string;
  sleeve_length: string;
  collar_type: string;
  sleeve_type: string;
  shoulder_type: string;
  picture_detail: string;
}

export const generatePrompt = (values: valueInterface) => {
  let prompt = PROMPT;
  prompt += ' wearing a ';
  prompt += values.garment_category;
  prompt += ' with ';
  prompt += values.style;
  prompt += ' style, ';
  prompt += values.clothes_length;
  prompt += ' length, ';
  prompt += values.fit_type;
  prompt += ' fit, ';
  prompt += values.version_type;
  prompt += ' version, ';
  prompt += values.design_element;
  prompt += ' design element, ';
  prompt += values.sleeve_length;
  prompt += ' sleeve length, ';
  prompt += values.collar_type;
  prompt += ' collar type, ';
  prompt += values.sleeve_type;
  prompt += ' sleeve type, ';
  prompt += values.shoulder_type;
  prompt += ' shoulder type, ';
  prompt += values.picture_detail;
  prompt += ' picture detail.';
  return prompt;
};
