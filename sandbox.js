import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.y = 2;
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('sandbox'),
});
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.9;
controls.zoomSpeed = 0.99;

controls.minDistance = 1;
controls.maxDistance = 120;

const gridHelper = new THREE.GridHelper(100, 100, 0x00ffaa, 0xfccca1);
scene.add(gridHelper);

const genesis = new THREE.AmbientLight(0xfffbcb);
scene.add(genesis);

const pointLight = new THREE.PointLight(0xffffff, 2, 5);
pointLight.position.y = 5;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);



const spotLight = new THREE.SpotLight(0xffffac);
spotLight.position.set(0, 50, 0);
// spotLight.map = new THREE.TextureLoader().load();

// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);



const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

const synth = new THREE.TextureLoader().load('./assets/synth.png');
const hex = new THREE.TextureLoader().load('./assets/hexagons.jpg');
const canopy = new THREE.TextureLoader().load('./assets/tree-canopy.jpg');
const synthPurple = new THREE.TextureLoader().load('./assets/synth-purple-flat.jpg');
const synthValley = new THREE.TextureLoader().load('./assets/synth-valley.jpg');

const bigBall = new THREE.Mesh(
    new THREE.SphereGeometry(50, 50, 50),
    new THREE.MeshStandardMaterial({
        map: synthValley,
        // color: 0x555312,
        // wireframe: true,
    }),
);
bigBall.material.side = THREE.DoubleSide;
bigBall.scale.x = -1;
bigBall.position.x = 0;
bigBall.position.y = 0;
bigBall.position.z = 0;
scene.add(bigBall);

const grass = new THREE.TextureLoader().load('../assets/grass.jpg');

const floor = new THREE.Mesh(
    new THREE.CircleGeometry(50, 50, 0, Math.PI * 2),
    new THREE.MeshStandardMaterial({
        map: grass,
        // color: 0xaaaaaa,
    }),
);
floor.material.side = THREE.DoubleSide;
// floor.rotation.y = 90;
// floor.rotation.z = 0;
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const torus = new THREE.TorusGeometry();




const quince = Math.ceil(Math.random() * 15);
const biggerNum = Math.ceil(Math.random() * 42);
const smallerNum = Math.ceil(Math.random() * 4);

const ranSpot = (Math.ceil(Math.random() * quince % smallerNum));

const crateTexture = new THREE.TextureLoader().load('../assets/crate-x-bar.jpg');
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        map: crateTexture,
    }),
);
cube.position.x = 5;
cube.position.y = 10;
cube.position.z = 20;
scene.add(cube);

// function spawnCrates() {
//     new THREE.BoxGeometry(quince, quince, quince),
//         new THREE.MeshStandardMaterial({
//             map: crateTexture,
//         }),
// }

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    bigBall.rotation.y -= 0.00009;
    // floor.rotation.z += 0.00005;
}

animate();


function randomSign() {
    const generator = Math.random();
    let operand = '';
    if (generator <= .5) {
        operand === '-';
    } else {
        operand === '';
    }
}

function addCubes() {
    const omg = Math.floor(Math.random() * 14);
 
    const randomCoord = (randomSign)(Math.floor(Math.random() * 20));
 
    const geometry = new THREE.BoxGeometry(omg, omg, omg);
    const material = new THREE.MeshBasicMaterial({
        map: crateTexture,
    });
    const offset = -omg;
    const xPos = Math.floor(Math.random() * 20) + offset;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = xPos + offset;
            mesh.position.y = omg - omg / 2;
            mesh.position.z = -Math.floor(Math.random() * 30);
            scene.add(mesh);
        }
    }
}

addCubes();

const cubeGenerator = function(newGroup) {

    for (let i = -2; i < 3; i++) {
        const newGeometry = new THREE.BoxGeometry(1, 1, 1);
        const newMaterial = new THREE.MeshNormalMaterial();
        const newCube = new THREE.Mesh(newGeometry, newMaterial);
        newCube.position.x = i;
        newGroup.add(newCube);
        console.log(newCube);
    }

};

const group = new THREE.Group();
cubeGenerator(group);
scene.add(group);


// addCubes();


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}