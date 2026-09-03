import * as THREE from "three";

import {
    WORLD_CONFIG,
    WORLD_LOCATIONS,
    ACHIEVEMENTS
} from "./data.js";


// =====================================================
// DOM
// =====================================================

const canvas =
    document.getElementById("world-canvas");

const loader =
    document.getElementById("world-loader");

const loaderText =
    document.getElementById("loader-text");

const loaderProgress =
    document.getElementById("loader-progress");

const loaderPercent =
    document.getElementById("loader-percent");

const worldIntro =
    document.getElementById("world-intro");

const interactionPrompt =
    document.getElementById("interaction-prompt");

const interactionText =
    document.getElementById("interaction-text");

const locationPanel =
    document.getElementById("location-panel");

const locationTitle =
    document.getElementById("location-title");

const locationDescription =
    document.getElementById("location-description");

const locationDetails =
    document.getElementById("location-details");

const locationAction =
    document.getElementById("location-action");

const closeLocationButton =
    document.getElementById("close-location-btn");

const closeHomeButton =
    document.getElementById("close-to-home-btn");

const playerMapPoint =
    document.getElementById("player-map-point");

const worldStatusText =
    document.getElementById("world-status-text");


// =====================================================
// THREE.JS SETUP
// =====================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x08100d);

scene.fog =
    new THREE.FogExp2(
        0x08100d,
        0.012
    );


const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );

camera.position.set(
    0,
    4,
    12
);


const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance"
    });

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.8)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.05;


// =====================================================
// CLOCK
// =====================================================

const clock =
    new THREE.Clock();


// =====================================================
// COLORS
// =====================================================

const COLORS = {

    grass: 0x385b3d,

    grassLight: 0x4d754d,

    dirt: 0x604832,

    stone: 0x52585a,

    darkStone: 0x303536,

    wood: 0x68462e,

    woodDark: 0x432d20,

    roof: 0x252d2a,

    glass: 0x7bc8b2,

    water: 0x244c56,

    leaf: 0x284c34,

    leafLight: 0x3b6842,

    snow: 0xbfc8c4,

    sand: 0x9d8c60,

    white: 0xffffff,

    mint: 0xb7f7c5,

    black: 0x050505,

    orange: 0xc47b4b,

    yellow: 0xd4ba68

};


// =====================================================
// MATERIAL HELPERS
// =====================================================

function material(
    color,
    roughness = 0.85,
    emissive = null
) {

    return new THREE.MeshStandardMaterial({

        color,

        roughness,

        metalness: 0,

        emissive:
            emissive !== null
                ? emissive
                : 0x000000,

        emissiveIntensity:
            emissive !== null
                ? 0.8
                : 0

    });

}


const MAT = {

    grass: material(COLORS.grass),

    grassLight:
        material(COLORS.grassLight),

    dirt:
        material(COLORS.dirt),

    stone:
        material(COLORS.stone),

    darkStone:
        material(COLORS.darkStone),

    wood:
        material(COLORS.wood),

    woodDark:
        material(COLORS.woodDark),

    roof:
        material(COLORS.roof),

    glass:
        material(
            COLORS.glass,
            0.35,
            COLORS.glass
        ),

    water:
        material(
            COLORS.water,
            0.25
        ),

    leaf:
        material(COLORS.leaf),

    leafLight:
        material(COLORS.leafLight),

    snow:
        material(COLORS.snow),

    sand:
        material(COLORS.sand),

    mint:
        material(
            COLORS.mint,
            0.5,
            COLORS.mint
        ),

    black:
        material(COLORS.black),

    orange:
        material(COLORS.orange),

    yellow:
        material(
            COLORS.yellow,
            0.5,
            COLORS.yellow
        )

};


// =====================================================
// LIGHTING
// =====================================================

const hemiLight =
    new THREE.HemisphereLight(
        0x9ab4ad,
        0x101714,
        1.7
    );

scene.add(hemiLight);


const sun =
    new THREE.DirectionalLight(
        0xffdfb0,
        2.2
    );

sun.position.set(
    -45,
    70,
    35
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;

scene.add(sun);


const moonLight =
    new THREE.DirectionalLight(
        0x89a9c4,
        0.35
    );

moonLight.position.set(
    50,
    50,
    -60
);

scene.add(moonLight);


// =====================================================
// GROUPS
// =====================================================

const terrainGroup =
    new THREE.Group();

const environmentGroup =
    new THREE.Group();

const locationGroup =
    new THREE.Group();

const particleGroup =
    new THREE.Group();

scene.add(terrainGroup);
scene.add(environmentGroup);
scene.add(locationGroup);
scene.add(particleGroup);


// =====================================================
// BASIC CUBE
// =====================================================

const cubeGeometry =
    new THREE.BoxGeometry(
        1,
        1,
        1
    );


function cube(
    x,
    y,
    z,
    materialValue,
    sx = 1,
    sy = 1,
    sz = 1
) {

    const mesh =
        new THREE.Mesh(
            cubeGeometry,
            materialValue
        );

    mesh.position.set(
        x,
        y,
        z
    );

    mesh.scale.set(
        sx,
        sy,
        sz
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
}


// =====================================================
// TERRAIN
// =====================================================

function createTerrain() {

    const size = WORLD_CONFIG.worldSize;

    const terrainSize = 4;

    for (
        let x = -size / 2;
        x <= size / 2;
        x += terrainSize
    ) {

        for (
            let z = -size / 2;
            z <= size / 2;
            z += terrainSize
        ) {

            const distance =
                Math.sqrt(
                    x * x +
                    z * z
                );

            if (
                distance >
                size * 0.52
            ) {
                continue;
            }

            const noise =
                Math.sin(x * 0.08) *
                Math.cos(z * 0.07) *
                1.2;

            const height =
                Math.max(
                    0,
                    Math.floor(
                        1.8 +
                        noise
                    )
                );

            for (
                let y = 0;
                y < height;
                y++
            ) {

                const block =
                    cube(
                        x,
                        y - 0.5,
                        z,
                        y === height - 1
                            ? MAT.grass
                            : MAT.dirt,
                        terrainSize,
                        1,
                        terrainSize
                    );

                terrainGroup.add(block);
            }
        }
    }

}


// =====================================================
// WATER
// =====================================================

function createWater() {

    const geometry =
        new THREE.BoxGeometry(
            34,
            0.45,
            22
        );

    const water =
        new THREE.Mesh(
            geometry,
            MAT.water
        );

    water.position.set(
        -45,
        1.2,
        32
    );

    water.receiveShadow = true;

    environmentGroup.add(water);

    return water;
}


// =====================================================
// TREE
// =====================================================

const animatedObjects = [];


function createTree(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();

    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(scale);


    const trunk =
        cube(
            0,
            3,
            0,
            MAT.wood,
            1.1,
            6,
            1.1
        );

    tree.add(trunk);


    const leaves = [
        [0, 6, 0, 3.8],
        [0, 8.3, 0, 3],
        [0, 10.1, 0, 2],
        [-2, 7, 0, 2],
        [2, 7, 0, 2],
        [0, 7, -2, 2],
        [0, 7, 2, 2]
    ];


    leaves.forEach(
        ([lx, ly, lz, size], index) => {

            const leaf =
                cube(
                    lx,
                    ly,
                    lz,
                    index % 2 === 0
                        ? MAT.leaf
                        : MAT.leafLight,
                    size,
                    size * 0.7,
                    size
                );

            tree.add(leaf);

        }
    );


    environmentGroup.add(tree);

    animatedObjects.push({
        object: tree,
        type: "tree",
        baseRotation: tree.rotation.z
    });

}


// =====================================================
// FOREST
// =====================================================

function createForest() {

    const positions = [

        [-68, -58],
        [-58, -68],
        [-46, -65],
        [-72, -40],
        [-62, -27],

        [60, -65],
        [72, -52],
        [62, -35],
        [75, -22],

        [-72, 54],
        [-62, 66],
        [-45, 62],

        [62, 48],
        [72, 62],
        [45, 68]

    ];


    positions.forEach(
        ([x, z], index) => {

            createTree(
                x,
                z,
                0.85 +
                (index % 3) * 0.12
            );

        }
    );

}


// =====================================================
// MOUNTAIN
// =====================================================

function createMountain(
    x,
    z,
    width,
    height
) {

    const mountain =
        new THREE.Group();

    mountain.position.set(
        x,
        0,
        z
    );


    for (
        let y = 0;
        y < height;
        y += 2
    ) {

        const ratio =
            1 -
            y / height;

        const layerSize =
            width * ratio;


        const block =
            cube(
                0,
                y,
                0,
                y >
                    height * 0.75
                    ? MAT.snow
                    : MAT.stone,
                layerSize,
                2,
                layerSize
            );

        mountain.add(block);

    }


    environmentGroup.add(mountain);

}


// =====================================================
// HOUSE
// =====================================================

function createBuilding(
    position,
    options = {}
) {

    const group =
        new THREE.Group();

    group.position.set(
        position.x,
        0,
        position.z
    );


    const width =
        options.width || 8;

    const depth =
        options.depth || 7;

    const height =
        options.height || 5;


    // Floor

    group.add(
        cube(
            0,
            0.8,
            0,
            MAT.woodDark,
            width,
            0.8,
            depth
        )
    );


    // Walls

    group.add(
        cube(
            -width / 2,
            height / 2,
            0,
            MAT.wood,
            0.6,
            height,
            depth
        )
    );


    group.add(
        cube(
            width / 2,
            height / 2,
            0,
            MAT.wood,
            0.6,
            height,
            depth
        )
    );


    group.add(
        cube(
            0,
            height / 2,
            -depth / 2,
            MAT.wood,
            width,
            height,
            0.6
        )
    );


    group.add(
        cube(
            0,
            height / 2,
            depth / 2,
            MAT.wood,
            width,
            height,
            0.6
        )
    );


    // Roof

    group.add(
        cube(
            0,
            height + 0.7,
            0,
            MAT.roof,
            width + 1.5,
            1,
            depth + 1.5
        )
    );


    // Door

    group.add(
        cube(
            0,
            2.1,
            depth / 2 + 0.35,
            MAT.woodDark,
            1.6,
            3.4,
            0.4
        )
    );


    // Windows

    const windowMaterial =
        MAT.glass;


    group.add(
        cube(
            -width / 3,
            2.8,
            depth / 2 + 0.36,
            windowMaterial,
            1.5,
            1.6,
            0.3
        )
    );


    group.add(
        cube(
            width / 3,
            2.8,
            depth / 2 + 0.36,
            windowMaterial,
            1.5,
            1.6,
            0.3
        )
    );


    environmentGroup.add(group);

    return group;
}


// =====================================================
// ROBOT
// =====================================================

function createRobot(
    x,
    y,
    z
) {

    const robot =
        new THREE.Group();

    robot.position.set(
        x,
        y,
        z
    );


    const body =
        cube(
            0,
            2,
            0,
            MAT.darkStone,
            2.4,
            3,
            1.8
        );

    robot.add(body);


    const head =
        cube(
            0,
            4.7,
            0,
            MAT.stone,
            2,
            1.7,
            1.7
        );

    robot.add(head);


    const eyeMaterial =
        material(
            COLORS.mint,
            0.2,
            COLORS.mint
        );


    robot.add(
        cube(
            -0.55,
            4.8,
            0.9,
            eyeMaterial,
            0.35,
            0.35,
            0.15
        )
    );


    robot.add(
        cube(
            0.55,
            4.8,
            0.9,
            eyeMaterial,
            0.35,
            0.35,
            0.15
        )
    );


    // Arms

    robot.add(
        cube(
            -2.8,
            2.1,
            0,
            MAT.stone,
            0.7,
            2.5,
            0.7
        )
    );


    robot.add(
        cube(
            2.8,
            2.1,
            0,
            MAT.stone,
            0.7,
            2.5,
            0.7
        )
    );


    // Wheels

    robot.add(
        cube(
            -1.2,
            0.5,
            0,
            MAT.black,
            0.8,
            0.8,
            1.8
        )
    );


    robot.add(
        cube(
            1.2,
            0.5,
            0,
            MAT.black,
            0.8,
            0.8,
            1.8
        )
    );


    locationGroup.add(robot);

    animatedObjects.push({
        object: robot,
        type: "robot",
        startY: y
    });

}


// =====================================================
// COMPUTER
// =====================================================

function createComputer(
    x,
    y,
    z
) {

    const computer =
        new THREE.Group();

    computer.position.set(
        x,
        y,
        z
    );


    computer.add(
        cube(
            0,
            2.5,
            0,
            MAT.darkStone,
            3,
            2.5,
            0.7
        )
    );


    computer.add(
        cube(
            0,
            0.9,
            0,
            MAT.black,
            3.5,
            0.3,
            2
        )
    );


    computer.add(
        cube(
            0,
            1.5,
            0.4,
            MAT.mint,
            2.4,
            1.5,
            0.2
        )
    );


    locationGroup.add(computer);

}


// =====================================================
// LIBRARY
// =====================================================

function createLibrary(
    x,
    z
) {

    const library =
        new THREE.Group();

    library.position.set(
        x,
        0,
        z
    );


    library.add(
        cube(
            0,
            3,
            0,
            MAT.woodDark,
            10,
            6,
            7
        )
    );


    // Bookshelf blocks

    for (
        let row = 0;
        row < 3;
        row++
    ) {

        for (
            let col = -3;
            col <= 3;
            col += 2
        ) {

            library.add(
                cube(
                    col,
                    1.5 + row * 1.6,
                    3.65,
                    row % 2 === 0
                        ? MAT.mint
                        : MAT.orange,
                    0.7,
                    1.1,
                    0.3
                )
            );

        }

    }


    environmentGroup.add(library);

}


// =====================================================
// ELECTRONICS WORKBENCH
// =====================================================

function createWorkbench(
    x,
    z
) {

    const bench =
        new THREE.Group();

    bench.position.set(
        x,
        0,
        z
    );


    bench.add(
        cube(
            0,
            2,
            0,
            MAT.wood,
            8,
            0.8,
            3
        )
    );


    for (
        const legX of [-3, 3]
    ) {

        bench.add(
            cube(
                legX,
                1,
                0,
                MAT.woodDark,
                0.6,
                2,
                0.6
            )
        );

    }


    // PCB

    bench.add(
        cube(
            0,
            2.6,
            0,
            MAT.grass,
            2.8,
            0.15,
            1.8
        )
    );


    // Components

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        bench.add(
            cube(
                i * 0.8,
                2.85,
                0,
                MAT.black,
                0.25,
                0.25,
                0.8
            )
        );

    }


    environmentGroup.add(bench);

}


// =====================================================
// ACHIEVEMENT WALL
// =====================================================

function createAchievementWall(
    x,
    z
) {

    const wall =
        new THREE.Group();

    wall.position.set(
        x,
        0,
        z
    );


    wall.add(
        cube(
            0,
            5,
            0,
            MAT.darkStone,
            12,
            10,
            1
        )
    );


    ACHIEVEMENTS.forEach(
        (achievement, index) => {

            const px =
                -7.5 +
                index * 5;

            wall.add(
                cube(
                    px,
                    5,
                    -0.7,
                    MAT.mint,
                    1.8,
                    1.8,
                    0.3
                )
            );

        }
    );


    environmentGroup.add(wall);

}


// =====================================================
// CREATIVE ZONE
// =====================================================

function createCreativeZone(
    x,
    z
) {

    const zone =
        new THREE.Group();

    zone.position.set(
        x,
        0,
        z
    );


    zone.add(
        cube(
            0,
            0.5,
            0,
            MAT.woodDark,
            14,
            0.6,
            10
        )
    );


    // Guitar

    zone.add(
        cube(
            -4,
            2,
            -1,
            MAT.orange,
            0.7,
            3,
            0.5
        )
    );


    zone.add(
        cube(
            -4,
            4.8,
            -1,
            MAT.orange,
            1.5,
            1.5,
            0.5
        )
    );


    // Chess board

    zone.add(
        cube(
            2,
            1.3,
            -1,
            MAT.stone,
            3,
            0.25,
            3
        )
    );


    // Basketball

    const basketball =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.8,
                1.8,
                1.8
            ),
            MAT.orange
        );

    basketball.position.set(
        5,
        2.2,
        1
    );

    basketball.castShadow = true;

    zone.add(basketball);


    environmentGroup.add(zone);

}


// =====================================================
// FUTURE ZONE
// =====================================================

function createFutureZone(
    x,
    z
) {

    const future =
        new THREE.Group();

    future.position.set(
        x,
        0,
        z
    );


    // Scaffolding

    for (
        let i = -4;
        i <= 4;
        i += 4
    ) {

        future.add(
            cube(
                i,
                4,
                0,
                MAT.darkStone,
                0.5,
                8,
                0.5
            )
        );

    }


    future.add(
        cube(
            0,
            8,
            0,
            MAT.darkStone,
            5,
            0.5,
            0.5
        )
    );


    future.add(
        cube(
            0,
            4,
            0,
            MAT.mint,
            3,
            3,
            0.4
        )
    );


    environmentGroup.add(future);

}


// =====================================================
// LOCATION MARKERS
// =====================================================

const interactiveObjects = [];


function createLocationMarker(
    location
) {

    const group =
        new THREE.Group();

    group.position.set(
        location.position.x,
        0,
        location.position.z
    );


    const marker =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2,
                2,
                2
            ),
            MAT.mint
        );

    marker.position.y = 9;

    marker.visible = false;

    group.add(marker);


    const light =
        new THREE.PointLight(
            COLORS.mint,
            2.5,
            18
        );

    light.position.y = 8;

    group.add(light);


    group.userData.location =
        location;


    locationGroup.add(group);

    interactiveObjects.push({
        object: group,
        location
    });

}


// =====================================================
// PARTICLES
// =====================================================

function createParticles() {

    const count = 350;

    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[i * 3] =
            (Math.random() - 0.5) *
            150;

        positions[i * 3 + 1] =
            Math.random() * 35;

        positions[i * 3 + 2] =
            (Math.random() - 0.5) *
            150;

    }


    const geometry =
        new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particles =
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: COLORS.mint,
                size: 0.12,
                transparent: true,
                opacity: 0.45
            })
        );


    particleGroup.add(
        particles
    );

    return particles;

}


// =====================================================
// WORLD BUILD
// =====================================================

function buildWorld() {

    createTerrain();

    createWater();

    createForest();

    createMountain(
        -75,
        -75,
        18,
        30
    );

    createMountain(
        75,
        -70,
        22,
        38
    );

    createMountain(
        -75,
        72,
        20,
        34
    );

    createMountain(
        75,
        72,
        25,
        42
    );


    // Central base

    createBuilding(
        {
            x: 0,
            z: 0
        },
        {
            width: 10,
            depth: 8,
            height: 6
        }
    );


    // Robotics

    createBuilding(
        {
            x: -30,
            z: -20
        },
        {
            width: 10,
            depth: 9,
            height: 6
        }
    );

    createRobot(
        -30,
        1,
        -13
    );


    // AI

    createBuilding(
        {
            x: 32,
            z: -22
        },
        {
            width: 11,
            depth: 9,
            height: 7
        }
    );

    createComputer(
        32,
        0,
        -14
    );


    // Web

    createBuilding(
        {
            x: 34,
            z: 18
        },
        {
            width: 10,
            depth: 8,
            height: 6
        }
    );

    createComputer(
        34,
        0,
        27
    );


    // Electronics

    createBuilding(
        {
            x: -34,
            z: 22
        },
        {
            width: 11,
            depth: 9,
            height: 6
        }
    );

    createWorkbench(
        -34,
        32
    );


    // Library

    createLibrary(
        0,
        -42
    );


    // Achievement wall

    createAchievementWall(
        -22,
        58
    );


    // Creative

    createCreativeZone(
        0,
        42
    );


    // Future

    createFutureZone(
        0,
        68
    );


    // Interactive markers

    WORLD_LOCATIONS.forEach(
        createLocationMarker
    );

    createParticles();

}


// =====================================================
// PLAYER
// =====================================================

const player = {

    velocity:
        new THREE.Vector3(),

    direction:
        new THREE.Vector3(),

    yaw: 0,

    pitch: 0,

    height: 4,

    position:
        new THREE.Vector3(
            0,
            4,
            12
        )

};


camera.position.copy(
    player.position
);


// =====================================================
// INPUT
// =====================================================

const keys = {

    w: false,
    a: false,
    s: false,
    d: false

};


window.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();

        if (
            key === "w" ||
            key === "a" ||
            key === "s" ||
            key === "d"
        ) {

            keys[key] = true;

        }


        if (key === "e") {

            interactWithNearest();

        }


        if (event.key === "Escape") {

            closeLocation();

        }

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        const key =
            event.key.toLowerCase();

        if (
            key === "w" ||
            key === "a" ||
            key === "s" ||
            key === "d"
        ) {

            keys[key] = false;

        }

    }
);


// =====================================================
// MOUSE LOOK
// =====================================================

let pointerDown = false;

let lastMouseX = 0;
let lastMouseY = 0;


canvas.addEventListener(
    "pointerdown",
    (event) => {

        pointerDown = true;

        lastMouseX =
            event.clientX;

        lastMouseY =
            event.clientY;

        canvas.setPointerCapture(
            event.pointerId
        );

    }
);


canvas.addEventListener(
    "pointerup",
    () => {

        pointerDown = false;

    }
);


canvas.addEventListener(
    "pointermove",
    (event) => {

        if (!pointerDown) {
            return;
        }

        const deltaX =
            event.clientX -
            lastMouseX;

        const deltaY =
            event.clientY -
            lastMouseY;


        lastMouseX =
            event.clientX;

        lastMouseY =
            event.clientY;


        player.yaw -=
            deltaX * 0.0025;

        player.pitch -=
            deltaY * 0.002;


        player.pitch =
            THREE.MathUtils.clamp(
                player.pitch,
                -0.9,
                0.9
            );

    }
);


// =====================================================
// MOBILE BUTTONS
// =====================================================

document
    .querySelectorAll(
        ".mobile-controls button"
    )
    .forEach(
        (button) => {

            const key =
                button.dataset.key;


            const start =
                (event) => {

                    event.preventDefault();

                    keys[key] = true;

                };


            const end =
                (event) => {

                    event.preventDefault();

                    keys[key] = false;

                };


            button.addEventListener(
                "pointerdown",
                start
            );

            button.addEventListener(
                "pointerup",
                end
            );

            button.addEventListener(
                "pointercancel",
                end
            );

            button.addEventListener(
                "pointerleave",
                end
            );

        }
    );


// =====================================================
// PLAYER MOVEMENT
// =====================================================

function updatePlayer(delta) {

    player.direction.set(
        0,
        0,
        0
    );


    if (keys.w) {
        player.direction.z -= 1;
    }

    if (keys.s) {
        player.direction.z += 1;
    }

    if (keys.a) {
        player.direction.x -= 1;
    }

    if (keys.d) {
        player.direction.x += 1;
    }


    if (
        player.direction.lengthSq() > 0
    ) {

        player.direction.normalize();

        const sin =
            Math.sin(player.yaw);

        const cos =
            Math.cos(player.yaw);


        const moveX =
            player.direction.x * cos -
            player.direction.z * sin;

        const moveZ =
            player.direction.x * sin +
            player.direction.z * cos;


        player.position.x +=
            moveX *
            WORLD_CONFIG.movementSpeed *
            delta;

        player.position.z +=
            moveZ *
            WORLD_CONFIG.movementSpeed *
            delta;

    }


    const limit =
        WORLD_CONFIG.worldSize *
        0.47;


    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -limit,
            limit
        );


    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -limit,
            limit
        );


    camera.position.copy(
        player.position
    );


    camera.rotation.order =
        "YXZ";

    camera.rotation.y =
        player.yaw;

    camera.rotation.x =
        player.pitch;

}


// =====================================================
// INTERACTION
// =====================================================

let nearestLocation = null;


function getNearestLocation() {

    let nearest = null;

    let nearestDistance =
        Infinity;


    WORLD_LOCATIONS.forEach(
        (location) => {

            const distance =
                Math.sqrt(
                    Math.pow(
                        player.position.x -
                        location.position.x,
                        2
                    ) +
                    Math.pow(
                        player.position.z -
                        location.position.z,
                        2
                    )
                );


            if (
                distance <
                nearestDistance
            ) {

                nearestDistance =
                    distance;

                nearest =
                    location;

            }

        }
    );


    if (
        nearestDistance <=
        WORLD_CONFIG.interactionDistance
    ) {

        return {
            location: nearest,
            distance: nearestDistance
        };

    }


    return null;

}


function updateInteraction() {

    const result =
        getNearestLocation();


    if (!result) {

        nearestLocation = null;

        interactionPrompt.classList.remove(
            "visible"
        );

        return;

    }


    nearestLocation =
        result.location;


    interactionText.textContent =
        result.location.name;


    interactionPrompt.classList.add(
        "visible"
    );

}


function interactWithNearest() {

    if (!nearestLocation) {
        return;
    }

    openLocation(
        nearestLocation
    );

}


function openLocation(
    location
) {

    locationTitle.textContent =
        location.name;

    locationDescription.textContent =
        location.description;


    const type =
        locationPanel.querySelector(
            ".location-type"
        );

    type.textContent =
        location.type;


    locationDetails.innerHTML = "";


    location.details.forEach(
        (detail) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "location-detail";

            item.textContent =
                detail;

            locationDetails.appendChild(
                item
            );

        }
    );


    if (
        location.actionUrl
    ) {

        locationAction.textContent =
            location.actionText;

        locationAction.style.display =
            "flex";

        locationAction.onclick =
            () => {

                window.location.href =
                    location.actionUrl;

            };

    } else {

        locationAction.textContent =
            location.actionText;

        locationAction.style.display =
            "flex";

        locationAction.onclick =
            () => {

                closeLocation();

            };

    }


    locationPanel.classList.add(
        "visible"
    );

    worldStatusText.textContent =
        "EXPLORING " +
        location.name;

}


function closeLocation() {

    locationPanel.classList.remove(
        "visible"
    );

    worldStatusText.textContent =
        "WORLD ONLINE";

}


// =====================================================
// BUTTON EVENTS
// =====================================================

closeLocationButton.addEventListener(
    "click",
    closeLocation
);


closeHomeButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/home.html";

    }
);


// =====================================================
// MINIMAP
// =====================================================

function updateMinimap() {

    const mapSize =
        180;


    const x =
        ((player.position.x + 90) /
            180) *
        100;


    const z =
        ((player.position.z + 90) /
            180) *
        100;


    playerMapPoint.style.left =
        `${THREE.MathUtils.clamp(x, 3, 97)}%`;

    playerMapPoint.style.top =
        `${THREE.MathUtils.clamp(z, 3, 97)}%`;

}


// =====================================================
// ANIMATION
// =====================================================

function updateAnimations(time) {

    animatedObjects.forEach(
        (item) => {

            if (
                item.type === "tree"
            ) {

                item.object.rotation.z =
                    item.baseRotation +
                    Math.sin(
                        time * 0.001 +
                        item.object.position.x
                    ) *
                    0.025;

            }


            if (
                item.type === "robot"
            ) {

                item.object.position.y =
                    item.startY +
                    Math.sin(
                        time * 0.002
                    ) *
                    0.08;

            }

        }
    );


    particleGroup.rotation.y =
        time * 0.00002;

}


// =====================================================
// RESIZE
// =====================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                1.8
            )
        );

    }
);


// =====================================================
// LOADING SEQUENCE
// =====================================================

function runLoader() {

    const stages = [

        {
            text: "GENERATING WORLD...",
            progress: 20
        },

        {
            text: "BUILDING TERRAIN...",
            progress: 42
        },

        {
            text: "LOADING LOCATIONS...",
            progress: 65
        },

        {
            text: "SPAWNING WORLD...",
            progress: 84
        },

        {
            text: "WORLD READY",
            progress: 100
        }

    ];


    let index = 0;


    const interval =
        setInterval(
            () => {

                const stage =
                    stages[index];


                loaderText.textContent =
                    stage.text;


                loaderProgress.style.width =
                    `${stage.progress}%`;


                loaderPercent.textContent =
                    `${stage.progress}%`;


                index++;


                if (
                    index >=
                    stages.length
                ) {

                    clearInterval(
                        interval
                    );


                    setTimeout(
                        () => {

                            loader.classList.add(
                                "hidden"
                            );


                            setTimeout(
                                () => {

                                    worldIntro.classList.add(
                                        "hidden"
                                    );

                                },
                                2500
                            );

                        },
                        700
                    );

                }

            },
            650
        );

}


// =====================================================
// MAIN LOOP
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    const elapsed =
        performance.now();


    updatePlayer(
        delta
    );

    updateInteraction();

    updateMinimap();

    updateAnimations(
        elapsed
    );


    renderer.render(
        scene,
        camera
    );

}


// =====================================================
// START
// =====================================================

buildWorld();

runLoader();

animate();

console.log(
    "Jatin's World initialized."
);