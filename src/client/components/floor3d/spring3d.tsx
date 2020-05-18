import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';
import { useSprings, a } from 'react-spring/three'
import * as THREE from 'three'
// export interface PersonLoc {
//     id: any,
//     x: number
//     y: number
// }

// interface Props {
//     [index: string]: any;
//     person?: PersonLoc
// }

// export class Spring3D extends React.Component<Props, {}> {
//     render() {
//         return <mesh {...this.props} castShadow >
//             <boxBufferGeometry attach="geometry" args={[0.30, 0.60, 1.5]} />
//             <meshPhysicalMaterial attach="material" color="red" />
//         </mesh>
//     }
// }

// const number = 35
// const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']

// const random = i => {
//     const r = Math.random()
//     return {
//         position: [100 - Math.random() * 200,
//         100 - Math.random() * 200,
//         i * 1.5],
//         color: colors[Math.round(Math.random() * (colors.length - 1))],
//         scale: [1 + r * 14, 1 + r * 14, 1],
//         rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)]
//     }
// }

// const data = new Array(number).fill().map(() => {
//     return {
//         color: colors[Math.round(Math.random() * (colors.length - 1))],
//         args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
//     }
// })


// export function Spring3D() {

//     const [springs, set] = useSprings(number, i => ({
//         from: random(i),
//         ...random(i),
//         config: { mass: 20, tension: 150, friction: 50 }
//     }))
//     useEffect(() => void setInterval(() => set(i => ({ ...random(i), delay: i * 40 })), 3000), [])
//     return data.map((d, index) => (
//         <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
//             <boxBufferGeometry attach="geometry" args={d.args} />
//             <a.meshStandardMaterial attach="material" color={springs[index].color} roughness={0.75} metalness={0.5} />
//         </a.mesh>
//     ))
// }

