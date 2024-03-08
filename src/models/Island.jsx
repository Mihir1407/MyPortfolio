import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

const Island = ({
    isRotating,
    setIsRotating,
    setCurrentStage,
    ...props
}) => {
    const islandRef = useRef();
    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);

    // const lastX = useRef(0);
    // const rotationSpeed = useRef(0);
    // const dampingFactor = 0.95;
    const rotationSpeed = -0.0075;

    // const handlePointerDown = (event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     setIsRotating(true);

    //     const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    //     lastX.current = clientX;
    // };

    // const handlePointerUp = (event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     setIsRotating(false);
    // };

    // const handlePointerMove = (event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     if (isRotating) {
    //         const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    //         const delta = (clientX - lastX.current) / viewport.width;
    //         islandRef.current.rotation.y += delta * 0.01 * Math.PI;
    //         lastX.current = clientX;
    //         rotationSpeed.current = delta * 0.01 * Math.PI;
    //     }
    // };

    // const handleKeyDown = (event) => {
    //     if (event.key === "ArrowLeft") {
    //         if (!isRotating) setIsRotating(true);
    //         islandRef.current.rotation.y += 0.01 * Math.PI;
    //         rotationSpeed.current = 0.0125;
    //     } else if (event.key === "ArrowRight") {
    //         if (!isRotating) setIsRotating(true);
    //         islandRef.current.rotation.y -= 0.01 * Math.PI;
    //         rotationSpeed.current = -0.0125;
    //     }
    // };

    // const handleKeyUp = (event) => {
    //     if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    //         setIsRotating(false);
    //     }
    // };

    // useEffect(() => {
    //     const canvas = gl.domElement;
    //     canvas.addEventListener("pointerdown", handlePointerDown);
    //     canvas.addEventListener("pointerup", handlePointerUp);
    //     canvas.addEventListener("pointermove", handlePointerMove);
    //     document.addEventListener("keydown", handleKeyDown);
    //     document.addEventListener("keyup", handleKeyUp);

    //     return () => {
    //         canvas.removeEventListener("pointerdown", handlePointerDown);
    //         canvas.removeEventListener("pointerup", handlePointerUp);
    //         canvas.removeEventListener("pointermove", handlePointerMove);
    //         document.removeEventListener("keydown", handleKeyDown);
    //         document.removeEventListener("keyup", handleKeyUp);
    //     };
    // }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    useFrame(() => {
        // if (!isRotating) {
        //     rotationSpeed.current *= dampingFactor;
        //     if (Math.abs(rotationSpeed.current) < 0.001) {
        //         rotationSpeed.current = 0;
        //     }

        //     islandRef.current.rotation.y += rotationSpeed.current;
        // } else {
        //     const rotation = islandRef.current.rotation.y;
        if (islandRef.current) {
            // Increment the rotation on each frame
            islandRef.current.rotation.y += rotationSpeed;
        }
        const rotation = islandRef.current.rotation.y;

        const normalizedRotation =
            ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        switch (true) {
            case normalizedRotation >= 0 && normalizedRotation < Math.PI / 2: // 0 to 90 degrees
                setCurrentStage(3);
                break;
            case normalizedRotation >= Math.PI / 2 && normalizedRotation < Math.PI: // 90 to 180 degrees
                setCurrentStage(2);
                break;
            case normalizedRotation >= Math.PI && normalizedRotation < 3 * Math.PI / 2: // 180 to 270 degrees
                setCurrentStage(1);
                break;
            case normalizedRotation >= 3 * Math.PI / 2 && normalizedRotation < 2 * Math.PI: // 270 to 360 degrees
                setCurrentStage(4);
                break;
            default:
                setCurrentStage(null); // This default case might not be needed as all possibilities are covered
        }

        // }
    });

    return (
        <a.group ref={islandRef} {...props} dispose={null}>
            <group name="Sketchfab_Scene" scale={38}>
                <group name="Sketchfab_model" rotation={[-1.54, -0.064, 0]}>
                    <group name="root">
                        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                            <group name="Clouds_1">
                                <mesh
                                    name="Object_4"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_4.geometry}
                                    material={materials.Clouds}
                                />
                            </group>
                            <group name="Planet_2">
                                <mesh
                                    name="Object_6"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_6.geometry}
                                    material={materials.Planet}
                                />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </a.group>
    )
}

export default Island