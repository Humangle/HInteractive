import * as THREE from 'three';
import {Tween, Easing} from 'interpolator';

const getScrollPercentage = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const scrollableHeight = documentHeight - viewportHeight;

    // No scrollable height
    if (scrollableHeight === 0) {
        return 0;
    }

    const scrollPercent = (scrollTop / scrollableHeight) * 100;
    return scrollPercent;
}


const stories = [
	{
		"title": "A Robbery Incident Killed His Wife and Unravelled His Whole Life",
		"link": "https://interactive3.humanglemedia.com/a-robbery-incident-killed-his-wife-and-unravelled-his-whole-life",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/IMG_1009_featured-1024x768-min.jpg"
	},
	{
		"title": "The Disappearing Naira - A Data-Driven Dive into Nigeria’s Vanishing Currency",
		"link": "https://interactive5.humanglemedia.com/the-disappearing-naira",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/2-1-1024x576-min.jpg"
	},
	{
		"title": "IPOB’s Monday Curfews Through The Lens Of Google’s Foot Traffic Data",
		"link": "https://interactive4.humanglemedia.com/ipobs-Monday-curfews-through-the-lens-of-googles-foot-traffic-data/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/IMG_9862-1024x508-min.jpg"
	},
	{
		"title": "Nigeria Is Losing The Fight For Education",
		"link": "https://interactive3.humanglemedia.com/nigeria-is-losing-the-fight-for-education",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Nigeria_Is_Loosing_The_Fight_Against_Education_drypoint-1024x574-min.jpg"
	},
	{
		"title": "Where Do You Run To?: A Tale Of Unequal Access To Aid For Displaced Persons In Adamawa",
		"link": "https://interactive2.humanglemedia.com/unequal-access-aid",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/unequal-access-aid-1024x591-min.jpg"
	},
	{
		"title": "Our past, present, future and impact",
		"link": "https://interactive2.humanglemedia.com/welcome-to-humangle/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/6-1024x417-min.jpg"
	},
	{
		"title": "The Northern Nigeria Roads That Have Become Terror Traps",
		"link": "https://interactive.humanglemedia.com/the-northern-nigeria-roads-that-have-become-terror-traps/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Terror-Traps-768x432-min.jpg"
	},
	{
		"title": "Nigeria’s Coat Of Arms",
		"link": "https://interactive.humanglemedia.com/nigerias-coat-of-arms/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Landscape-768x432-min.jpg"
	},
	{
		"title": "Unhappy Women; Abuse, Divorce And Drug Addiction In Kano",
		"link": "https://interactive.humanglemedia.com/the-straight-line-between-divorce-poverty-and-addiction-for-kano-women3/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/8-768x930-min.jpg"
	},
	{
		"title": "Knifar: The Women Who Spoke Out",
		"link": "https://interactive.humanglemedia.com/knifar-the-women-who-spoke-out-2/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/camp-idp-female--768x512-min.jpg"
	},
	{
		"title": "A Triad Of Nightmares",
		"link": "https://interactive.humanglemedia.com/a-triad-of-nightmares/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/A-Triad-Of-Nightmares-Landscape-768x432-min.jpg"
	},
	{
		"title": "#AK9Train: Timeline From Attack To Release",
		"link": "https://interactive.humanglemedia.com/ak9train-timeline-from-attack-to-release/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Train-Attack-2-768x513-min.jpg"
	},
	{
		"title": "Nigeria’s Missing Persons Problem: The Numbers, The Faces",
		"link": "https://interactive.humanglemedia.com/nigerias-missing-persons-problem-the-numbers-the-faces/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/kunleadebajo_Poster_with_the_words_MISSING_PERSON_and_the_face-768x512-min.jpg"
	},
	{
		"title": "Bama In Northeast Nigeria Shrinks And Stretches As Boko Haram War Lingers",
		"link": "https://interactive.humanglemedia.com/bama-in-northeast-nigeria-shrinks-and-stretches-as-boko-haram-war-lingers/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Bama-Landscape-768x432-min.jpg"
	},
	{
		"title": "Nigeria’s Capital Is Encircled By Insecurity. It Looks Like This",
		"link": "https://interactive.humanglemedia.com/nigerias-capital-is-encircled-by-insecurity-it-looks-like-this/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Abuja-768x432-min.jpg"
	},
	{
		"title": "It’s The Little Things: Life As A Visually Impaired Person",
		"link": "https://interactive.humanglemedia.com/its-the-little-things-life-as-a-visually-impaired-person/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/Its-the-little-things-768x425-min.jpg"
	},
	{
		"title": "All Die Na Die: At The Heart Of Nigeria’s Soot Problem",
		"link": "https://interactive.humanglemedia.com/all-die-na-die-at-the-heart-of-nigerias-soot-problem/",
		"imgurl": "https://raw.githubusercontent.com/LearningMike/HInteractive/refs/heads/main/images/All-Die-Na-Die-768x398-min.jpg"
	}
];

let currentCardID = 0;

let main = (screen) => {
	
	//canvas
	const canvas = document.getElementById("c");
	const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, premultipliedAlpha: false, precision: 'lowp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	
	//camera
	const fov = screen;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 128;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(-0.5, 0.5, 2);
	camera.lookAt(1, -1, -10);
	
	//lights
	const color = 0xFFFFFF;
	const intensity = 200;
	const light = new THREE.SpotLight(color, intensity);
	light.position.set(0, 3, 3);
	light.target.position.set(0.8, 1.2, 0);
	light.angle = 0.6;
	light.distance = 40;
	light.penumbra = 1;
	light.decay = 2.7;
	
	//scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color("#000000");
	scene.add(camera);
	scene.add(light);
	scene.add(light.target);
	camera.add(light);
	camera.add(light.target);
	const pCardsLinks = new THREE.Object3D();
	
	//photocards linking to story webpage
	const makePhotoCards = (index) => {
		const loader = new THREE.TextureLoader();
		const blanktexture = loader.load(stories[0].imgurl);
		blanktexture.colorSpace = THREE.SRGBColorSpace;
		const lineGeometry =  new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(1, -1, -(index+1)),
			new THREE.Vector3(1, 20, -(index+1)),
		]);
		const line = new THREE.Line(lineGeometry);
		const marginGeometry = new THREE.PlaneGeometry(2.2, 2.5);
		const marginMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.FrontSide, shininess: 10, specular: 0xFFFFFF});
		const marginCard = new THREE.Mesh(marginGeometry, marginMaterial);
		const cardGeometry = new THREE.PlaneGeometry(2, 2);
		const cardMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.FrontSide, map: blanktexture, shininess: 50, specular: 0xF0F0F0});
		const photoCard = new THREE.Mesh(cardGeometry, cardMaterial);
		marginCard.position.set(1, 0, -(index+1)+0.01);
		photoCard.position.set(1, 0, -(index+1)+0.02);
		//photoCard.lookAt(camera.position);
		line.add(marginCard);
		line.add(photoCard);
		line.name = ""+index;
		pCardsLinks.add(line);
		
		const texture = loader.load(stories[index].imgurl, (tex) => {
			texture.colorSpace = THREE.SRGBColorSpace;
			stories[index].width = tex.image.naturalWidth;
			stories[index].height = tex.image.naturalHeight;
			const aspectratio = stories[index].height/stories[index].width;
			pCardsLinks.children[index].children[1].scale.y = aspectratio;
			pCardsLinks.children[index].children[1].material.map = texture;
		});
	}
	
	//make for each story
	for (let x=0; x<stories.length; x++){
		makePhotoCards(x);
	}
	scene.add(pCardsLinks);
	
	class MousePickHelper extends THREE.EventDispatcher {
		constructor(scene) {
			super();
			this.raycaster = new THREE.Raycaster();
			this.selectedObject = new THREE.Object3D();
			this.pointer = new THREE.Vector2();
			
			const onPointerDown = (event) => {
				this.dispatchEvent({type: event.type, object: this.selectedObject});
			}
			
			window.addEventListener('pointerdown', onPointerDown);
		}
		reset(){
			this.selectedObject = new THREE.Object3D;
		}
		update(pickablesParent, time){
			this.reset();
			
			this.raycaster.setFromCamera(this.pointer, camera);
			
			const intersections = this.raycaster.intersectObjects(pickablesParent.children);
			
			document.body.style.cursor = "auto";
			for ( let i = 0; i < intersections.length; i++ ) {
				if (parseInt(intersections[i].object.name) < stories.length && currentCardID != null){
					this.selectedObject = intersections[i].object;
					pCardsLinks.children[currentCardID].children[1].material.specular = new THREE.Color(0x000000);
					pCardsLinks.children[currentCardID].children[1].material.shininess = 0;
					document.body.style.cursor = "pointer";
				}
			}
			if ((intersections.length == 0) && (document.body.style.cursor == "pointer")){
				document.getElementById("c").style.cursor = "auto";
			}
		}
	}
	
	const DesktopPicker = new MousePickHelper(scene);
	DesktopPicker.addEventListener('pointerdown', (event) => {
		if (camera.fov < 60){
			window.open(stories[currentCardID].link, '_blank');
		}
	});
	
	const onPointerMove = (event) => {
		DesktopPicker.pointer.x = (event.clientX/canvas.clientWidth) * 2 - 1;
		DesktopPicker.pointer.y = - (event.clientY/canvas.clientHeight) * 2 + 1;
	}
	
	const onWindowResize = () => {
		if (window.innerHeight > window.innerWidth+(window.innerWidth/2)) {
			camera.fov = 90;
		} else {
			camera.fov = 45;
		}
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}
	
	let render = (time) => {
		
		renderer.render(scene, camera);
		
		currentCardID = Math.floor((getScrollPercentage())/(100/stories.length));
		
		camera.position.set(-0.5, 0.5, 2-(getScrollPercentage()/6));
		
		for (let x in pCardsLinks.children){
			if (x < currentCardID){
				pCardsLinks.children[x].visible = false;
			} else {
				pCardsLinks.children[x].visible = true;
			}
			pCardsLinks.children[x].children[1].material.specular = new THREE.Color(0xF0F0F0);
			pCardsLinks.children[x].children[1].material.shininess = 50;
		}
		
		DesktopPicker.update(pCardsLinks, time);
		
	}
	
	renderer.setAnimationLoop(render);
	window.addEventListener('pointermove', onPointerMove);
	window.addEventListener('resize', onWindowResize);
}

if (window.innerHeight > window.innerWidth+(window.innerWidth/2)) {
	main(90);
} else {
	main(45);
}