import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import astroscene from "../assets/3d/fox.glb";

const Fox = ({ currentAnimation, ...props }) => {
  const ref = useRef();
    const { scene, animations } = useGLTF(astroscene);
    const { actions } = useAnimations(animations, ref);
    
    useEffect(() => {
        console.log(actions);
        actions["CINEMA_4D_Main"].play();
        // if (isRotating) {
        //     actions["Scene"].play();
        // } else {
        //     actions["Scene"].stop();
        // }
    }, [actions]);
    return (
        <mesh {...props} ref={ref} scale={1}>
            <primitive object={scene}/>
        </mesh>
    )
}

// useGLTF.preload(scene);

export default Fox;