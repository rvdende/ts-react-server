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
import { Image } from '../../floor3d/image3d'

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
    state: any = {
        options: {
            someval: { type: 'input', default: 'foo', value: undefined },
            textcol: { type: 'color', default: 'foo', value: undefined },
            personIcon: { type: 'color', default: '#999999', value: undefined }
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

        // const image = 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
        const image = 'http://localhost:8080/floor_transparent2.png'

        return (
            <WidgetBasicWrap>
                <Canvas shadowMap
                    camera={{ position: [-4, 4, 5] }}
                    onCreated={({ gl, scene }) => {
                        scene.background = new THREE.Color('#656565')
                        scene.rotation.set(-Math.PI / 2, 0, -Math.PI / 2)
                        gl.shadowMap.enabled = true
                        gl.shadowMap.type = THREE.PCFSoftShadowMap

                    }}>

                    <ambientLight intensity={.75} />
                    <spotLight
                        angle={Math.PI / 2}
                        intensity={0.75}
                        position={[15, -15, 25]}
                        rotation={[0, 0, 0]}
                        shadow-bias={-0.00005}
                        shadow-mapSize-width={4096}
                        shadow-mapSize-height={4096}
                        castShadow={true}
                    />


                    <directionalLight
                        shadow-bias={-0.00005}
                        intensity={0.1}
                        position={[15, -15, 25]}
                        shadow-mapSize-width={4096}
                        shadow-mapSize-height={4096}
                        castShadow={true}
                    />

                    {/* <Floor3D size={[.25, 2]} color='#ffffff' position={[0, 0, 3]} /> */}

                    {/* <Floor3D size={[1000, 1000]} color='#787878' position={[0, 0, -.1]} /> */}

                    {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => {
                        return <><Image url={image} size={[1920 / 25, 1080 / 25]} position={[0, 0, n * 8]} />
                            <HTML position={[30, -15, 1 + (n * 8)]}><h1 style={{ fontSize: 40, color: 'rgba(255,255,255,0.5)' }}>{n}</h1></HTML></>
                    })} */}

                    <Image url={image} size={[1920 / 25, 1080 / 25]} />



                    {this.state.scenedata.people.map((person, i) => {
                        return <Person3D
                            color={this.state.options.personIcon.value}
                            key={i}
                            person={person}
                            position={[person.x, person.y, 0]}
                        />
                    })}

                    <Suspense fallback={null}>
                        <StandardEffects bloom={{ luminanceThreshold: 0.99 }} />
                    </Suspense>

                    <OrbitControls />

                </Canvas>
            </WidgetBasicWrap>
        );
    }
};

