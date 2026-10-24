import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type IntelligenceScene = {
  setPaused(value: boolean): void;
  setReduced(value: boolean): void;
  setVisible(value: boolean): void;
  setMode(value: number): void;
  setPointer(x: number, y: number): void;
  dispose(): void;
};

/** Procedural geometry and a local reflection environment; no external model or texture requests. */
export function createIntelligenceScene(
  canvas: HTMLCanvasElement,
  onFailure: () => void,
): IntelligenceScene {
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!context) throw new Error("WebGL2 is unavailable");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio || 1,
      window.matchMedia("(pointer: coarse)").matches ? 1.25 : 1.5,
    ),
  );
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(0, 0.1, 7.2);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2a5d5,
    metalness: 0.8,
    roughness: 0.17,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    iridescence: 0.85,
    iridescenceIOR: 1.35,
    iridescenceThicknessRange: [180, 440],
    envMapIntensity: 1.5,
  });
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.95, 0.255, 192, 24, 2, 3),
    material,
  );
  sculpture.add(knot);
  const heartMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x6d619d,
    metalness: 0.25,
    roughness: 0.1,
    transmission: 0.35,
    thickness: 0.7,
    envMapIntensity: 1.5,
    clearcoat: 1,
  });
  const heart = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.43, 0),
    heartMaterial,
  );
  sculpture.add(heart);
  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0xc3acd7,
    transparent: true,
    opacity: 0.45,
  });
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.65, 0)),
    wireMaterial,
  );
  sculpture.add(wire);

  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x9b8db9,
    transparent: true,
    opacity: 0.35,
  });
  const satelliteMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe0b99f,
    metalness: 0.65,
    roughness: 0.22,
    clearcoat: 1,
  });
  const orbits: THREE.Group[] = [];
  for (let i = 0; i < 2; i++) {
    const orbit = new THREE.Group();
    // Two planes: a wide orbital arc and a nearly perpendicular signal path.
    orbit.rotation.set(
      i === 0 ? 0.65 : 1.35,
      i === 0 ? 0.25 : -0.7,
      i === 0 ? -0.4 : 0.5,
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.96 + i * 0.16, 0.004, 6, 160),
      orbitMaterial,
    );
    orbit.add(ring);
    for (let j = 0; j < 3; j++) {
      const angle = (j * Math.PI * 2) / 3 + i * 0.4;
      const satellite = new THREE.Mesh(
        new THREE.OctahedronGeometry(j === 0 ? 0.085 : 0.045),
        satelliteMaterial,
      );
      satellite.position.set(
        Math.cos(angle) * (1.96 + i * 0.16),
        Math.sin(angle) * (1.96 + i * 0.16),
        0,
      );
      orbit.add(satellite);
    }
    scene.add(orbit);
    orbits.push(orbit);
  }
  const positions = new Float32Array(32 * 3);
  for (let i = 0; i < 32; i++) {
    const y = 1 - (i / 31) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * 2.399963;
    positions[i * 3] = Math.cos(theta) * r * 2.25;
    positions[i * 3 + 1] = y * 2.25;
    positions[i * 3 + 2] = Math.sin(theta) * r * 2.25;
  }
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const pointMaterial = new THREE.PointsMaterial({
    color: 0xb6a3cc,
    size: 0.022,
    transparent: true,
    opacity: 0.45,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(points);
  const keyLight = new THREE.DirectionalLight(0xe9dfff, 3);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);
  const rim = new THREE.DirectionalLight(0xf1bd98, 2.4);
  rim.position.set(-4, 1, -2);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0x99c5ef, 1.8);
  fill.position.set(0, -3, 3);
  scene.add(fill);

  const colors = [
    new THREE.Color(0xb2a5d5),
    new THREE.Color(0x91b7c3),
    new THREE.Color(0x939fce),
  ];
  const accents = [
    new THREE.Color(0xe0b99f),
    new THREE.Color(0xd5c09c),
    new THREE.Color(0xb7a1d6),
  ];
  const poses = [
    new THREE.Vector3(0.35, 0.1, -0.3),
    new THREE.Vector3(0.85, -0.3, 0.25),
    new THREE.Vector3(0.15, 0.5, 0.7),
  ];
  let mode = 0,
    paused = false,
    reduced = false,
    visible = true,
    disposed = false,
    frame = 0,
    last = performance.now(),
    elapsed = 0;
  let targetX = 0,
    targetY = 0,
    pointerX = 0,
    pointerY = 0;
  const pose = poses[0].clone();
  sculpture.rotation.set(pose.x, pose.y, pose.z);
  const frameInterval = window.matchMedia("(pointer: coarse)").matches
    ? 1000 / 30
    : 0;
  function render() {
    if (!disposed) renderer.render(scene, camera);
  }
  function animate(now: number) {
    frame = 0;
    if (disposed || paused || reduced || !visible || document.hidden) return;
    if (now - last < frameInterval) {
      frame = requestAnimationFrame(animate);
      return;
    }
    const delta = Math.min((now - last) / 1000, 0.05);
    const blend = 1 - Math.exp(-delta * 4.5);
    elapsed += delta;
    last = now;
    pointerX += (targetX - pointerX) * blend;
    pointerY += (targetY - pointerY) * blend;
    pose.lerp(poses[mode], blend);
    material.color.lerp(colors[mode], blend);
    satelliteMaterial.color.lerp(accents[mode], blend);
    sculpture.rotation.set(
      pose.x + pointerY * 0.18,
      pose.y + elapsed * 0.12 + pointerX * 0.22,
      pose.z,
    );
    sculpture.position.y = Math.sin(elapsed * 0.75) * 0.07;
    heart.rotation.set(elapsed * 0.12, elapsed * 0.2, -elapsed * 0.1);
    wire.rotation.copy(heart.rotation);
    orbits[0].rotation.z = -0.4 + elapsed * 0.075;
    orbits[1].rotation.y = -0.7 - elapsed * 0.055;
    points.rotation.y = -elapsed * 0.025;
    render();
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (disposed) return;
    render();
    if (!paused && !reduced && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    renderer.setSize(
      Math.max(bounds.width, 1),
      Math.max(bounds.height, 1),
      false,
    );
    camera.aspect = Math.max(bounds.width, 1) / Math.max(bounds.height, 1);
    camera.updateProjectionMatrix();
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const visibility = () => sync();
  document.addEventListener("visibilitychange", visibility);
  const lost = (event: Event) => {
    event.preventDefault();
    paused = true;
    cancelAnimationFrame(frame);
    onFailure();
  };
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  sync();
  return {
    setPaused(value) {
      paused = value;
      sync();
    },
    setReduced(value) {
      reduced = value;
      sync();
    },
    setVisible(value) {
      visible = value;
      sync();
    },
    setMode(value) {
      mode = Math.min(Math.max(value, 0), 2);
      if (paused || reduced) {
        material.color.copy(colors[mode]);
        satelliteMaterial.color.copy(accents[mode]);
        pose.copy(poses[mode]);
        sculpture.rotation.set(pose.x, pose.y + elapsed * 0.12, pose.z);
        sync();
      }
    },
    setPointer(x, y) {
      if (!paused && !reduced) {
        targetX = x;
        targetY = y;
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", lost);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      material.dispose();
      heartMaterial.dispose();
      wireMaterial.dispose();
      orbitMaterial.dispose();
      satelliteMaterial.dispose();
      pointMaterial.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
