// see https://www.youtube.com/watch?v=YyqBdN71nFs
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';

function Cube() {
    const mesh = useRef()
    const { clock } = useThree()
    useFrame(() => {
        mesh.current.position.y = Math.sin(clock.getElapsedTime())
    })

    return (
        <mesh ref={mesh}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color="orange" />
            <HTML><h1>hello</h1></HTML>
        </mesh>
    )
}

export default function Threed() {
    return (
        <div style={{ width: '100%', height: '500px', background: '#353535' }}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Cube />
                <OrbitControls />
            </Canvas>
        </div>
    )
}