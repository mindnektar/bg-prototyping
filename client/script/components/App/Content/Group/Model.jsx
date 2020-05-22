import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Close from 'atoms/Close';

const Model = (props) => {
    const sceneRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            sceneRef.current.offsetWidth / sceneRef.current.offsetHeight,
            0.1,
            1000,
        );
        const material = new THREE.MeshLambertMaterial({ color: 0xd4d4d4 });
        const texture = props.texture
            ? new THREE.TextureLoader().load(props.texture)
            : null;
        const object = new OBJLoader().parse(props.obj);
        const box = new THREE.Box3().setFromObject(object);
        const x = (box.max.x - box.min.x);
        const y = (box.max.y - box.min.y);
        const z = (box.max.z - box.min.z);
        const objectWidth = Math.max(y, z);
        const light = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const light2 = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const light3 = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const light4 = new THREE.PointLight(0xd4d4d4, 1, 15 * objectWidth);
        const controls = new OrbitControls(camera, renderer.domElement);

        renderer.setSize(sceneRef.current.offsetWidth, sceneRef.current.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        sceneRef.current.appendChild(renderer.domElement);
        const fov = 75 * (Math.PI / 180);
        const distance = Math.abs(objectWidth / Math.sin(fov / 2));
        camera.position.y = distance / Math.sqrt(2);
        camera.position.z = distance / Math.sqrt(2);
        camera.lookAt(object.position);
        light.position.set(-objectWidth, x * 2, x * 2);
        light2.position.set(objectWidth, x * 2, x * 2);
        light3.position.set(-objectWidth, -x * 2, -x * 2);
        light4.position.set(objectWidth, -x * 2, -x * 2);
        material.map = texture;

        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        scene.add(object);
        scene.add(light);
        scene.add(light2);
        scene.add(light3);
        scene.add(light4);

        controls.update();

        const animate = () => {
            window.requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(animate);
            renderer.forceContextLoss();
            renderer.dispose();
            sceneRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="model">
            <div className="model__overlay" />

            <div
                className="model__scene"
                ref={sceneRef}
            />

            <Close onClick={props.onClose} />
        </div>
    );
};

Model.defaultProps = {
    texture: null,
};

Model.propTypes = {
    obj: PropTypes.string.isRequired,
    texture: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Model;
