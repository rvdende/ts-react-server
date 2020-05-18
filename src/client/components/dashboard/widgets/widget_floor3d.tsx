import React, { useRef, Suspense } from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';
import { api } from '../../../api';
import { Input } from '../input';
import { Button } from '../button';
import { clone } from '../dashboard';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls, StandardEffects, PerspectiveCamera } from 'drei';
import { Person3D, PersonLoc } from '../../floor3d/person3d';
import { Floor3D } from '../../floor3d/floor';
import * as THREE from 'three'
import { useSprings, a } from 'react-spring/three'
import { Vector3 } from 'three';

const WidgetBasicWrap = styled.div`
    height: 100%;
    padding: 20px;
    h1 {
        font-size: 28px;
        font-weight: bold;
        color: ${({ theme }) => theme.focusColor};
    }
`;

// function Person() {
//     const mesh = useRef()
//     const { clock } = useThree()
//     useFrame(() => {
//         mesh.current.position.y = Math.sin(clock.getElapsedTime())
//     })

//     return (
//         <mesh ref={mesh} >
//             <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//             <meshStandardMaterial attach="material" color="orange" />
//             <HTML><h1>hello</h1></HTML>
//         </mesh>
//     )
// }




interface Floor3DState extends WidgetState {
    scenedata: { people: PersonLoc[] }
}

export default class Widget3DFloor extends WidgetComponent {
    state: Floor3DState = {
        options: {
            someval: { type: 'input', default: 'foo', value: undefined },
            textcol: { type: 'color', default: 'foo', value: undefined }
        },
        inputmessage: '',
        log: [],
        scenedata: { people: [{ id: 'A1', x: 2, y: 1 }, { id: 'B2', x: 3, y: 1 }] }
    }

    interval: any;

    componentDidMount() {
        api.on('scenedata', this.handleIncomingData);
    }

    componentWillUnmount() {
        api.removeListener('scenedata', this.handleIncomingData);
    }

    handleIncomingData = (incomingdata: any) => {

        if (incomingdata.type === 'scenedata') {
            let scenedata = incomingdata.data;
            this.setState({ scenedata });
        }
        // let scenedata = clone(this.state.scenedata);
        // scenedata.push(data);
        // 
        // this.state.log.push([])
    }


    render() {
        const d = 8.25

        return (
            <WidgetBasicWrap>
                <Canvas shadowMap
                    camera={{ position: [-4, 4, 5] }}
                    onCreated={({ gl, scene }) => {
                        scene.background = new THREE.Color('#efefef')
                        scene.rotation.set(-Math.PI / 2, 0, -Math.PI / 2)
                        gl.shadowMap.enabled = true
                        gl.shadowMap.type = THREE.PCFSoftShadowMap
                    }}>

                    <ambientLight />
                    <spotLight
                        angle={Math.PI / 3}
                        intensity={1}
                        position={[10, 10, 15]}
                        shadow-bias={-0.00005}
                        shadow-mapSize-width={4096}
                        shadow-mapSize-height={4096}
                        castShadow={true}
                    />

                    <Floor3D size={[10, 10]} color='#343789' position={[0, 0, 0.1]} />

                    <Floor3D size={[1000, 1000]} color='#787878' position={[0, 0, -.1]} />


                    {this.state.scenedata.people.map((person, i) => {
                        return <Person3D key={i} person={person} position={[person.x, person.y, 0.9]} />
                    })}

                    <Suspense fallback={null}>
                        <StandardEffects bloom={{ luminanceThreshold: 0.99 }} />
                    </Suspense>

                    <OrbitControls target={new Vector3(0, 0, 0)} onUpdate={(e) => {
                        console.log(e);
                    }} />

                </Canvas>
            </WidgetBasicWrap>
        );
    }
};

