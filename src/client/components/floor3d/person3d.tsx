import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';
import { defaults3d } from './defaults';
import lodash from 'lodash'
import { Vector3, Vector2, LatheGeometry, Geometry } from 'three';
export interface PersonLoc {
    id: any,
    x: number
    y: number
}

interface Props {
    person: PersonLoc
    position: [number, number, number?]
    color?: string
}

export class Person3D extends React.Component<Props, {}> {
    state = {
        position: [0, 0, 0],
        positionTarget: [2, 2, 0]
    }

    anim: any; // interval

    componentDidMount() {
        this.anim = setInterval(() => {
            let { position, positionTarget } = this.state;

            if (!lodash.isEqual(position, positionTarget)) {
                position = [
                    this.moveTowards(position[0], positionTarget[0]),
                    this.moveTowards(position[1], positionTarget[1]),
                    this.moveTowards(position[2], positionTarget[2])
                ]
                this.setState({ position })
            }

        }, 50)
    }

    componentWillUnmount() {
        clearInterval(this.anim);
    }

    componentDidUpdate = (p: any, s: any) => {
        // console.log(p, s)
        if (p.position) {
            let res = lodash.isEqual(p.position, this.state.positionTarget)
            if (res === false) {
                this.setState({ positionTarget: p.position })
            }
        }
    }

    moveTowards(current: number, target: number) {
        let threshold = 0.1;
        if (current > (target + threshold)) { return current - 0.1; }
        if (current < (target - threshold)) { return current + 0.1; }
        return target;
    }





    render() {
        //const geometry = new THREE.LatheBufferGeometry(points);
        const points: Vector2[] = [];
        for (let i = 0; i < 10; ++i) {
            let scale = 0.1;

            points.push(new Vector2(
                (Math.sin(i * 0.25) * 2.5 + 1) * scale,
                ((i - 5) * 1.5) * scale
            ));
        }

        let position = new Vector3(this.state.position[0], this.state.position[1], this.state.position[2]);
        return <>
            <group position={position}  {...defaults3d}>

                <mesh position={[0, 0, 1.4]} {...defaults3d}>
                    <octahedronBufferGeometry attach="geometry" args={[.3, 2]} {...defaults3d} />
                    <meshPhongMaterial attach="material" color={this.props.color} />
                </mesh>

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.5]} {...defaults3d}>
                    <latheBufferGeometry attach="geometry" args={[points]} {...defaults3d} />
                    <meshPhysicalMaterial attach="material" color={this.props.color} />
                </mesh>



                <HTML position={[0, 0, 1.4]}>

                    <div style={{
                        width: 0,
                        height: 0,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        color: 'white',
                    }}>
                        <div style={{
                            textAlign: 'center',
                            width: 200,
                            bottom: 0,
                            left: -100,
                            position: 'absolute',
                            fontSize: '15px',
                            lineHeight: '10px',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <div style={{ flex: 1 }} />
                            <div style={{
                                flex: 0,
                                background: 'rgba(0,0,0,0.5)',
                                padding: 4,
                                borderRadius: 4
                            }}>{this.props.person.id}</div>
                            <div style={{ flex: 1 }} />
                        </div>



                    </div>
                </HTML>

            </group>
        </>
    }
}