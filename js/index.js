import { FBXLoader } from '/loaders/FBXLoader.js'

//import games data
var count = 0;
var Games = fetch('../assets/N64Json.json')
  .then(response => response.json())

  for (var i = 0; Games["Games"][i]["Année"] == 1999; i++){
    count += 1;
  }
  console.log(count);

// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true});

//Mesh Import
const loader = new FBXLoader();

// N64 Logo
loader.load( '../assets/logo.fbx', function ( object ) {
    const ncube = object;
    scene.add( ncube );
    ncube.scale.set(.01, .01, .01)
} );

// Statistic plane
var texture, material, plane;

texture = new THREE.TextureLoader().load('../assets/tile_web.png' );

material = new THREE.MeshPhongMaterial({
  map: texture,
  transparent: true
})

plane = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), material);
plane.material.side = THREE.DoubleSide;

scene.add( plane );

plane.rotation.x = degrees_to_radians(90)
plane.position.y = 3.2



// Apply the size of the window for the renderer
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const controls = new THREE.OrbitControls(camera, renderer.domElement);


camera.position.x = 10
camera.position.y = 10
camera.position.z = 10

controls.update();

// Make lights
var ambiantLight = new THREE.AmbientLight ( 0xffffff, 1)
scene.add(ambiantLight)

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);
var pointLightTwo = new THREE.PointLight(0xffffff, 1);
pointLightTwo.position.set(-25, -20, -25);
scene.add(pointLightTwo);

// Cube animation
function animate() {
    requestAnimationFrame( animate )

    controls.update();
    renderer.render( scene, camera );
}
animate()

// Stats
const maxSize = 3

function place_stats(number, distance) {
  let degreePerPoint = 360/number;
  for(let i = 0; i < number; i++) {
    let xPos = distance * Math.sin(degrees_to_radians(degreePerPoint * i))
    let zPos = distance * Math.cos(degrees_to_radians(degreePerPoint * i))
    let yPos = 3.2 + maxSize/2

    var geometry = new THREE.BoxGeometry( 1, maxSize, 1);
    var material = new THREE.MeshPhongMaterial({color: 0x31326f, transparent: true, opacity: .95})
    const cube = new THREE.Mesh ( geometry, material );
    scene.add( cube )
    cube.position.x = xPos;
    cube.position.y = yPos;
    cube.position.z = zPos;
  }
}
place_stats(10, 2.2)

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
