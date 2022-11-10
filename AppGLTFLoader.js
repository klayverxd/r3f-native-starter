import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Text, Button } from 'react-native'
import * as THREE from 'three'
import { AnimationClip } from 'three'
import { Canvas } from '@react-three/fiber/native'
import { useAnimations, useGLTF, Environment } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Animations from './assets/animations'

import path from './assets/lisa-teste-5c.glb'
// import path from 'https://cdn.leadfortaleza.com.br/assets/lisa/Lisa-home.glb'

let ANIMATIONS = ''
let ACTIONS = null
let MIXER = null
let CLIPS = null

export default function App() {
  const [pressed, setPressed] = useState(false)
  const [controle, setControle] = useState('NULL')
  // const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }));
  const [mixer, setMixer] = useState()
  const [loader] = useState(new GLTFLoader())
  const [scene] = useState(new THREE.Scene())
  // const [clips, setClips] = useState()
  // const [actions, setActions] = useState()

  function Model() {
    // const group = useRef(null)
    // const { scene, animations } = useGLTF(path)
    // const { mixer, actions, clips } = useAnimations(animations, group)

    loader
      .load(path, (gltf) => {
        const model = gltf.scene
        const mixer = new THREE.AnimationMixer(model)

        scene.add(model)

        setMixer(mixer)
      })
      .then(() => {
        const group = useRef(null)
        return (
          <>
            <group ref={group} position={[0, -5, 0]}>
              <group rotation={[0, -0.4, 0]} scale={[1.3, 1.3, 1.3]}>
                <primitive object={scene} />
              </group>
            </group>
          </>
        )
      })

    // ACTIONS = actions
    // MIXER = mixer
    // CLIPS = clips
    // const teste = AnimationClip.toJSON(animations[1])

    // console.log(JSON.stringify(teste))
  }

  function loadSceneActions(sceneGlosas) {
    if (MIXER) {
      // let animationStartValue = MIXER.time
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

        const action = MIXER.clipAction(clip, 'c24de2b2-5170-43a2-b677-8ed2f573bcd9')

        action.play()

        // actions.push(action)
        // clips.push(clip)
        // animationStartValue += clip.duration
      })

      CLIPS = clips
      ACTIONS = actions
    }
  }

  // useEffect(() => {
  //   if (pressed) {
  //     ACTIONS[Object.keys(ACTIONS)[0]]?.play()
  //   }
  // }, [pressed])

  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
        <color attach="background" args={[0xd9e6ff]} />
        <ambientLight />
        <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
        <directionalLight intensity={0.8} position={[-6, 2, 2]} />
        <Suspense>
          <Environment preset="park" />
          <Model />
        </Suspense>
      </Canvas>
      <Text>PRESSED - {pressed ? 'true' : 'false'}</Text>
      <Button onPress={() => setPressed(!pressed)} title="ANIMATION" color="#3C7EFF" />
      <Button onPress={() => loadSceneActions('A')} title="A" color="#3C7EFF" />
    </>
  )
}
