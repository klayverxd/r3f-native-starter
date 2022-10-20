import React, { Suspense, useEffect, useState } from 'react'
import { useFrame, Canvas, useLoader } from '@react-three/fiber/native'
import { useAnimations, useGLTF, Environment } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { AnimationMixer } from 'three'

import * as THREE from 'three'
// import path from './assets/iphone.glb'
// import path from './assets/iphone/iphone.gltf'
// import path from './assets/Lisa-sem-anim.glb'
// import path from './assets/lisa-teste-5b/lisa-teste-5.glb'
import path from './assets/Xbot.glb'
// import path from './assets/Lisa-home.glb'
// import path from './assets/lisa/lisa.gltf'

export default function App() {
  const [loader] = useState(new GLTFLoader())
  const [scene] = useState(new THREE.Scene())
  // const [animations, setAnimations] = useState(null)
  // const [scene, setScene] = useState(null)
  const [mixer, setMixer] = useState(null)

  // const [camera] = useState(new THREE.PerspectiveCamera())
  // const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }))
  // const [clock] = useState(new THREE.Clock())

  function loadIdleAnimation() {
    const animation = animations.IDLE
    const idleAnimation = {
      ...animation,
      tracks: JSON.parse(animation.tracks),
    }

    const clip = AnimationClip.parse(idleAnimation)
    setIdleClip(clip)

    if (mixer) {
      mixer.clipAction(clip)
    }
  }

  function Model({ url, ...rest }) {
    loader.load(path, (gltf) => {
      const model = gltf.scene
      const mixer = new THREE.AnimationMixer(model)
      model.position.set(0, -4.2, 0)
      const clip = AnimationClip.findByName(gltf.animations, 'JANEIRO_dump')

      // const minimized = gltf.animations.map((animation) => {
      //   const clip = AnimationClip.toJSON(animation);
      //   const minimized = JSON.stringify(clip.tracks);

      //   return {
      //     ...clip,
      //     tracks: minimized
      //   };
      // });

      // console.log(minimized);

      loadIdleAnimation()
      scene.add(model)

      setMixer(mixer)
    })
    // const { scene, animations } = useGLTF(url)

    // const { actions } = useAnimations(animations, scene)

    // console.log({ actions })

    // setAnimations(animations)
    // setScene(scene)
    // useFrame(() => (scene.rotation.y += 0.03))
    // useFrame(() => (scene.rotation.x += 0.02))
    return <primitive {...rest} object={scene} />
  }

  // function lisaAnimation() {
  //   function animate() {
  //     if (mixer) mixer.update(Clock.getDelta() * animationSpeed)
  //     renderer.render(scene, camera)
  //   }

  //   renderer.setAnimationLoop(animate)
  // }

  // useEffect(() => {
  //   if (animations && scene) {
  //     const mixer = new AnimationMixer(scene)
  //     const clip = THREE.AnimationClip.findByName(animations, 'JANEIRO_dump')

  //     const action = mixer.clipAction(clip)

  //     action.play()
  //   }
  // }, [animations, scene])

  // useEffect(() => {
  //   lisaAnimation()
  // }, [mixer])

  return (
    <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        <Model url={path} />
      </Suspense>
    </Canvas>
  )
}
