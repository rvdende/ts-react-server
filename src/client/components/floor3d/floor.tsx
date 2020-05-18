import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';
import { defaults3d } from './defaults';

interface Props {
    [index: string]: any;
    size: [number, number]
    color: string
}

export class Floor3D extends React.Component<Props, {}> {
    render() {
        return <mesh {...this.props} {...defaults3d} >
            <planeBufferGeometry
                attach="geometry"
                args={[this.props.size[0], this.props.size[1], 1]} />
            <meshPhysicalMaterial attach="material" color={this.props.color} />
        </mesh>
    }
}