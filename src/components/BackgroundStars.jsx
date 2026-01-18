import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundStars = () => {
  const mountRef = useRef(null);
  
  // 마우스 위치를 참조값으로 관리하여 애니메이션 루프에서 항상 최신값을 읽도록 함
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // --- 1. Scene & Camera ---
    const scene = new THREE.Scene();
    
    // 카메라 위치를 조금 더 뒤로 빼서 전체를 조망
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // --- 2. Renderer ---
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- 3. Stars Logic ---
    const createStars = (count, size, color, spread) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        // -spread/2 ~ +spread/2 범위로 랜덤 배치
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
    // 레이어별 확산 범위(spread)와 개수 조정
    const layer1 = createStars(2000, 0.015, starColor, 20); // 배경 (멀리, 천천히)
    const layer2 = createStars(1000, 0.03, starColor, 15);  // 중간
    const layer3 = createStars(300, 0.05, 0xFFFFFF, 10);    // 전경 (가까이, 빠르게)

    const starsGroup = new THREE.Group();
    starsGroup.add(layer1, layer2, layer3);
    scene.add(starsGroup);

    // --- 4. Event Handlers ---
    const handleMouseMove = (event) => {
      // 화면 중앙 기준 정규화 (-1 ~ 1)
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- 5. Animation Loop ---
    // 부드러운 이동을 위한 목표값 추적 변수
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // 자동 회전 (은은하게)
      layer1.rotation.y += 0.0003;
      layer2.rotation.y += 0.0006;
      layer3.rotation.y += 0.0002;

      // 마우스 반응 (부드러운 Lerp)
      // mouse.current 값으로 target 값을 점진적으로 이동시킴
      targetX += (mouse.current.x - targetX) * 0.05;
      targetY += (mouse.current.y - targetY) * 0.05;

      // 레이어별 패럴랙스 이동 (Move Group or Individual Layers)
      // 값이 클수록 많이 움직임. 전경(layer3)이 더 많이 움직여야 입체감이 듦.
      
      // Rotation으로 기울기 효과
      starsGroup.rotation.x = targetY * 0.2; // 마우스 위아래 -> X축 회전
      starsGroup.rotation.y = targetX * 0.2; // 마우스 좌우 -> Y축 회전

      // Position 이동 추가 (더 다이나믹하게)
      layer3.position.x = targetX * 0.5;
      layer3.position.y = targetY * 0.5;

      layer2.position.x = targetX * 0.25;
      layer2.position.y = targetY * 0.25;

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

    // --- 6. Cleanup ---
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      starsGroup.traverse((object) => {
        if (object.isMesh || object.isPoints) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-lemon-bg"
      style={{ background: 'radial-gradient(circle at center, #D0D9D6 0%, #BFCAC7 100%)' }}
    />
  );
};

export default BackgroundStars;