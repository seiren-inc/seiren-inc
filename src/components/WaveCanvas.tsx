'use client';

import { useEffect, useRef } from 'react';

/**
 * WaveCanvas
 * Three.jsを使ったWebGLの「波のパーティクル」背景。
 * 海洋散骨・終活をテーマにした清蓮のブランドを、
 * 「水面の揺らぎ」で表現する。
 *
 * Heroセクションの背景画像よりも品格高く、
 * 住友林業の「木」、トヨタの「運動」のような
 * ブランドの本質を動きで伝える。
 */
export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: import('three').WebGLRenderer;
    let animId: number;

    const init = async () => {
      const THREE = await import('three');
      type ThreeType = typeof THREE;

      // === Scene Setup ===
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 3);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      // === Wave Grid Geometry ===
      const WIDTH = 120;
      const HEIGHT = 80;
      const COUNT = WIDTH * HEIGHT;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      // Brand color palette: deep teal (#2F8C9C → #1a5f6a)
      const colorA = new THREE.Color(0x2f8c9c);
      const colorB = new THREE.Color(0x8fcfd9);

      for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
          const idx = (i * HEIGHT + j) * 3;
          positions[idx]     = (i / WIDTH - 0.5) * 8;
          positions[idx + 1] = (j / HEIGHT - 0.5) * 5;
          positions[idx + 2] = 0;

          const mixRatio = Math.random();
          const c = colorA.clone().lerp(colorB, mixRatio);
          colors[idx]     = c.r;
          colors[idx + 1] = c.g;
          colors[idx + 2] = c.b;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // === Wave Animation ===
      let elapsed = 0;
      const posAttr = geometry.attributes['position'] as InstanceType<typeof THREE.BufferAttribute>;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        elapsed += 0.008;

        for (let i = 0; i < WIDTH; i++) {
          for (let j = 0; j < HEIGHT; j++) {
            const idx = i * HEIGHT + j;
            const x = (i / WIDTH - 0.5) * 8;
            const y = (j / HEIGHT - 0.5) * 5;

            // 複数の波の重ね合わせ（海の複雑なうねりを表現）
            const wave =
              Math.sin(x * 1.2 + elapsed * 0.9) * 0.12 +
              Math.sin(y * 1.5 + elapsed * 0.6) * 0.08 +
              Math.sin((x + y) * 0.8 + elapsed * 1.2) * 0.05;

            posAttr.setZ(idx, wave);
          }
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      // === Resize Handler ===
      const handleResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const ro = new ResizeObserver(handleResize);
      ro.observe(canvas);

      // Cleanup
      return () => {
        ro.disconnect();
        cancelAnimationFrame(animId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      if (cleanup) cleanup();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
