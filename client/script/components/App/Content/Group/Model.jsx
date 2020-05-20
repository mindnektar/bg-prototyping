import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Close from 'atoms/Close';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const Model = (props) => {
    const [dragging, setDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const [dragY, setDragY] = useState(0);
    const [object, setObject] = useState(null);
    const [camera, setCamera] = useState(null);
    const sceneRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(
            75,
            sceneRef.current.offsetWidth / sceneRef.current.offsetHeight,
            0.1,
            1000,
        );
        const material = new THREE.MeshLambertMaterial({ color: 0xd4d4d4 });
        const texture = new THREE.TextureLoader().load(props.texture);
        const obj = new OBJLoader().parse(props.obj);
        const box = new THREE.Box3().setFromObject(obj);
        const objWidth = (box.max.z - box.min.z) * 1.5;
        const light = new THREE.PointLight(0xffffff, 1, 10 * objWidth);
        const light2 = new THREE.PointLight(0xffffff, 1, 10 * objWidth);

        renderer.setSize(sceneRef.current.offsetWidth, sceneRef.current.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        sceneRef.current.appendChild(renderer.domElement);
        cam.position.z = objWidth;
        light.position.set(-objWidth, objWidth, objWidth);
        light2.position.set(objWidth, objWidth, objWidth);
        material.map = texture;
        obj.rotation.x = 0.8;

        obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        scene.add(obj);
        scene.add(light);
        scene.add(light2);

        const animate = () => {
            window.requestAnimationFrame(animate);
            renderer.render(scene, cam);
        };

        animate();

        setObject(obj);
        setCamera(cam);

        return () => {
            window.cancelAnimationFrame(animate);
        };
    }, []);

    const onDragStart = () => {
        setDragging(true);
    };

    const onDrag = (event) => {
        const deltaX = event.pageX - dragX;
        const deltaY = event.pageY - dragY;

        if (dragging) {
            const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(
                    (deltaY / 2) * (Math.PI / 180),
                    (deltaX / 2) * (Math.PI / 180),
                    0,
                ),
                'XYZ',
            );

            object.quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion);
        }

        setDragX(event.pageX);
        setDragY(event.pageY);
    };

    const onDragStop = () => {
        setDragging(false);
    };

    const onWheel = (event) => {
        camera.position.z = Math.max(
            camera.position.z - event.movementY * (camera.position.z * 0.02),
            0.5
        );
    };

    return (
        <div
            className="model"
            onMouseDown={onDragStart}
            onMouseMove={onDrag}
            onMouseUp={onDragStop}
            onWheel={onWheel}
        >
            <div className="model__overlay" />

            <div
                className="model__scene"
                ref={sceneRef}
            />

            <Close onClick={props.onClose} />
        </div>
    );
};

Model.propTypes = {
    obj: PropTypes.string.isRequired,
    texture: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Model;