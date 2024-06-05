// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
  */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('./particles/8.png')
// const particleTexture = textureLoader.load('./particles/8.png')

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry(1,32,32);
const count = 200

const positions = new Float32Array(count *3);

for(let i = 0; i<count * 3; i++){
  if((i+1)%3==0){
    positions[i] = (Math.random()-1)*5;
  }
  else{
    positions[i] = (Math.random()-0.5) * 10;
  }
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions,3)
)

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size:0.08,
  sizeAttenuation:true,   //smaller when far from camera
  color: '#caf1f7',
  transparent:true,
  alphaMap :particleTexture,
  depthTest : false,
})

const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)

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
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Cursor
 */
const cursor = {
  x:0,
  y:0
}


window.addEventListener('mousemove',(event)=>{
  const width = window.innerWidth
  if(width>1000){
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
  }
})

  // Geometry
const particlesGeometry1 = new THREE.BufferGeometry(1,32,32);
const count1 = 50

const positions1 = new Float32Array(count1 *3);

for(let i = 0; i<count1 * 3; i++){
  if((i+1)%3==0){
    positions1[i] = (Math.random()-1)*2;
  }else{
    positions1[i] = (Math.random()-0.5) * 8;
  }
}

particlesGeometry1.setAttribute(
  'position',
  new THREE.BufferAttribute(positions1,3)
)

const particlesMaterial1 = new THREE.PointsMaterial({
  size:0.006,
  sizeAttenuation:true,   //smaller when far from camera
  color: '#caf1f7',
  transparent:true,
  alphaMap :particleTexture,
  depthTest : false,
})

const particles1 = new THREE.Points(particlesGeometry1,particlesMaterial1)
scene.add(particles1)


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // let size = Math.sin(elapsedTime * 0.5) * 0.0004
  scene.children[2].material.size = Math.cos(elapsedTime)/10


  // Update controls
  // controls.update()

  // update camera
  camera.position.x = cursor.x;
  camera.position.y = cursor.y;

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()