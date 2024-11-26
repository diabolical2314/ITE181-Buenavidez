// Scene Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Lighting
var ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create the car body (simple box shape for now)
var carBodyGeometry = new THREE.BoxGeometry(2, 0.5, 1);
var carBodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
scene.add(carBody);

// Create wheels (simple spheres for now)
var wheelGeometry = new THREE.SphereGeometry(0.25, 32, 32);
var wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });

var wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel1.position.set(-0.75, -0.25, 0.5);
scene.add(wheel1);

var wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel2.position.set(0.75, -0.25, 0.5);
scene.add(wheel2);

var wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel3.position.set(-0.75, -0.25, -0.5);
scene.add(wheel3);

var wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel4.position.set(0.75, -0.25, -0.5);
scene.add(wheel4);

// Set the camera position
camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the car body and wheels for some basic animation
    carBody.rotation.y += 0.01;
    wheel1.rotation.x += 0.1;
    wheel2.rotation.x += 0.1;
    wheel3.rotation.x += 0.1;
    wheel4.rotation.x += 0.1;

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
