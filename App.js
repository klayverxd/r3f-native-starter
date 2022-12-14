import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Text, Button } from 'react-native'
import * as THREE from 'three'
import { AnimationClip } from 'three'
import { Canvas } from '@react-three/fiber/native'
import { useAnimations, useGLTF, Environment } from '@react-three/drei/native'

import Animations from './assets/animations'

import path from './assets/lisa-teste-5b/lisa-teste-5.glb'

let ANIMATIONS = ''
let ACTIONS = null
let MIXER = null
let CLIPS = null
let GROUP = null

export default function App() {
  const [pressed, setPressed] = useState(false)
  const [controle, setControle] = useState('NULL')
  // const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }));
  // const [mixer, setMixer] = useState()
  // const [loader] = useState(new GLTFLoader());
  // const [scene] = useState(new THREE.Scene());
  // const [clips, setClips] = useState()
  // const [actions, setActions] = useState()

  function Model() {
    const group = useRef(null)
    const { scene, animations } = useGLTF(path)

    // const { mixer, actions, clips } = useAnimations(animations, group)

    const mixer = new THREE.AnimationMixer(scene)
    // ACTIONS = actions
    MIXER = mixer
    GROUP = group
    // CLIPS = clips
    // const teste = AnimationClip.toJSON(animations[1])

    // console.log(JSON.stringify(teste))
    return (
      <>
        <group position={[0, -5, 0]}>
          <group rotation={[0, -0.4, 0]} scale={[1.3, 1.3, 1.3]}>
            <primitive ref={group} object={scene} />
          </group>
        </group>
      </>
    )
  }

  function loadSceneActions(sceneGlosas) {
    if (MIXER) {
      const glosas = sceneGlosas.split(' ')
      const actions = []
      const clips = []

      const jsonTracksParsed = []

      for (let i = 0; i < glosas.length; i += 1) {
        const animation = Animations[glosas[i]]

        jsonTracksParsed.push({
          ...animation,
          tracks: JSON.parse(animation.tracks),
        })
      }

      MIXER.stopAllAction()

      jsonTracksParsed.forEach((jsonTrack, index) => {
        const clip = THREE.AnimationClip.parse(jsonTrack)

        const action = MIXER.clipAction(clip, GROUP)

        // action.startAt(1)
        if (action.isRunning()) {
          console.log('ANTES - running')
        } else {
          console.log('ANTES - not running')
        }

        // action.startAt(1)
        action.setLoop(THREE.LoopRepeat, 2)
        action.play()

        // console.log({ action })

        if (action.isRunning()) {
          console.log('DEPOIS - running')
        } else {
          console.log('DEPOIS - not running')
        }

        // actions.push(action)
        // clips.push(clip)
        // animationStartValue += clip.duration
      })

      CLIPS = clips
      ACTIONS = actions
    }
  }

  useEffect(() => {
    if (pressed) {
      ACTIONS[Object.keys(ACTIONS)[0]]?.play()
    }
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
      {/* <Text>PRESSED - {pressed ? 'true' : 'false'}</Text> */}
      {/* <Button onPress={() => setPressed(!pressed)} title="ANIMATION" color="#3C7EFF" /> */}
      <Button onPress={() => loadSceneActions('FACULDADE')} title="FACULDADE" color="#3C7EFF" />
    </>
  )
}
