import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { useFrame, Canvas, useLoader } from '@react-three/fiber/native'
import { useAnimations, useGLTF, Environment } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'
import path from './assets/lisa-teste-5b/lisa-teste-5.glb'
import { Alert, Button } from 'react-native'

let ACTIONS = null
let MIXER = null
let ANIMATIONS = null

export default function App() {
  const [pressed, setPressed] = useState(false)
  const [loadedModel, setLoadedModel] = useState(false)
  // const [loader] = useState(new GLTFLoader())
  const [sceneModel] = useState(new THREE.Scene())
  const [animations, setAnimations] = useState(null)
  // const [scene, setScene] = useState(null)
  // const [mixer, setMixer] = useState(null)

  // const [camera] = useState(new THREE.PerspectiveCamera())
  // const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }))
  // const [clock] = useState(new THREE.Clock())

  // const { scene, animations } = useGLTF(path)
  // const { ref, actions, names } = useAnimations(animations)

  // function loadIdleAnimation() {
  //   const animation = animations.IDLE
  //   const idleAnimation = {
  //     ...animation,
  //     tracks: JSON.parse(animation.tracks),
  //   }

  //   const clip = AnimationClip.parse(idleAnimation)
  //   setIdleClip(clip)

  //   if (mixer) {
  //     mixer.clipAction(clip)
  //   }
  // }

  function loadModel() {
    // loader.load(path, (gltf) => {
    //   const model = gltf.scene
    //   const mixer = new THREE.AnimationMixer(model)
    //   model.position.set(0, -4.2, 0)
    //   const clip = AnimationClip.findByName(gltf.animations, 'JANEIRO_dump')

    //   // const minimized = gltf.animations.map((animation) => {
    //   //   const clip = AnimationClip.toJSON(animation);
    //   //   const minimized = JSON.stringify(clip.tracks);

    //   //   return {
    //   //     ...clip,
    //   //     tracks: minimized
    //   //   };
    //   // });

    //   // console.log(minimized);

    //   loadIdleAnimation()
    //   scene.add(model)

    //   setMixer(mixer)
    // })

    const { scene, animations } = useGLTF(path)

    console.log(animations)

    sceneModel.add(scene)

    // const { ref, actions, names } = useAnimations(animations, scene)

    // setAnimations(animations)
    // setScene(scene)
    // useFrame(() => (scene.rotation.y += 0.03))
    // useFrame(() => (scene.rotation.x += 0.02))
    // return <primitive {...rest} object={scene} />
  }

  function AnimationController(props) {
    const { actions } = useAnimations(props.animations, props.ybotRef)

    // Storybook Knobs
    const actionOptions = Object.keys(actions)
    // const selectedAction = select('Animation', actionOptions, actionOptions[2])
    // const blendDuration = number('Blend duration', 0.5, {
    //   range: true,
    //   min: 0,
    //   max: 2,
    //   step: 0.1,
    // })

    useEffect(() => {
      actions[0]?.reset().play()
      // return () => void actions[0]?.fadeOut(blendDuration)
    }, [actions])

    return null
  }

  function Model() {
    const ybotRef = useRef(null)
    const { nodes, scene, animations } = useGLTF(path)
    const { ref, mixer, actions, names } = useAnimations(animations, ybotRef)

    console.log(Object.keys(nodes))

    ACTIONS = actions
    ANIMATIONS = animations
    MIXER = mixer

    return (
      <>
        <group ref={ybotRef} position={[0, -3, 0]}>
          <group rotation={[0, -0.4, 0]} scale={[1, 1, 1]}>
            <primitive object={scene} />
            {/* <primitive object={nodes.mixamorigHips} /> */}
            {/* <skinnedMesh geometry={nodes.Armature.geometry} skeleton={nodes.Armature.skeleton}></skinnedMesh> */}
          </group>
        </group>
        <AnimationController ybotRef={ybotRef} animations={animations} />
      </>
    )
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

  function addModel() {
    return <primitive object={sceneModel} />
  }

  useEffect(() => {
    if (pressed) ACTIONS.run?.play()
    // Alert.alert(JSON.stringify(ACTIONS))
    // Alert.alert(ACTIONS.run)
    // console.log(ACTIONS)
  }, [pressed])

  // useEffect(() => {
  //   ;async () => {
  //     await loadModel()
  //     setLoadedModel(true)
  //   }
  //   // loadModel()
  //   // setLoadedModel(true)
  // }, [])

  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
        <color attach="background" args={[0xe2f4df]} />
        <ambientLight />
        <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
        <directionalLight intensity={0.8} position={[-6, 2, 2]} />
        <Suspense>
          <Environment preset="park" />
          <Model url={path} />
          {/* {loadedModel && addModel()} */}
        </Suspense>
      </Canvas>
      <Text>{pressed ? 'true' : 'false'}</Text>
      <Button onPress={() => setPressed(!pressed)} title="ANIMATION" color="#841584" />
    </>
  )
}
