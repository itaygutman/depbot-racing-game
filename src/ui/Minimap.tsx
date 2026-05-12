import React from 'react';

const MinimapTexture = () => <canvas />;

export const Minimap = () => (
  <>  
    <ambientLight />  
    <sprite />
    <spriteMaterial />
    <MinimapTexture />
  </>
);

// Adding declarations for the intrinsic elements used in the Minimap component
declare global {  
  namespace JSX {  
    interface IntrinsicElements {  
      ambientLight: any;  
      sprite: any;  
      spriteMaterial: any;  
    }  
  }  
}