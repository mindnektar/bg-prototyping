import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ModelThumbnail = (props) => {
    const sceneRef = useRef();

    useEffect(() => {
        const fov = 75;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            fov,
            sceneRef.current.offsetWidth / sceneRef.current.offsetHeight,
            0.1,
            1000,
        );
        const material = new THREE.MeshLambertMaterial({ color: 0xd4d4d4 });
        const object = new OBJLoader().parse(props.obj);
        const box = new THREE.Box3().setFromObject(object);
        const x = box.max.x - box.min.x;
        const y = box.max.y - box.min.y;
        const z = box.max.z - box.min.z;
        const objectWidth = Math.max(y, z);
        const light = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const light2 = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const distance = Math.abs(objectWidth / Math.sin((fov * (Math.PI / 180)) / 2));

        renderer.setSize(sceneRef.current.offsetWidth, sceneRef.current.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        sceneRef.current.appendChild(renderer.domElement);
        camera.position.z = distance;
        camera.lookAt(object.position);
        light.position.set(-objectWidth, x * 2, x * 2);
        light2.position.set(objectWidth, x * 2, x * 2);

        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        scene.add(object);
        scene.add(light);
        scene.add(light2);

        renderer.render(scene, camera);

        return () => {
            renderer.forceContextLoss();
            renderer.dispose();
            sceneRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            className="model-thumbnail"
            ref={sceneRef}
        />
    );
};

ModelThumbnail.propTypes = {
    obj: PropTypes.string.isRequired,
};

export default ModelThumbnail;
