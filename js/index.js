import { FBXLoader } from '/loaders/FBXLoader.js'
import '/loaders/TTFLoader.js'

//import games data
const byYear = [0,0,0,0,0,0,0];
for (var y = 0; y < 7; y++) {
  for (var i = 0; i < 319; i++){
    if (data[i]["Année"] == 1996+y)
      byYear[y] += 1;
  }
}
console.log(byYear)

const genre = [0,0,0,0,0,0,0,0,0,0];
for (var i = 0; i < 319; i++){
  if (data[i]["Type"] == "Platform")
    genre[0] += 1;
  else if (data[i]["Type"] == "Racing")
    genre[1] += 1;
  else if (data[i]["Type"] == "Shooter")
    genre[2] += 1;
  else if (data[i]["Type"] == "Action")
    genre[3] += 1;
  else if (data[i]["Type"] == "Fighting")
    genre[4] += 1;
  else if (data[i]["Type"] == "Strategy")
    genre[5] += 1;
  else if (data[i]["Type"] == "Simulation")
    genre[6] += 1;
  else if (data[i]["Type"] == "Sports")
    genre[7] += 1;
  else if (data[i]["Type"] == "Puzzle")
    genre[8] += 1;
  else
    genre[9] += 1;
  }
console.log(genre)

const editor = [0,0,0,0,0,0,0,0,0,0];
for (var i = 0; i < 319; i++)
{
  if (data[i]["Editeur"] == "Acclaim Entertainment")
    editor[0] += 1;
  else if (data[i]["Editeur"] == "Activision")
    editor[1] += 1;
  else if (data[i]["Editeur"] == "Electronic Arts")
    editor[2] += 1;
  else if (data[i]["Editeur"] == "GT Interactive")
    editor[3] += 1;
  else if (data[i]["Editeur"] == "Kemco")
    editor[4] += 1;
  else if (data[i]["Editeur"] == "Konami Digital Entertainment")
    editor[5] += 1;
  else if (data[i]["Editeur"] == "Nintendo")
    editor[6] += 1;
  else if (data[i]["Editeur"] == "THQ")
    editor[7] += 1;
  else if (data[i]["Editeur"] == "Ubisoft")
    editor[8] += 1;
  else
    editor[9] +=1;
}
console.log(editor)

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

// Text
const text_loader = new THREE.FontLoader();
text_loader.load('../assets/KenPixel_Regular.json', (font) => {
  const geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: .3,
		height: 0.001,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: .04,
		bevelSize: .01,
		bevelOffset: 0,
		bevelSegments: 1
	} );
  const mesh = new THREE.Mesh(geometry, 
    new THREE.MeshStandardMaterial({
      color:'gray',
      metalness: 0.0,
      roughness: 0.5
    }))
  mesh.position.set(0, 7, 0)
  mesh.rotation.set(0, 45, 0)
  scene.add(mesh)
})

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
    let yPos = 3.2 + maxSize/2 + .001

    var geometry = new THREE.BoxGeometry( 1, maxSize, 1);
    var material = new THREE.MeshPhongMaterial({color: 0x31326f, transparent: true, opacity: .95})
    const cube = new THREE.Mesh ( geometry, material );
    scene.add( cube )
    cube.position.x = xPos;
    cube.position.y = yPos;
    cube.position.z = zPos;
  }
}
place_stats(5, 2.2)

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
