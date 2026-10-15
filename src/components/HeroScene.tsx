import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups for rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Wireframe Geometry (Icosahedron)
    const icosaGeometry = new THREE.IcosahedronGeometry(1.8, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Accent Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial);
    mainGroup.add(icosaMesh);

    // 2. Vertex Points (Glowing nodes on geometry vertices)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(icosaGeometry, pointsMaterial);
    mainGroup.add(pointsMesh);

    // 3. Inner Pulsing Core Ring
    const torusGeometry = new THREE.TorusGeometry(1.1, 0.02, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // 4. Surrounding Cosmic Particles
    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      randomScales[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
    });
    const starField = new THREE.Points(particleGeometry, starMaterial);
    scene.add(starField);

    // Mouse Tracking & Smooth Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Pause rendering when hero is scrolled out of viewport (Performance optimization)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse target for buttery smooth spring-like inertia
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        mainGroup.rotation.y = elapsedTime * 0.12 + targetX * 0.7;
        mainGroup.rotation.x = elapsedTime * 0.08 - targetY * 0.5;

        torusMesh.rotation.z = elapsedTime * 0.25;
        torusMesh.rotation.y = elapsedTime * 0.15;

        // Subtle floating pulse
        mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.1;

        // Slow rotation of cosmic field
        starField.rotation.y = -elapsedTime * 0.02 + targetX * 0.2;
        starField.rotation.x = -targetY * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      icosaGeometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particleGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center opacity-70 transition-opacity duration-1000"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
