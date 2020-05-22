import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model = (props) => {
    const sceneRef = useRef();

    const setUpLighting = (scene, object) => {
        const box = new THREE.Box3().setFromObject(object);
        const x = box.max.x - box.min.x;
        const light = new THREE.PointLight(0xd4d4d4, 1, 15 * x);
        const light2 = new THREE.PointLight(0xd4d4d4, 1, 15 * x);
        const light3 = new THREE.PointLight(0xd4d4d4, 1, 15 * x);
        const light4 = new THREE.PointLight(0xd4d4d4, 1, 15 * x);

        light.position.set(-x, x * 2, x * 2);
        light2.position.set(x, x * 2, x * 2);
        light3.position.set(-x, -x * 2, -x * 2);
        light4.position.set(x, -x * 2, -x * 2);

        scene.add(light);
        scene.add(light2);
        scene.add(light3);
        scene.add(light4);
    };

    const setUpRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(sceneRef.current.offsetWidth, sceneRef.current.offsetHeight);
        renderer.setClearColor(0x000000, 0);

        return renderer;
    };

    const setUpObject = (scene) => {
        const object = new OBJLoader().parse(props.objectData);
        const material = new THREE.MeshLambertMaterial({ color: 0xd4d4d4 });
        const texture = props.texture
            ? new THREE.TextureLoader().load(props.texture)
            : null;
        let mesh;

        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                mesh = child;
            }
        });

        material.map = texture;
        mesh.material = material;

        scene.add(object);

        return object;
    };

    const setUpCamera = (object) => {
        const aspect = sceneRef.current.offsetWidth / sceneRef.current.offsetHeight;
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        const box = new THREE.Box3().setFromObject(object);
        const x = box.max.x - box.min.x;
        const y = box.max.y - box.min.y;
        const z = box.max.z - box.min.z;

        if (z > y) {
            const distance = Math.max(x, z);

            camera.position.y = distance;
            camera.position.z = distance / 2;
        } else {
            const distance = Math.max(x, y);

            camera.position.z = distance;
            camera.position.y = distance / 2;
        }

        camera.lookAt(object.position);

        return camera;
    };

    const setUpControls = (renderer, scene, camera) => {
        if (!props.withControls) {
            return null;
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);

            return window.requestAnimationFrame(animate);
        };

        return animate();
    };

    useEffect(() => {
        const renderer = setUpRenderer();
        const scene = new THREE.Scene();
        const object = setUpObject(scene);
        const camera = setUpCamera(object);
        const animationFrameId = setUpControls(renderer, scene, camera);

        setUpLighting(scene, object);
        sceneRef.current.appendChild(renderer.domElement);
        renderer.render(scene, camera);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            renderer.forceContextLoss();
            renderer.dispose();
            sceneRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            className="model"
            ref={sceneRef}
        />
    );
};

Model.defaultProps = {
    texture: null,
    withControls: false,
};

Model.propTypes = {
    objectData: PropTypes.string.isRequired,
    texture: PropTypes.string,
    withControls: PropTypes.bool,
};

export default Model;
