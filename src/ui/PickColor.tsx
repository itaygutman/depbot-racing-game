import React from 'react';

const ColorPicker = (props: Partial<ColorPickerBaseProps<string>>) => <div>Color Picker</div>;

export const PickColor = () => (
  <ColorPicker color="#ffffff" pickcolor={true} />
);

