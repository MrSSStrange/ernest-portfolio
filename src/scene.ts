import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { clamp, damp, pointerRotation } from './motion.mjs';

type Options = {
  url: string; rotation: [number, number, number];
  onStatus: (status: 'loading' | 'ready' | 'error') => void;
  motion: () => boolean;
  view?: () => number;
  framing?: 'review';
};

// The only model geometry comes from the licensed GLB. No procedural robot fallback.
export async function mountHead(host: HTMLElement, options: Options) {
  let disposed = false;
  let frame = 0;
  let visible = true;
  let previous = performance.now();
  let sampleStart = previous;
  let sampleFrames = 0;
  let pointerActive = false;
  let desired = { yaw: 0, pitch: 0 };
  let actual = { yaw: 0, pitch: 0 };
  const fine = matchMedia('(pointer: fine)');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.01, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power', preserveDrawingBuffer: options.framing === 'review' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, fine.matches ? 2 : 1.75));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;
  renderer.domElement.setAttribute('aria-label', 'Трёхмерная голова Optimus');
  renderer.domElement.setAttribute('role', 'img');
  host.append(renderer.domElement);

  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.035);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xe9f2ff, 2.4);
  key.position.set(-3, 4, 4);
  const rim = new THREE.DirectionalLight(0x94c3ff, 2.1);
  rim.position.set(3, 2, -2);
  const fill = new THREE.DirectionalLight(0xffffff, 1.0);
  fill.position.set(2, 0, 3);
  scene.add(key, rim, fill);
  const pivot = new THREE.Group();
  scene.add(pivot);
  const composer = new EffectComposer(renderer);
  composer.renderTarget1.samples = 4;
  composer.renderTarget2.samples = 4;
  const renderPass = new RenderPass(scene, camera);
  const smaa = new SMAAPass();
  const output = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(smaa);
  composer.addPass(output);

  const section = host.closest<HTMLElement>('.hero') ?? host;
  const trigger = host.closest<HTMLElement>('.hero-scroll');
  const resize = new ResizeObserver(() => {
    const rect = host.getBoundingClientRect();
    camera.aspect = rect.width / Math.max(1, rect.height);
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height);
    composer.setSize(rect.width, rect.height);
    composer.render();
  });
  resize.observe(host);
  const move = (event: PointerEvent) => {
    if (!fine.matches || !options.motion()) return;
    const rect = section.getBoundingClientRect();
    desired = pointerRotation(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height);
    pointerActive = true;
  };
  const leave = () => { desired = { yaw: 0, pitch: 0 }; pointerActive = false; };
  section.addEventListener('pointermove', move);
  section.addEventListener('pointerleave', leave);

  const animate = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    const motion = options.motion();
    const idle = !pointerActive && motion ? Math.sin(now * 0.00028) * 0.022 : 0;
    actual.yaw = damp(actual.yaw, motion ? desired.yaw + idle : 0, dt);
    actual.pitch = damp(actual.pitch, motion ? desired.pitch : 0, dt);
    const rect = (trigger ?? section).getBoundingClientRect();
    const travel = trigger ? rect.height - section.offsetHeight : rect.height;
    const progress = motion ? clamp(-rect.top / Math.max(travel, 1), 0, 1) : 0;
    pivot.rotation.set(options.view ? 0 : actual.pitch + progress * 0.07, options.view ? options.view() : actual.yaw - 0.12 - progress * 0.65, progress * -0.025);
    const focus = options.framing === 'review' ? 0.12 : 1.08;
    const fitDistance = options.framing === 'review' ? 5.35 : Math.max(5.35, 1.05 / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect));
    camera.position.set(progress * 0.45, focus - progress * 0.6, fitDistance + progress * 2.65);
    camera.lookAt(0, focus - progress * 0.72, 0);
    key.intensity = 2.4 - progress * 0.7;
    rim.intensity = 2.1 + progress * 2;
    rim.position.x = 3 - progress * 5;
    composer.render();
    // Read-only diagnostics for visual QA; these values never drive the scene.
    host.dataset.yaw = actual.yaw.toFixed(4);
    host.dataset.pitch = actual.pitch.toFixed(4);
    host.dataset.motion = motion ? 'running' : 'reduced';
    host.dataset.scrollProgress = progress.toFixed(3);
    host.dataset.cameraDistance = camera.position.z.toFixed(2);
    sampleFrames++;
    if (now - sampleStart > 1000) { host.dataset.fps = (sampleFrames * 1000 / (now - sampleStart)).toFixed(0); sampleFrames = 0; sampleStart = now; }
    if (motion || options.view || Math.abs(actual.yaw) + Math.abs(actual.pitch) > 0.0001) frame = requestAnimationFrame(animate);
  };
  const start = () => {
    if (!frame && !disposed && visible && !document.hidden) { previous = performance.now(); frame = requestAnimationFrame(animate); }
  };
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; leave(); } else start(); };
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('ernest-motion-change', start);
  const inView = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; leave(); }
  }, { threshold: 0.01 });
  inView.observe(host);

  const contextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; options.onStatus('error'); };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  const cleanObject = (object: THREE.Object3D) => {
    object.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
        material.dispose();
      }
    });
  };
  options.onStatus('loading');
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.load(options.url, gltf => {
    if (disposed) { cleanObject(gltf.scene); return; }
    const model = gltf.scene;
    model.rotation.set(...options.rotation);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.y) || size.y <= 0) { cleanObject(model); options.onStatus('error'); return; }
    const center = box.getCenter(new THREE.Vector3());
    // Framing preserves the licensed asset's proportions. Curved surfaces are refined offline.
    const scale = (options.framing === 'review' ? 2.65 : 4.8) / size.y;
    const normalized = new THREE.Group();
    normalized.scale.setScalar(scale);
    normalized.position.copy(center).multiplyScalar(-scale);
    normalized.add(model);
    pivot.add(normalized);
    model.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) if (material instanceof THREE.MeshStandardMaterial) {
        material.flatShading = false;
        material.envMapIntensity = 1.05;
        if (material.name === 'Face') { material.roughness = 0.11; material.metalness = 0.1; material.color.setRGB(0.008, 0.011, 0.018); }
        if (material.name === 'Head') { material.roughness = 0.32; material.metalness = 0.5; material.color.setRGB(0.035, 0.042, 0.052); }
        if (material.name === 'Lights') material.emissiveIntensity = 0.8;
        material.needsUpdate = true;
      }
    });
    host.dataset.asset = options.url;
    options.onStatus('ready');
    start();
  }, undefined, () => { if (!disposed) options.onStatus('error'); });

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resize.disconnect();
    inView.disconnect();
    section.removeEventListener('pointermove', move);
    section.removeEventListener('pointerleave', leave);
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('ernest-motion-change', start);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    cleanObject(pivot);
    environment.dispose();
    smaa.dispose(); output.dispose(); renderPass.dispose(); composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
