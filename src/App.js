import * as THREE from 'three'
import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './3d/Stars'
import Planets from './3d/Planets'
import Effects from './3d/Effects'
import Particles from './3d/Particles'
import Enemies from './3d/Enemies'
import Rocks from './3d/Rocks'
import Explosions from './3d/Explosions'
import Rings from './3d/Rings'
import Track from './3d/Track'
import Ship from './3d/Ship'
import Rig from './3d/Rig'
import Hud from './Hud'
import useStore from './store'

export default function App() {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)
  let interval
  const keydownArray = []

  window.clearInterval(interval)
  interval = window.setInterval(() => {
    keydownArray.map((keyCode) => {
      actions.updateMouse(keyCode)
    })
  }, 100)
  useEffect(() => {
    const handler = (e) => {
      if (keydownArray.indexOf(e.keyCode) === -1) {
        keydownArray.push(e.keyCode)
      }


      console.log(keydownArray)
      console.log(e.keyCode)
    }
    const removeHandler = (e) => {
      const index = keydownArray.indexOf(e.keyCode)
      if (index !== -1) {
        keydownArray.splice(index, 1)
      }
    }


    window.addEventListener('keydown', handler)
    window.addEventListener('keyup', removeHandler)

    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('keyup', removeHandler)
    }
  })
  return (
    // <div onPointerMove={actions.updateMouse} onClick={actions.shoot}>
    <div onClick={actions.shoot}>
      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.toneMapping = THREE.Uncharted2ToneMapping
          gl.setClearColor(new THREE.Color('#020209'))
        }}>
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={0.25} />
        <Stars />
        <Explosions />
        <Track />
        <Particles />
        <Rings />
        <Suspense fallback={null}>
          <Rocks />
          <Planets />
          <Enemies />
          <Rig>
            <Ship />
          </Rig>
        </Suspense>
        <Effects />
      </Canvas>
      <Hud />
    </div>
  )
}
