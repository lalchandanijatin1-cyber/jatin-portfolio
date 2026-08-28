import * as THREE from 'three';

/**
 * Camera
 * A single perspective camera that:
 *  - always eases toward looking at the island's center,
 *  - drifts gently on its own when the user is idle,
 *  - offsets subtly toward the mouse position (never an aggressive orbit).
 *
 * All motion is interpolated (lerp) toward target values each frame rather
 * than being set directly, which is what keeps it feeling cinematic instead
 * of twitchy.
 */
export class Camera {
  constructor(scene) {
    this.perspective = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );

    this.basePosition = new THREE.Vector3(0, 6.5, 17);
    this.lookTarget = new THREE.Vector3(0, 1.5, 0);
    this.perspective.position.copy(this.basePosition);
    this.perspective.lookAt(this.lookTarget);

    scene.setActiveCamera(this.perspective);

    this.mouse = new THREE.Vector2(0, 0);
    this.smoothedMouse = new THREE.Vector2(0, 0);
    this._bindMouse();

    // How far the camera is allowed to drift from its resting position.
    this.parallaxStrength = 1.1;
    this.idleAmplitude = 0.6;
  }

  _bindMouse() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // On touch devices, gently center the camera instead of chasing taps.
    window.addEventListener('pointerleave', () => {
      this.mouse.set(0, 0);
    });
  }

  /** Move the resting position/look target — used when opening menus, etc. */
  setFocus(position, lookAt) {
    this.targetPosition = position;
    this.targetLookAt = lookAt;
  }

  update(delta, elapsed) {
    this.smoothedMouse.lerp(this.mouse, Math.min(delta * 2.2, 1));

    const idleX = Math.sin(elapsed * 0.12) * this.idleAmplitude;
    const idleY = Math.sin(elapsed * 0.08) * (this.idleAmplitude * 0.35);

    const targetPos = this.targetPosition || this.basePosition;
    const targetLook = this.targetLookAt || this.lookTarget;

    const desiredX = targetPos.x + idleX + this.smoothedMouse.x * this.parallaxStrength;
    const desiredY = targetPos.y + idleY - this.smoothedMouse.y * (this.parallaxStrength * 0.4);
    const desiredZ = targetPos.z;

    this.perspective.position.x += (desiredX - this.perspective.position.x) * Math.min(delta * 1.4, 1);
    this.perspective.position.y += (desiredY - this.perspective.position.y) * Math.min(delta * 1.4, 1);
    this.perspective.position.z += (desiredZ - this.perspective.position.z) * Math.min(delta * 1.4, 1);

    this._currentLook = this._currentLook || targetLook.clone();
    this._currentLook.lerp(targetLook, Math.min(delta * 1.6, 1));
    this.perspective.lookAt(this._currentLook);
  }
}
