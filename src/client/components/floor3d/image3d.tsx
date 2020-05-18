import { render } from 'react-dom'
import { TextureLoader, Math as ThreeMath, UniformsUtils } from 'three'
import { useSpring, useTransition, animated, config } from 'react-spring/three'
import React, { useState, useMemo, useCallback, useRef } from 'react'

import { Canvas, useThree } from 'react-three-fiber'
import { defaults3d } from './defaults'

export function Image({ url, size, position }: { url: string, size: [number, number], position?: [number, number, number] }) {

    const [texture] = useMemo(() => {
        const loader = new TextureLoader()
        return [loader.load(url)]
    }, [url])


    return (
        <mesh {...defaults3d} {...{ position }}>
            <planeBufferGeometry attach="geometry" args={size} />
            <meshPhysicalMaterial attach="material" map={texture} transparent />
        </mesh>
    )
}