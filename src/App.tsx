import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

const App: React.FC = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75} // Add missing required prop
          near={0.1} // Add required prop
          far={1000} // Add required prop
        />
        {/* Other components go here */}
      </Suspense>
    </Canvas>
  );
};

export default App;