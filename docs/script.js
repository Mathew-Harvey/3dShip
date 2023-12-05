// Scene, Camera, and Renderer Setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xAAAAAA); // Change background color for better visibility

document.getElementById('model-container').appendChild(renderer.domElement);

// Load GLB Model
const loader = new THREE.GLTFLoader();
const loadingElem = document.getElementById('loading');
loader.load('ship.glb', function (gltf) {
    let model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // Scale down the model
    scene.add(model);

    // Adjust Camera and Controls after Model is Loaded
    camera.lookAt(model.position);
    loadingElem.style.display = 'none';

}, undefined, function (error) {
    console.error(error);
    loadingElem.innerHTML = 'An error occurred while loading the model.';
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera Position
camera.position.set(12,2,4);

// Orbit Controls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Resize Renderer on Window Resize
renderer.setClearColor(0x022B57); 
window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
