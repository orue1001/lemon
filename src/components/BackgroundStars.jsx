import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundStars = () => {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 0. 안전한 초기화: 기존 캔버스가 있다면 제거
    if (!mountRef.current) return;
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 3. Stars Logic
    const createStars = (count, size, color, spread) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * spread;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        size: size,
        color: color,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });
      
      return new THREE.Points(geometry, material);
    };

    const starColor = 0xFFFBEB; // Soft Ivory
    const layer1 = createStars(1500, 0.02, starColor, 25); // 먼 배경
    const layer2 = createStars(800, 0.04, starColor, 20);  // 중간
    const layer3 = createStars(300, 0.06, 0xFFFFFF, 15);   // 가까운 전경

    const starsGroup = new THREE.Group();
    starsGroup.add(layer1, layer2, layer3);
    scene.add(starsGroup);

    // 4. Event Handlers
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // window 대신 document 사용 (더 안정적)
    document.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const animate = () => {
      // 자동 회전 속도 증가
      layer1.rotation.y += 0.001;
      layer2.rotation.y += 0.002;
      layer3.rotation.y += 0.001;

      // 마우스 반응 (Lerp)
      targetX += (mouse.current.x - targetX) * 0.05;
      targetY += (mouse.current.y - targetY) * 0.05;

      // 전체 그룹 기울기
      starsGroup.rotation.x = targetY * 0.2;
      starsGroup.rotation.y = targetX * 0.2;

      // 레이어별 패럴랙스 (전경이 더 많이 움직임 - 움직임 강화)
      layer3.position.x = targetX * 1.5;
      layer3.position.y = targetY * 1.5;

      layer2.position.x = targetX * 0.8;
      layer2.position.y = targetY * 0.8;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // 마운트 해제 시 DOM 제거
      if (mountRef.current && renderer.domElement) {
        // 안전하게 자식 노드 확인 후 제거
        if (mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      // 메모리 해제
      starsGroup.traverse((object) => {
        if (object.isMesh || object.isPoints) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-lemon-bg"
      style={{ background: 'radial-gradient(circle at center, #1A1A1A 0%, #0A0A0A 100%)' }}
    />
  );
};

export default BackgroundStars;
