import React from 'react';

const Gauge = () => <div>Gauge Component</div>;

export const Foreground = () => <div>Foreground Component</div>;

export const SpeedIndicator = () => (
  <>
    <Gauge />
    <Foreground />
  </>
);

