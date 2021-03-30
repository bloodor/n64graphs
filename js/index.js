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
let font



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
camera.position.y = 20
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

// Stats
const maxSize = 3
const maxNumberOfOption = 10
var numberOfOption = 5

const cube0 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube1 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube2 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube3 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube4 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube5 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube6 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube7 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube8 = new THREE.BoxGeometry( 1, maxSize, 1);
const cube9 = new THREE.BoxGeometry( 1, maxSize, 1);


const text_mesh0 = new THREE.Mesh()
const text_mesh1 = new THREE.Mesh()
const text_mesh2 = new THREE.Mesh()
const text_mesh3 = new THREE.Mesh()
const text_mesh4 = new THREE.Mesh()
const text_mesh5 = new THREE.Mesh()
const text_mesh6 = new THREE.Mesh()
const text_mesh7 = new THREE.Mesh()
const text_mesh8 = new THREE.Mesh()
const text_mesh9 = new THREE.Mesh()


var cube = [cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9]
var text_mesh = [text_mesh0, text_mesh1, text_mesh2, text_mesh3, text_mesh4, text_mesh5, text_mesh6, text_mesh7, text_mesh8, text_mesh9]
var arrayStat = [.3, .4, .2, .8, 1, .8, .2, .6, .2, .1]
var arrayString = [".3", ".4", ".2", ".8", "1", ".8", ".2", ".6", ".2", ".1"]

create_stats()

function create_stats() {
  for(let i = 0; i < maxNumberOfOption; i++) {
    var geometry = new THREE.BoxGeometry( 1, maxSize, 1);
    var material = new THREE.MeshPhongMaterial({color: 0x31326f, transparent: true, opacity: .95})
    cube[i] = new THREE.Mesh ( geometry, material );
    scene.add( cube[i] )
    cube[i].scale.set(0, 0, 0)
  }
}

function set_stats(number, distance, array_stat, array_string) {
  if (number > maxNumberOfOption) {
    number = maxNumberOfOption
  }

  let degreePerPoint = 360/number;
  for(let i = 0; i < maxNumberOfOption; i++) {
    if (text_mesh[i] != null) {
      text_mesh[i].position.set(800000, 8000000, 8000000)
    }
      
    if (i < number) {
      cube[i].scale.set(1, maxSize * array_stat[i], 1)
      let xPos = distance * Math.sin(degrees_to_radians(degreePerPoint * i))
      let zPos = distance * Math.cos(degrees_to_radians(degreePerPoint * i))
      let yPos = 3.201 + (maxSize * array_stat[i] * 1.5)
      let textYPos = 3.301 + (maxSize * array_stat[i] * 3)

      cube[i].position.x = xPos;
      cube[i].position.y = yPos;
      cube[i].position.z = zPos;

      const geometry = new THREE.TextGeometry( array_string[i], {
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

      text_mesh[i] = new THREE.Mesh(geometry, 
        new THREE.MeshStandardMaterial({
          color:'gray',
          metalness: 0.0,
          roughness: 0.5
        }))
      text_mesh[i].position.set(xPos, textYPos, zPos)
      text_mesh[i].rotation.set(0, 45, 0)
      
      scene.add(text_mesh[i])

    } else {
      cube[i].scale.set(0, 0, 0)
    }
  }
}

// Cube animation
function animate() {
    requestAnimationFrame( animate )
    
    controls.update();
    renderer.render( scene, camera );
}
animate()


text_loader.load('../assets/KenPixel_Regular.json', (myfont) => {
  font = myfont;
  init()
})


function init() {
  set_stats(2, 2.2, arrayStat, arrayString)
  set_stats(10, 2.2, arrayStat, arrayString)
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
