import * as THREE from 'three';
import { FC, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Board } from '../../types/AppTypes';

export const Model: FC<Board> = ({ width, height, depth, finish }) => {
  const [textureImage, setTextureImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [plankObject, setPlankObject] = useState<THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial, THREE.Object3DEventMap>>();
  const refContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const { default: image } = await import(`../../assets/${finish.toLowerCase()}.jpg`);
        setTextureImage(image);
      } catch (error: any) {
        console.error(`Error loading image: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  useEffect(() => {
    if (!loading && textureImage && refContainer.current && Number(width) && Number(height) && Number(depth)) {
      // Create a scene
      console.log("new scene?")
      if(!scene.current) {
        console.log("YEP!")
        scene.current = new THREE.Scene();

        // Create a camera
        camera.current = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.current.position.z = 5;

        // Create a renderer
        renderer.current = new THREE.WebGLRenderer({ alpha: true });
        renderer.current.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
        refContainer.current.appendChild(renderer.current.domElement);
      }

      // Create a wooden material
      const woodTexture = new THREE.TextureLoader().load(textureImage, () => {
        // Texture loaded callback
        // Create the wooden plank geometry
        const plankGeometry = new THREE.BoxGeometry(width, height, depth);

        // Create a mesh with the wooden material and geometry
        const woodMaterial = new THREE.MeshLambertMaterial({ map: woodTexture });
        const woodenPlank = plankObject || new THREE.Mesh(plankGeometry, woodMaterial);
        if(!plankObject) {
          setPlankObject(woodenPlank);

          // Add the wooden plank to the scene
          scene.current?.add(woodenPlank);

          // Add ambient light to the scene
          const ambientLight = new THREE.AmbientLight(0x404040);
          scene.current?.add(ambientLight);

          // Add directional light to the scene
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
          directionalLight.position.set(5, 3, 5);
          scene.current?.add(directionalLight);
        } else {
          woodenPlank.geometry.dispose();
          woodenPlank.geometry = plankGeometry;
          woodenPlank.material.dispose();
          woodenPlank.material = woodMaterial;
          woodenPlank.material.needsUpdate = true;
        }

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Rotate the wooden plank
          woodenPlank.rotation.x += 0.01;
          woodenPlank.rotation.y += 0.01;
          scene.current && camera.current && renderer.current?.render(scene.current, camera.current);
        };

        !plankObject && animate();
      });
    }
  }, [ loading, textureImage, width, height, depth ]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (camera.current && renderer.current && refContainer.current) {
        // Update renderer size
        renderer.current.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
  
        // Ensure the camera is initialized
        if (camera.current.aspect !== undefined) {
          // Update camera aspect ratio
          camera.current.aspect = refContainer.current.clientWidth / refContainer.current.clientHeight;
          camera.current.updateProjectionMatrix();
        }
  
        // ... (other resize-related logic if needed)
      }
    };
  
    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Initial setup
    setTimeout(() => {
      handleResize();
    },10);
  
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={refContainer} style={{ width: '100%', height: '100%' }} />;
};
