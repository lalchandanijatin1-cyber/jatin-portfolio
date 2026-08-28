import * as THREE from 'three';

/**
 * World
 * Builds a small, stylized voxel-island environment: a floating grass
 * island (instanced blocks so it stays a single draw call), a handful of
 * low-poly trees, a tiny house, distant mountains, drifting clouds, a
 * gradient dusk sky, sunlight and soft atmospheric fog.
 *
 * Deliberately a "golden hour floating island" rather than a dark cave —
 * this is the visual signature that keeps the piece from reading as a
 * copy of any existing game's menu screen.
 */

const PALETTE = {
  grassTop: [0x6fae5c, 0x7cb968, 0x63a352],
  dirt: 0x5a4632,
  bark: 0x4a3324,
  leaves: [0x3f7a52, 0x468a5a, 0x2f6742],
  roof: 0xb5563c,
  wall: 0xe8dcc0,
  mountain: 0x6a5b8c,
  cloud: 0xf4ede0,
  sky: {
    top: '#0c0f1e',
    mid: '#2c2b45',
    horizon: '#f2a65a'
  }
};

// Lightweight deterministic value-noise (sine fBM) — no external noise lib needed.
function fbm(x, z) {
  return (
    Math.sin(x * 0.35) * Math.cos(z * 0.35) * 1.6 +
    Math.sin(x * 0.9 + 1.3) * Math.cos(z * 0.7 + 0.4) * 0.6 +
    Math.sin((x + z) * 0.15) * 1.1
  );
}

export class World {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.islandGroup = new THREE.Group();
    this.scene.add(this.islandGroup);

    this._buildSky();
    this._buildLights();
    this._buildFog();
    this._buildIsland();
    this._buildTrees();
    this._buildHouse();
    this._buildMountains();
    this._buildClouds();
  }

  // ---- Sky -------------------------------------------------------------
  _buildSky() {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, PALETTE.sky.top);
    gradient.addColorStop(0.55, PALETTE.sky.mid);
    gradient.addColorStop(1, PALETTE.sky.horizon);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const skyGeo = new THREE.SphereGeometry(120, 24, 16);
    const skyMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, fog: false });
    this.sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(this.sky);
    this.scene.background = new THREE.Color(PALETTE.sky.top);
  }

  // ---- Lighting ----------------------------------------------------------
  _buildLights() {
    this.sun = new THREE.DirectionalLight(0xffd9a8, 2.1);
    this.sun.position.set(-18, 14, 10);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.camera.left = -20;
    this.sun.shadow.camera.right = 20;
    this.sun.shadow.camera.top = 20;
    this.sun.shadow.camera.bottom = -20;
    this.sun.shadow.camera.far = 60;
    this.sun.shadow.bias = -0.0015;
    this.scene.add(this.sun);

    const hemi = new THREE.HemisphereLight(0x8891c9, 0x33281f, 0.65);
    this.scene.add(hemi);

    const fill = new THREE.AmbientLight(0xf2c48a, 0.25);
    this.scene.add(fill);
  }

  // ---- Fog ----------------------------------------------------------------
  _buildFog() {
    this.scene.fog = new THREE.FogExp2(0x342a3f, 0.028);
  }

  // ---- Floating voxel island (instanced grass blocks) ---------------------
  _buildIsland() {
    const size = 18; // grid extent (-size..size)
    const step = 1;
    const positions = [];

    for (let x = -size; x <= size; x += step) {
      for (let z = -size; z <= size; z += step) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist > size) continue; // circular island silhouette
        const edgeFalloff = 1 - Math.min(dist / size, 1);
        const height = Math.round(fbm(x, z) * edgeFalloff * 1.6);
        positions.push({ x, z, y: height });
      }
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.02 });
    const grass = new THREE.InstancedMesh(geometry, material, positions.length);
    grass.castShadow = true;
    grass.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      grass.setMatrixAt(i, dummy.matrix);
      color.setHex(PALETTE.grassTop[Math.floor(Math.random() * PALETTE.grassTop.length)]);
      grass.setColorAt(i, color);
    });

    grass.instanceMatrix.needsUpdate = true;
    if (grass.instanceColor) grass.instanceColor.needsUpdate = true;

    this.islandGroup.add(grass);
    this.groundPositions = positions;

    // Tapered dirt underside so the island reads as "floating".
    const underGeo = new THREE.ConeGeometry(size * 0.75, 4.5, 4, 1, true);
    const underMat = new THREE.MeshStandardMaterial({ color: PALETTE.dirt, roughness: 1 });
    const under = new THREE.Mesh(underGeo, underMat);
    under.rotation.y = Math.PI / 4;
    under.position.y = -2.6;
    under.receiveShadow = true;
    this.islandGroup.add(under);
  }

  _sampleGroundHeight(x, z) {
    let closest = null;
    let closestDist = Infinity;
    for (const p of this.groundPositions) {
      const d = (p.x - x) ** 2 + (p.z - z) ** 2;
      if (d < closestDist) {
        closestDist = d;
        closest = p;
      }
    }
    return closest ? closest.y : 0;
  }

  // ---- Trees ---------------------------------------------------------------
  _buildTrees() {
    const spots = [
      { x: -6, z: 3 },
      { x: -4, z: -7 },
      { x: 7, z: -2 },
      { x: 5, z: 6 },
      { x: -9, z: -3 }
    ];

    spots.forEach((spot) => {
      const groundY = this._sampleGroundHeight(spot.x, spot.z);
      const tree = new THREE.Group();

      const trunkGeo = new THREE.BoxGeometry(0.6, 2, 0.6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: PALETTE.bark, roughness: 1 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.5;
      trunk.castShadow = true;
      tree.add(trunk);

      const leafColor = PALETTE.leaves[Math.floor(Math.random() * PALETTE.leaves.length)];
      const leafMat = new THREE.MeshStandardMaterial({ color: leafColor, roughness: 0.85 });
      [0, 1, 2].forEach((tier) => {
        const s = 2.1 - tier * 0.5;
        const leafGeo = new THREE.BoxGeometry(s, 0.9, s);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.y = 2.6 + tier * 0.8;
        leaf.castShadow = true;
        tree.add(leaf);
      });

      tree.position.set(spot.x, groundY + 0.5, spot.z);
      this.islandGroup.add(tree);
    });
  }

  // ---- Small voxel house -----------------------------------------------------
  _buildHouse() {
    const house = new THREE.Group();
    const groundY = this._sampleGroundHeight(2, -1);

    const wallGeo = new THREE.BoxGeometry(3, 2, 3);
    const wallMat = new THREE.MeshStandardMaterial({ color: PALETTE.wall, roughness: 0.85 });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 1;
    walls.castShadow = true;
    walls.receiveShadow = true;
    house.add(walls);

    const roofGeo = new THREE.ConeGeometry(2.4, 1.6, 4, 1);
    const roofMat = new THREE.MeshStandardMaterial({ color: PALETTE.roof, roughness: 0.7 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 2.8;
    roof.castShadow = true;
    house.add(roof);

    const doorGeo = new THREE.BoxGeometry(0.6, 1.1, 0.1);
    const doorMat = new THREE.MeshStandardMaterial({ color: PALETTE.bark, roughness: 1 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.55, 1.55);
    house.add(door);

    const windowGeo = new THREE.BoxGeometry(0.5, 0.5, 0.08);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0xffdf9b,
      emissive: 0xffb85c,
      emissiveIntensity: 0.9
    });
    const win1 = new THREE.Mesh(windowGeo, windowMat);
    win1.position.set(-1.1, 1.2, 1.55);
    house.add(win1);
    const win2 = win1.clone();
    win2.position.x = 1.1;
    house.add(win2);

    house.position.set(2, groundY + 0.5, -1);
    this.islandGroup.add(house);
  }

  // ---- Distant mountains -----------------------------------------------------
  _buildMountains() {
    const ringRadius = 42;
    const count = 9;
    const mat = new THREE.MeshStandardMaterial({ color: PALETTE.mountain, roughness: 1, fog: true });

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const radius = ringRadius + Math.random() * 12;
      const height = 8 + Math.random() * 10;
      const geo = new THREE.ConeGeometry(5 + Math.random() * 3, height, 5);
      const mountain = new THREE.Mesh(geo, mat);
      mountain.position.set(Math.cos(angle) * radius, height / 2 - 6, Math.sin(angle) * radius);
      mountain.rotation.y = Math.random() * Math.PI;
      this.scene.add(mountain);
    }
  }

  // ---- Drifting clouds -----------------------------------------------------
  _buildClouds() {
    const cloudMat = new THREE.MeshStandardMaterial({
      color: PALETTE.cloud,
      roughness: 1,
      transparent: true,
      opacity: 0.85
    });
    const blockGeo = new THREE.BoxGeometry(1, 0.6, 1);

    for (let i = 0; i < 7; i++) {
      const cluster = new THREE.Group();
      const blockCount = 3 + Math.floor(Math.random() * 3);
      for (let b = 0; b < blockCount; b++) {
        const block = new THREE.Mesh(blockGeo, cloudMat);
        block.position.set((Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 1.4);
        block.scale.setScalar(0.8 + Math.random() * 0.6);
        cluster.add(block);
      }

      const angle = Math.random() * Math.PI * 2;
      const radius = 14 + Math.random() * 16;
      cluster.position.set(Math.cos(angle) * radius, 9 + Math.random() * 4, Math.sin(angle) * radius);
      cluster.userData.driftSpeed = 0.15 + Math.random() * 0.2;
      cluster.userData.baseY = cluster.position.y;
      cluster.userData.bobOffset = Math.random() * Math.PI * 2;

      this.scene.add(cluster);
      this.clouds.push(cluster);
    }
  }

  /** Called once per frame from main.js's Scene update loop. */
  update(delta, elapsed) {
    for (const cloud of this.clouds) {
      cloud.position.x += cloud.userData.driftSpeed * delta;
      cloud.position.y = cloud.userData.baseY + Math.sin(elapsed * 0.3 + cloud.userData.bobOffset) * 0.3;
      if (cloud.position.x > 40) cloud.position.x = -40;
    }
  }
}
