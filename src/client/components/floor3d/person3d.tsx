import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';

export interface PersonLoc {
    id: any,
    x: number
    y: number
}

interface Props {
    [index: string]: any;
    person: PersonLoc
}

export class Person3D extends React.Component<Props, {}> {
    render() {
        return <mesh {...this.props} castShadow >
            <boxBufferGeometry attach="geometry" args={[0.30, 0.60, 1.5]} />
            <meshPhysicalMaterial attach="material" color="blue" />
            <HTML>
                <div style={{
                    color: 'black',
                    background: 'rgba(255,255,255,0.75)'
                }}>
                    {this.props.person.id}
                </div>
            </HTML>
        </mesh>
    }
}