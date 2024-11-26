import * as THREE from 'three';

let scene, camera, renderer, car;

function init() {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create car (basic shapes for demonstration)
  const carBody = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  carBody.position.set(0, 0, 0);

  const wheel1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  wheel1.position.set(-0.7, -0.5, 0);

  const wheel2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  wheel2.position.set(0.7, -0.5, 0);

  const wheel3 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  wheel3.position.set(-0.7, -0.5, -1);

  const wheel4 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  wheel4.position.set(0.7, -0.5, -1);

  car = new THREE.Group();
  car.add(carBody);
  car.add(wheel1);
  car.add(wheel2);
  car.add(wheel3);
  car.add(wheel4);

  scene.add(car);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  animate();
}

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);

  // Rotate car for animation effect
  car.rotation.x += 0.01;
  car.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

init();
