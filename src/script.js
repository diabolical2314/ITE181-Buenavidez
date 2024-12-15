import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lighting
 */
// Ambient Light (Soft light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4) // Reduced intensity
scene.add(ambientLight)

// Directional Light (Strong directional light, simulating sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(3, 3, 3) // Position of the light source
scene.add(directionalLight)

// Point Light (Light source from a point in space)
const pointLight = new THREE.PointLight(0xff0000, 1, 10) // Red point light
pointLight.position.set(0, 2, 3)
scene.add(pointLight)

// Light helpers for visualization
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
scene.add(directionalLightHelper)

// Controls for light intensity
gui.add(directionalLight, 'intensity', 0, 2, 0.1).name('Directional Light Intensity')
gui.add(pointLight, 'intensity', 0, 2, 0.1).name('Point Light Intensity')

/**
 * Test cube (with reflective properties)
 */
const cubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0077ff, // Base color (blue)
    metalness: 0.5, // Reflective property (for shiny surfaces)
    roughness: 0.2, // Surface roughness (affects how sharp the reflections are)
    clearcoat: 1.0, // High gloss finish (add shine)
    clearcoatRoughness: 0.1 // Fine-tunes the clearcoat effect
})

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    cubeMaterial
)
scene.add(cube)

// GUI controls for cube properties
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', 0, 2, 0.1).name('Scale X')
cubeFolder.add(cube.scale, 'y', 0, 2, 0.1).name('Scale Y')
cubeFolder.add(cube.scale, 'z', 0, 2, 0.1).name('Scale Z')
cubeFolder.add(cubeMaterial, 'metalness', 0, 1, 0.01).name('Metalness')
cubeFolder.add(cubeMaterial, 'roughness', 0, 1, 0.01).name('Roughness')
cubeFolder.add(cubeMaterial, 'clearcoat', 0, 1, 0.01).name('Clearcoat')
cubeFolder.add(cubeMaterial, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Roughness')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.25 // Smooth camera movement
controls.screenSpacePanning = false // Limit panning to avoid unwanted views

// GUI controls for camera movement
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -10, 10, 0.1).name('Camera Position X')
cameraFolder.add(camera.position, 'y', -10, 10, 0.1).name('Camera Position Y')
cameraFolder.add(camera.position, 'z', -10, 10, 0.1).name('Camera Position Z')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Set background gradient (light to dark blue)
scene.background = new THREE.Color(0x1e2a47)

// Optional: Add skybox (texture)
const loader = new THREE.TextureLoader()
scene.background = loader.load('https://example.com/your-skybox-texture.jpg') // Add an image URL for your skybox

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Rotate the cube for animation
    cube.rotation.x = elapsedTime * 0.2 // Slow rotation on x-axis
    cube.rotation.y = elapsedTime * 0.5 // Faster rotation on y-axis

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
