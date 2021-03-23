import { FBXLoader } from '../loaders/FBXLoader.js'

// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true});

//Mesh Import
const loader = new FBXLoader();

loader.load( 'logo.fbx', function ( object ) {

    scene.add( object );

} );

// Apply the size of the window for the renderer
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

camera.position.y = 2
camera.position.z = 2

// Make lights
var ambiantLight = new THREE.AmbientLight ( 0xffffff, 0.5)
scene.add(ambiantLight)

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

// Cube animation
function animate() {
    requestAnimationFrame( animate )

    renderer.render( scene, camera )
}
animate()
