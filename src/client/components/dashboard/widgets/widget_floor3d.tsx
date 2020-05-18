import React, { useRef } from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';
import { api } from '../../../api';
import { Input } from '../input';
import { Button } from '../button';
import { clone } from '../dashboard';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';
import { Person3D, PersonLoc } from '../../floor3d/person3d';
import { Floor3D } from '../../floor3d/floor';
import * as THREE from 'three'
import { useSprings, a } from 'react-spring/three'

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

const RectAreaLight = ({ lookAt = [0, 0, 0], ...props }) => <rectAreaLight {...props} onUpdate={self => self.lookAt(...lookAt)} />

export default class Widget3DFloor extends WidgetComponent {
    state: Floor3DState = {
        options: {
            someval: { type: 'input', default: 'foo', value: undefined },
            textcol: { type: 'color', default: 'foo', value: undefined }
        },
        inputmessage: '',
        log: [],
        scenedata: { people: [{ id: 'A1', x: 0, y: 1 }, { id: 'B2', x: 0, y: 0 }] }
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
            console.log(scenedata);

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
                <Canvas shadowMap onCreated={({ gl, scene }) => {
                    scene.background = new THREE.Color('#efefef')
                    scene.rotation.set(-Math.PI / 4, 0, -Math.PI / 4)
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}>

                    <ambientLight intensity={0.5} />
                    <spotLight
                        angle={Math.PI / 3}
                        intensity={1}
                        position={[10, 10, 15]}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        castShadow={true}
                    />

                    <Floor3D receiveShadow size={[1000, 1000]} />

                    {this.state.scenedata.people.map((person, i) => {
                        return <Person3D receiveShadow castShadow key={i}
                            person={person}
                            position={[person.x, person.y, 0.8]} />
                    })}
                    <OrbitControls />

                </Canvas>
            </WidgetBasicWrap>
        );
    }
};

