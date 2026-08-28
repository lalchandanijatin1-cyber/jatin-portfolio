import * as THREE from 'three';

/**
 * Scene
 * Owns the renderer, the THREE.Scene, and the shared render clock.
 * Other modules (World, Camera, Home) register themselves via `onUpdate`
 * and get ticked once per frame from the single animation loop started here.
 */
export class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.updateCallbacks = [];
    this.isRunning = false;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this._resize();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, true);

    if (this._camera) {
      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();
    }
  }

  /** Register the active camera so resize events keep its aspect correct. */
  setActiveCamera(camera) {
    this._camera = camera;
    this._resize();
  }

  /** Register a per-frame callback: fn(deltaSeconds, elapsedSeconds) */
  onUpdate(fn) {
    this.updateCallbacks.push(fn);
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== fn);
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;
      const delta = Math.min(this.clock.getDelta(), 0.1);
      const elapsed = this.clock.getElapsedTime();

      for (const cb of this.updateCallbacks) cb(delta, elapsed);

      if (this._camera) {
        this.renderer.render(this.scene, this._camera);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
  }
}
