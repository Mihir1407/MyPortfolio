import React from 'react'
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from 'react';
import { useRef } from 'react';

import planeScene from "../assets/3d/plane.glb";

const Plane = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, ref);
    
    useEffect(() => {
        // actions["Scene"].play();
        if (isRotating) {
            actions["Scene"].play();
        } else {
            actions["Scene"].stop();
        }
    }, [actions, isRotating]);
    return (
        <mesh {...props} ref={ref}>
            <primitive object={scene}/>
        </mesh>
    )
}

export default Plane