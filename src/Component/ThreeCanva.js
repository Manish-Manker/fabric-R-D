import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useContext } from "react";
import { ImgUrl, ImgUrl2 } from "../Context/CanvasContext";

const ThreeCanva = () => {

    const containerRef = useRef(null);

    const [TimgUrl, setTImgUrl] = useContext(ImgUrl);
    const [TimgUrl2, setTImgUrl2] = useContext(ImgUrl2);
    const [imageUrl, setImageUrl] = useState("");

    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);

    let scene, camera, renderer, texture, mesh, controls;

    // Load the image dimensions on URL change
    useEffect(() => {
        const newImg = new Image();
        newImg.src = TimgUrl2;
        newImg.onload = () => {
            setImgWidth(newImg.width);
            setImgHeight(newImg.height);
        };
    }, [TimgUrl2]);

    useEffect(() => {
        // Initialize Three.js Scene
        const width = imgWidth; 
        const height = imgHeight;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
        });
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);

        renderer.setClearColor(0x000000, 0); // Transparent background
        camera.position.z = 3;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        // Load the image once it's ready
        if (imageUrl || TimgUrl2) {
            loadImage(imageUrl || TimgUrl2);
        }

        const animate = () => {
            controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            containerRef.current.removeChild(renderer.domElement);
        };
    }, [imageUrl, TimgUrl2, imgWidth, imgHeight]);

    // Load Image into the scene
    const loadImage = (url) => {
        if (mesh) {
            scene.remove(mesh);
        }
        const loader = new THREE.TextureLoader();
        loader.load(url, (loadedTexture) => {
            texture = loadedTexture;
            texture.colorSpace = THREE.SRGBColorSpace;

            // Scale the plane geometry based on image aspect ratio
            const aspectRatio = texture.image.width / texture.image.height;
            const geometry = new THREE.PlaneGeometry(aspectRatio * 2, 2); // Adjust based on image size
            const material = new THREE.MeshBasicMaterial({
                toneMapped: false,
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
            });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            mesh.position.set(0, 0, 0); // Center the image on the plane
        });
    };

    useEffect(() => {
        loadImage(TimgUrl2);
    }, [TimgUrl2]);

    const downloadImage = () => {
        const canvas = renderer.domElement;
        const dataUrl = canvas.toDataURL("image/svg", 'svg',0.8);
        setTImgUrl(dataUrl); // Store the data URL for the image

        if (mesh) {
            scene.remove(mesh);
        }
        setImageUrl('');
    };

    const clearCanvas = () => {
        if (mesh) {
            scene.remove(mesh);
        }
        setImgWidth(0);
        setImgHeight(0);
        setImageUrl('');
        setTImgUrl2('');
    };

    return (
        <div>
            <div>
                <label>Image URL: </label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button onClick={downloadImage}>Download Image</button>
                <button onClick={clearCanvas}>Clear Canvas</button>
            </div>
            <div
                ref={containerRef}
                style={{
                    width: `${imgWidth}px`,   // Canvas size should match image size
                    height: `${imgHeight}px`, // Canvas size should match image size
                    border: "2px solid black",
                    // padding: "20px",
                }}
            ></div>
        </div>
    );
};

export default ThreeCanva;
