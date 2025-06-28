import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const SHAPES = [
  { name: "Icosahedron", create: () => new THREE.IcosahedronGeometry(8, 2), color: 0xffffff },
  { name: "Torus", create: () => new THREE.TorusGeometry(7, 1.2, 16, 64), color: 0xbbbbbb },
  { name: "Box", create: () => new THREE.BoxGeometry(8, 8, 8, 6, 6, 6), color: 0xaaaaaa },
  { name: "Octahedron", create: () => new THREE.OctahedronGeometry(7, 2), color: 0xdddddd },
  { name: "Dodecahedron", create: () => new THREE.DodecahedronGeometry(9, 1), color: 0xcccccc },
  { name: "TorusKnot", create: () => new THREE.TorusKnotGeometry(5, 1, 120, 16), color: 0xeeeeee },
  { name: "Cone", create: () => new THREE.ConeGeometry(6, 14, 32, 8, true), color: 0xffffff },
  { name: "Cylinder", create: () => new THREE.CylinderGeometry(4, 4, 12, 32, 8, true), color: 0xcccccc },
  { name: "Sphere", create: () => new THREE.SphereGeometry(7, 32, 32), color: 0xbbbbbb },
  { name: "Tetrahedron", create: () => new THREE.TetrahedronGeometry(7, 2), color: 0xeeeeee },
];

const BOUNDS = { x: 45, y: 30, z: 40 };
const FADE_MARGIN = 10; // 端からこの距離でフェード

function randomVec3(min: number, max: number) {
  return new THREE.Vector3(
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min
  );
}

function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

function randomEdgeToEdgePositionAndVelocity() {
  // どの軸の端から出すかをランダムに決定
  const edge = Math.floor(Math.random() * 3);
  let pos = new THREE.Vector3();
  let target = new THREE.Vector3();
  if (edge === 0) {
    // x端
    pos.x = -BOUNDS.x * randomSign();
    pos.y = Math.random() * BOUNDS.y * randomSign();
    pos.z = Math.random() * BOUNDS.z * randomSign();
    target.x = -pos.x; // 反対側のx端
    target.y = Math.random() * BOUNDS.y * randomSign();
    target.z = Math.random() * BOUNDS.z * randomSign();
  } else if (edge === 1) {
    // y端
    pos.y = -BOUNDS.y * randomSign();
    pos.x = Math.random() * BOUNDS.x * randomSign();
    pos.z = Math.random() * BOUNDS.z * randomSign();
    target.y = -pos.y;
    target.x = Math.random() * BOUNDS.x * randomSign();
    target.z = Math.random() * BOUNDS.z * randomSign();
  } else {
    // z端
    pos.z = -BOUNDS.z * randomSign();
    pos.x = Math.random() * BOUNDS.x * randomSign();
    pos.y = Math.random() * BOUNDS.y * randomSign();
    target.z = -pos.z;
    target.x = Math.random() * BOUNDS.x * randomSign();
    target.y = Math.random() * BOUNDS.y * randomSign();
  }
  // velocity: pos→target方向の単位ベクトル×ランダムな速さ
  const dir = target.clone().sub(pos).normalize();
  const speed = 0.01 + Math.random() * 0.015;
  const vel = dir.multiplyScalar(speed);
  return { pos, vel, target }; // targetは到達判定用
}

const SpaceBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<any[]>([]); // { mesh, velocity, rotSpeed, scaleSpeed, fadeIn }

  useEffect(() => {
    if (!containerRef.current) return;

    // シーン
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111112);
    sceneRef.current = scene;

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 60);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // レンダラー
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 10個の異なるワイヤーフレーム立体
    const objects: any[] = [];
    for (let i = 0; i < SHAPES.length; i++) {
      const { create, color } = SHAPES[i];
      const geometry = create();
      const wireframe = new THREE.WireframeGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ color, linewidth: 1.5, transparent: true, opacity: 0.7 });
      const mesh = new THREE.LineSegments(wireframe, material);
      // ランダムな初期位置
      mesh.position.copy(randomVec3(-BOUNDS.x * 0.7, BOUNDS.x * 0.7));
      mesh.position.z = Math.random() * BOUNDS.z * randomSign();
      // ランダムな初期回転
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      // ランダムなスケール
      const baseScale = 0.7 + Math.random() * 0.7;
      mesh.scale.set(baseScale, baseScale, baseScale);
      scene.add(mesh);
      // ランダムな速度・回転速度・Zスケール速度
      objects.push({
        mesh,
        velocity: randomVec3(-0.025, 0.025),
        rotSpeed: randomVec3(-0.004, 0.004),
        scaleSpeed: 0.001 + Math.random() * 0.003,
        baseScale,
        scalePhase: Math.random() * Math.PI * 2,
      });
    }
    objectsRef.current = objects;

    // ライト（控えめに）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(30, 30, 50);
    scene.add(dirLight);

    // アニメーション
    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.004; // 全体的にさらに遅く
      objectsRef.current.forEach((obj, i) => {
        // 位置更新
        obj.mesh.position.add(obj.velocity);
        // 端でバウンド（反射）
        if (obj.mesh.position.x > BOUNDS.x || obj.mesh.position.x < -BOUNDS.x) {
          obj.velocity.x *= -1;
          obj.mesh.position.x = Math.max(Math.min(obj.mesh.position.x, BOUNDS.x), -BOUNDS.x);
        }
        if (obj.mesh.position.y > BOUNDS.y || obj.mesh.position.y < -BOUNDS.y) {
          obj.velocity.y *= -1;
          obj.mesh.position.y = Math.max(Math.min(obj.mesh.position.y, BOUNDS.y), -BOUNDS.y);
        }
        if (obj.mesh.position.z > BOUNDS.z || obj.mesh.position.z < -BOUNDS.z) {
          obj.velocity.z *= -1;
          obj.mesh.position.z = Math.max(Math.min(obj.mesh.position.z, BOUNDS.z), -BOUNDS.z);
        }
        // 回転
        obj.mesh.rotation.x += obj.rotSpeed.x;
        obj.mesh.rotation.y += obj.rotSpeed.y;
        obj.mesh.rotation.z += obj.rotSpeed.z;
        // Zスケールをランダムに変化
        const scaleZ = obj.baseScale * (1.0 + Math.sin(t * obj.scaleSpeed + obj.scalePhase) * 0.7);
        obj.mesh.scale.z = scaleZ;
      });
      // カメラもゆっくり動かす
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(t * 0.2) * 4;
        cameraRef.current.position.y = Math.cos(t * 0.13) * 2.5;
        cameraRef.current.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    animate();

    // リサイズ対応
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      objects.forEach(obj => {
        obj.mesh.geometry.dispose();
        if (Array.isArray(obj.mesh.material)) {
          obj.mesh.material.forEach((m: any) => m.dispose());
        } else {
          obj.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default SpaceBackground;
