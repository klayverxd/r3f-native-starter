import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei/native'
import path from './assets/banana/banana.glb'

export function Banana() {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(path)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    Object.values(actions).forEach((element) => {
      element.stop()
    })
    Object.values(actions)['Emote Acrobatic Superhero'].play()
  }, [1000])
  // console.log(Object.values(actions));
  return (
    <group ref={group} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.02} position={[0, -2, 0]}>
          <group name="3c11148441d0473db96a8436bd7d6f7ffbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="M_MED_Bananaao" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_142" rotation={[-Math.PI / 2, 0, 0]} />
                    <skinnedMesh
                      name="Object_143"
                      geometry={nodes.Object_143.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_143.skeleton}
                    />
                  </group>
                </group>
                <group name="M_MED_Bananamo" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="Lamp" position={[407.62, 590.39, -100.55]} rotation={[1.89, 0.88, -2.05]} scale={100}>
                  <group name="Object_146" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_147" />
                  </group>
                </group>
                <group name="Camera" position={[748.11, 534.37, 650.76]} rotation={[Math.PI, 0.76, 2.68]} scale={100}>
                  <group name="Object_149" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(path)
