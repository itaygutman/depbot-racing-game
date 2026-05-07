import { SRGBColorSpace } from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Track(): JSX.Element {
  const { scene } = useLoader(GLTFLoader, '/models/track.glb')
  scene.traverse((child: any) => {
    if (child.isMesh && child.material.map) {
      child.material.map.colorSpace = SRGBColorSpace
    }
  })
  return <primitive object={scene} />
}
