import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Text, Button } from 'react-native'
import { Canvas } from '@react-three/fiber/native'
import { useAnimations, useGLTF, Environment } from '@react-three/drei/native'

import { animationsMock } from './animations'

// import path from './assets/Xbot.glb'
// import path from './assets/stacy/stacy.glb'
import path from './assets/lisa-teste-5b/lisa-teste-5.glb'

let ANIMATIONS = ''
let ACTIONS = null

export default function App() {
  const [pressed, setPressed] = useState(false)
  const [controle, setControle] = useState('NULL')

  function AnimationController(props) {
    // const { actions } = useAnimations(animationsMock, props.modelRef)
    // useEffect(() => {
    //   actions[0]?.reset().play()
    // }, [actions])
    // return null
  }

  function Model() {
    const group = useRef(null)
    const { nodes, scene, animations } = useGLTF(path)
    const { ref, mixer, actions, names } = useAnimations(animations, group)

    // for (const [p, val] of Object.entries(animations)) {
    //   ANIMATIONS += `${p}: ${val}\n`
    // }
    ANIMATIONS = animations
    ACTIONS = actions

    return (
      <>
        <group ref={group} position={[0, -5, 0]}>
          <group rotation={[0, -0.4, 0]} scale={[1.3, 1.3, 1.3]}>
            <primitive object={scene} />
            {/* <meshStandardMaterial metalness={1} /> */}
          </group>
        </group>
      </>
    )
  }

  useEffect(() => {
    if (pressed) {
      ACTIONS[Object.keys(ACTIONS)[0]]?.play()
    }
    // setControle(Object.keys(ACTIONS)[0])
    // setControle(ANIMATIONS)
    // setControle(ANIMATIONS[0]?.name)
  }, [pressed])

  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
        <color attach="background" args={[0xd9e6ff]} />
        <ambientLight />
        <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
        <directionalLight intensity={0.8} position={[-6, 2, 2]} />
        <Suspense>
          <Environment preset="park" />
          <Model url={path} />
        </Suspense>
      </Canvas>
      {/* <Text>CONTROLE - {controle}</Text> */}
      <Text>PRESSED - {pressed ? 'true' : 'false'}</Text>
      <Button onPress={() => setPressed(!pressed)} title="ANIMATION" color="#3C7EFF" />
    </>
  )
}
