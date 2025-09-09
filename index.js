import * as THREE from 'three';
//import {Tween, Easing} from '/interpolator.js';

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
    return Math.floor(scrollPercent);
}


const stories = [
	{
		"title": "A Robbery Incident Killed His Wife and Unravelled His Whole Life",
		"link": "https://interactive3.humanglemedia.com/a-robbery-incident-killed-his-wife-and-unravelled-his-whole-life",
		"imgurl": "./images/IMG_1009_featured-1024x768.jpg"
	},
	{
		"title": "The Disappearing Naira - A Data-Driven Dive into Nigeria’s Vanishing Currency",
		"link": "https://interactive5.humanglemedia.com/the-disappearing-naira",
		"imgurl": "./images/2-1-1024x576.png"
	},
	{
		"title": "IPOB’s Monday Curfews Through The Lens Of Google’s Foot Traffic Data",
		"link": "https://interactive4.humanglemedia.com/ipobs-Monday-curfews-through-the-lens-of-googles-foot-traffic-data/",
		"imgurl": "./images/IMG_9862-1024x508.png"
	},
	{
		"title": "Nigeria Is Losing The Fight For Education",
		"link": "https://interactive3.humanglemedia.com/nigeria-is-losing-the-fight-for-education",
		"imgurl": "./images/Nigeria_Is_Loosing_The_Fight_Against_Education_drypoint-1024x574.jpg"
	},
	{
		"title": "Where Do You Run To?: A Tale Of Unequal Access To Aid For Displaced Persons In Adamawa",
		"link": "https://interactive2.humanglemedia.com/unequal-access-aid",
		"imgurl": "./images/unequal-access-aid-1024x591.png"
	},
	{
		"title": "Our past, present, future and impact",
		"link": "https://interactive2.humanglemedia.com/welcome-to-humangle/",
		"imgurl": "./images/6-1024x417.jpg"
	},
	{
		"title": "The Northern Nigeria Roads That Have Become Terror Traps",
		"link": "https://interactive.humanglemedia.com/the-northern-nigeria-roads-that-have-become-terror-traps/",
		"imgurl": "./images/Terror-Traps-768x432.png"
	},
	{
		"title": "Nigeria’s Coat Of Arms",
		"link": "https://interactive.humanglemedia.com/nigerias-coat-of-arms/",
		"imgurl": "./images/Landscape-768x432.png"
	},
	{
		"title": "Unhappy Women; Abuse, Divorce And Drug Addiction In Kano",
		"link": "https://interactive.humanglemedia.com/the-straight-line-between-divorce-poverty-and-addiction-for-kano-women3/",
		"imgurl": "./images/8-768x930.jpg"
	},
	{
		"title": "Knifar: The Women Who Spoke Out",
		"link": "https://interactive.humanglemedia.com/knifar-the-women-who-spoke-out-2/",
		"imgurl": "./images/camp-idp-female--768x512.jpg"
	},
	{
		"title": "A Triad Of Nightmares",
		"link": "https://interactive.humanglemedia.com/a-triad-of-nightmares/",
		"imgurl": "./images/A-Triad-Of-Nightmares-Landscape-768x432.jpg"
	},
	{
		"title": "#AK9Train: Timeline From Attack To Release",
		"link": "https://interactive.humanglemedia.com/ak9train-timeline-from-attack-to-release/",
		"imgurl": "./images/Train-Attack-2-768x513.jpg"
	},
	{
		"title": "Nigeria’s Missing Persons Problem: The Numbers, The Faces",
		"link": "https://interactive.humanglemedia.com/nigerias-missing-persons-problem-the-numbers-the-faces/",
		"imgurl": "./images/kunleadebajo_Poster_with_the_words_MISSING_PERSON_and_the_face-768x512.jpg"
	},
	{
		"title": "Bama In Northeast Nigeria Shrinks And Stretches As Boko Haram War Lingers",
		"link": "https://interactive.humanglemedia.com/bama-in-northeast-nigeria-shrinks-and-stretches-as-boko-haram-war-lingers/",
		"imgurl": "./images/Bama-Landscape-768x432.png"
	},
	{
		"title": "Nigeria’s Capital Is Encircled By Insecurity. It Looks Like This",
		"link": "https://interactive.humanglemedia.com/nigerias-capital-is-encircled-by-insecurity-it-looks-like-this/",
		"imgurl": "./images/Abuja-768x432.jpg"
	},
	{
		"title": "It’s The Little Things: Life As A Visually Impaired Person",
		"link": "https://interactive.humanglemedia.com/its-the-little-things-life-as-a-visually-impaired-person/",
		"imgurl": "./images/Its-the-little-things-768x425.png"
	},
	{
		"title": "All Die Na Die: At The Heart Of Nigeria’s Soot Problem",
		"link": "https://interactive.humanglemedia.com/all-die-na-die-at-the-heart-of-nigerias-soot-problem/",
		"imgurl": "./images/All-Die-Na-Die-768x398.jpg"
	}
];


//animation for each story link
for (let x=0; x<stories.length; x++){
	stories[x].tl = new ViewTimeline({
		subject: document.getElementsByTagName("a")[x],
	});
	document.getElementsByTagName("a")[x].animate({
		opacity: [0, 1],
	}, {
		easing: 'ease-in',
		timeline: stories[x].tl,
	});
}

let main = () => {
	
	//canvas
	const canvas = document.getElementById("c");
	const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, premultipliedAlpha: false, precision: 'lowp', powerPreference: 'low-power'});
	renderer.setPixelRatio(1.0);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	renderer.xr.enabled = true;
	renderer.xr.setReferenceSpaceType('local');
	renderer.xr.setFoveation(1.0);
	
	//camera
	const fov = 45;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 0.1;
	const far = 128;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(-0.5, 0.5, 2);
	camera.lookAt(1, -1, -10);
	
	//lights
	const color = 0xFFFFFF;
	const intensity = 10;
	const light = new THREE.SpotLight(color, intensity);
	light.position.set(0, 0, 1);
	light.target.position.set(0, 0, 0);
	light.angle = 1;
	light.distance = 20;
	light.penumbra = 1;
	
	//scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color("#000000");
	scene.add(light);
	scene.add(light.target);
	const pCardsLinks = new THREE.Object3D();
	
	//photocards linking to story webpage
	const makePhotoCards = (index) => {
		const loader = new THREE.TextureLoader();
		const texture = loader.load(stories[index].imgurl, (tex) => {
			stories[index].width = tex.image.naturalWidth;
			stories[index].height = tex.image.naturalHeight;
			const aspectratio = stories[index].height/stories[index].width;
			
			texture.colorSpace = THREE.SRGBColorSpace;
			const lineGeometry =  new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(1, 1, -(index+1)),
				new THREE.Vector3(1, 6, -(index+1)),
			]);
			const line = new THREE.Line(lineGeometry);
			const marginGeometry = new THREE.PlaneGeometry(2.1, 2.5);
			const marginMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.FrontSide, shininess: 90});
			const marginCard = new THREE.Mesh(marginGeometry, marginMaterial);
			const cardGeometry = new THREE.PlaneGeometry(2, 2*aspectratio);
			const cardMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.FrontSide, map: texture, shininess: 90});
			const photoCard = new THREE.Mesh(cardGeometry, cardMaterial);
			marginCard.position.set(1, 0, -(index+1)+0.01);
			photoCard.position.set(1, 0, -(index+1)+0.02);
			//photoCard.lookAt(camera.position);
			line.add(marginCard);
			line.add(photoCard);
			pCardsLinks.add(line);
		});
	}
	
	//make for each story
	for (let x=0; x<stories.length; x++){
		makePhotoCards(x);
	}
	scene.add(pCardsLinks);
	
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}
	
	let render = (time) => {
		
		renderer.render(scene, camera);
		
		let currentCardID = Math.floor(getScrollPercentage()/(100/stories.length));
		
	}
	
	renderer.setAnimationLoop(render);
}

main();