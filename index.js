import * as THREE from 'three';
import {Tween, Easing} from '/tween.esm.js';

const stories = [
	{
		"title": "",
		"link": "",
		"imgurl": ""
	},
	{
		"title": "",
		"link": "",
		"imgurl": ""
	}
];

let main = () => {
	
	//canvas
	const canvas = document.getElementById("c");
	const renderer = new THREE.WebGLRenderer({canvas, alpha: true, premultipliedAlpha: false, precision: 'lowp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	renderer.xr.enabled = true;
	renderer.xr.setReferenceSpaceType('local');
	renderer.xr.setFoveation(1.0);
	
	//camera
	const fov = 60;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 128;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 1.6, 0);
	
	//scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color("#000000");
	const pCardsLinks = new THREE.Object3D();
	
	//photocards linking to story webpage
	const makePhotoCards = (dfcp) => {
		//const loader = new THREE.TextureLoader();
		//const texture = loader.load( 'resources/images/wall.jpg' );
		//texture.colorSpace = THREE.SRGBColorSpace;
		const cardGeometry = new THREE.PlaneGeometry(1, 1);
		const cardMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
		const photoCard = new THREE.Mesh(cardGeometry, cardMaterial);
		photoCard.position.set(dfcp, 0, 0);
		return photoCard;
	}
	
	//make for each story
	for (let x=0; x<stories.length; x++){
		pCardsLinks.add(makePhotoCards(x+1));
	}
	scene.add(pCardsLinks);
	
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}
	
	let render = (time) => {
		
		renderer.render(scene, camera);
		
	}
	
	renderer.setAnimationLoop(render);
}

main();