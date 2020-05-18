import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { HTML, OrbitControls } from 'drei';
import { defaults3d } from './defaults';
import lodash from 'lodash'
export interface PersonLoc {
    id: any,
    x: number
    y: number
}

interface Props {
    person: PersonLoc
    position: [number, number, number?]
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

    componentDidUpdate = (p, s) => {
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
        return <mesh position={this.state.position} {...defaults3d}  >
            <boxBufferGeometry attach="geometry" args={[0.30, 0.60, 1.5]} />
            <meshPhysicalMaterial attach="material" color="gray" />
            <HTML>
                <div style={{
                    position: 'relative',
                    width: 0, height: 0
                }}>
                    <div
                        style={{
                            color: 'white',
                            background: 'rgba(0,0,0,0.25)',
                            fontSize: 20,
                            padding: '2px 4px',
                            borderRadius: 3,
                            position: 'absolute',
                            textAlign: 'center',
                            left: -8
                        }}>
                        {this.props.person.id}
                    </div>

                </div>
            </HTML>
        </mesh>
    }
}