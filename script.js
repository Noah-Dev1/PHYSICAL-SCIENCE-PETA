// =============================================================================
// PLANET DATA
// =============================================================================

const PLANETS = {
    mercury: {
        name: "Mercury",
        radius: 0.8,
        distance: 15,
        orbitalSpeed: 0.02,
        rotationSpeed: 0.01,
        info: {
            distance: "57.9 million km",
            diameter: "4,879 km",
            orbitalPeriod: "88 Earth days",
            fact: "Mercury is the smallest planet in our solar system and closest to the Sun.",
            moon: 0 
        },
        texture: 'Images/mercury.jpg'
    },
    venus: {
        name: "Venus",
        radius: 1.5,
        distance: 22,
        orbitalSpeed: 0.015,
        rotationSpeed: 0.005,
        info: {
            distance: "108.2 million km",
            diameter: "12,104 km",
            orbitalPeriod: "225 Earth days",
            fact: "Venus rotates backwards compared to most planets - the Sun rises in the west!",
            moon:  0
        },
        texture: 'Images/venus_land.jpg'
    },
    earth: {
        name: "Earth",
        radius: 1.6,
        distance: 30,
        orbitalSpeed: 0.01,
        hasClouds: true,
        rotationSpeed: 0.05,
        info: {
            distance: "149.6 million km",
            diameter: "12,742 km",
            orbitalPeriod: "365.25 days",
            fact: "Earth is the only planet known to support life - at least that we know of!",
            moon: 1
        },
        texture: 'Images/earth.jpg'
    },
    mars: {
        name: "Mars",
        radius: 1.2,
        distance: 40,
        orbitalSpeed: 0.008,
        rotationSpeed: 0.04,
        info: {
            distance: "227.9 million km",
            diameter: "6,779 km",
            orbitalPeriod: "687 Earth days",
            fact: "Mars has the largest volcano in the solar system - Olympus Mons!",
            moon: 2
        },
        texture: 'Images/mars.jpg'
    },
    jupiter: {
        name: "Jupiter",
        radius: 5,
        distance: 60,
        orbitalSpeed: 0.004,
        rotationSpeed: 0.08,
        hasGreatRedSpot: true,
        info: {
            distance: "778.5 million km",
            diameter: "139,820 km",
            orbitalPeriod: "12 Earth years",
            fact: "Jupiter is the largest planet - more than twice as massive as all other planets combined!",
            moon: [95,97]
        },
        texture: 'Images/jupiter.jpg'
    },
    saturn: {
        name: "Saturn",
        radius: 4.0,
        distance: 80,
        orbitalSpeed: 0.003,
        rotationSpeed: 0.07,
        hasRings: true,
        ringInner: 5.5,
        ringOuter: 8.5,
        info: {
            distance: "1.4 billion km",
            diameter: "116,460 km",
            orbitalPeriod: "29 Earth years",
            fact: "Saturn's rings are made mostly of ice particles and rock debris!",
            moon: [146,274]
        },
        texture: 'Images/saturn.jpg'
    },
    uranus: {
        name: "Uranus",
        radius: 2.5,
        distance: 100,
        orbitalSpeed: 0.002,
        rotationSpeed: 0.06,
        info: {
            distance: "2.9 billion km",
            diameter: "50,724 km",
            orbitalPeriod: "84 Earth years",
            fact: "Uranus rotates on its side - like a rolling ball!",
            moon: [27,29]
        },
        texture: 'Images/uranus.jpg'
    },
    neptune: {
        name: "Neptune",
        radius: 2.4,
        distance: 120,
        orbitalSpeed: 0.001,
        rotationSpeed: 0.06,
        info: {
            distance: "4.5 billion km",
            diameter: "49,244 km",
            orbitalPeriod: "165 Earth years",
            fact: "Neptune has the strongest winds in the solar system - up to 2,100 km/h!",
            moon:[14,16]
        },
        texture: 'Images/neptune.jpg'   
    },
    moon: {
        name: "Moon",
        radius: 0.4,
        distance: 4,
        orbitalSpeed: 0.03,
        rotationSpeed: 0.01,
        isMoon: true,
        parentPlanet: "earth",
        info: {
            distance: "384,400 km from Earth",
            diameter: "3,474 km",
            orbitalPeriod: "27.3 days",
            fact: "The Moon is Earth's only natural satellite and is the fifth largest moon in the solar system!",
        },
        texture: 'Images/moon.jpg'
    }
};

// Sun info
const SUN_INFO = {
    name: "The Sun",
    info: {
        distance: "0 km (Center)",
        diameter: "1,392,700 km",
        orbitalPeriod: "N/A",
        fact: "The Sun contains 99.86% of all the mass in our solar system! It's about 4.6 billion years old."
    },
    texture: 'Images/sun.jpg'
};

// =============================================================================
// THREE.JS SETUP
// =============================================================================

// Scene setup
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 70, 180);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 400;

// =============================================================================
// CREATE SUN - Enhanced Version
// =============================================================================

// Create Sun with basic material (no textures)
const sunTextureLoader = new THREE.TextureLoader();
const sunTexture = sunTextureLoader.load(SUN_INFO.texture);

const sunGeometry = new THREE.SphereGeometry(8, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd00,
    map: sunTexture
});


const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Multiple glow layers for realistic sun effect
const glowColors = [
    { radius: 9, color: 0xff4400, opacity: 1 },
    { radius: 10, color: 0xff6600, opacity: 0.5 },
    { radius: 12, color: 0xff8800, opacity: 0.2 },
    { radius: 15, color: 0xffaa00, opacity: 0.1 }
];

glowColors.forEach(g => {
    const glowGeom = new THREE.SphereGeometry(g.radius, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: g.color,
        transparent: true,
        opacity: g.opacity,
        side: THREE.BackSide
    });
    const glowMesh = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glowMesh);
});

// Corona effect using sprites
const coronaCanvas = document.createElement('canvas');
coronaCanvas.width = 300;
coronaCanvas.height = 300;
const ctx = coronaCanvas.getContext('2d');
const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
gradient.addColorStop(0, 'rgba(255, 200, 50, 1)');
gradient.addColorStop(0.2, 'rgba(255, 150, 0, 0.8)');
gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.3)');
gradient.addColorStop(1, 'rgba(255, 50, 0, 0)');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 256, 256);

const coronaTexture = new THREE.CanvasTexture(coronaCanvas);
const coronaMaterial = new THREE.SpriteMaterial({ 
    map: coronaTexture, 
    transparent: true, 
    blending: THREE.AdditiveBlending 
});
const corona = new THREE.Sprite(coronaMaterial);
corona.scale.set(40, 40, 0);
sun.add(corona);

// Sun light with better distribution
const sunLight = new THREE.PointLight(0xffffff, 3, 400);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Ambient light for visibility
const ambientLight = new THREE.AmbientLight(0x202040, 0.4);
scene.add(ambientLight);

// =============================================================================
// CREATE STARFIELD
// =============================================================================

function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
        // Random position on a large sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 400 + Math.random() * 100;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xd9fff9,
        size: 1,
        sizeAttenuation: true,
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

createStarfield();

// =============================================================================
// CREATE PLANETS - Enhanced Design
// =============================================================================

const planetObjects = [];
const planetMeshes = []; // For raycasting

// Planet-specific colors for fallback
const planetColors = {
    mercury: 0x8c7853,
    venus: 0xe6c87a,
    earth: 0x6b93d6,
    mars: 0xc1440e,
    jupiter: 0xd8ca9d,
    saturn: 0xf4d59e,
    uranus: 0x72d6e5,
    neptune: 0x4b70dd,
    moon: 0xcccccc
};

// Atmosphere colors
const atmosphereColors = {
    earth: 0x4488ff,
    venus: 0xffdd88,
    jupiter: 0xffaa66,
    saturn: 0xffeecc,
    uranus: 0x88ffff,
    neptune: 0x6666ff
};

function createPlanet(key, data) {
    const planetGroup = new THREE.Group();
    
    // Create planet sphere with enhanced geometry (more segments for smoothness)
    const geometry = new THREE.SphereGeometry(data.radius, 120, 120);
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(data.texture)
    
    const material = new THREE.MeshStandardMaterial({
        color: planetColors[key] || 0x888888,
        roughness: .8,
        metalness: .4,
        flatShading: false,
        map: texture
    });
    
    const planet = new THREE.Mesh(geometry, material);
    planet.userData = { key: key, data: data };
    planetGroup.add(planet);
    planetMeshes.push(planet);

    // Add atmosphere glow for certain planets
    if (atmosphereColors[key]) {
        const atmosGeometry = new THREE.SphereGeometry(data.radius * 1.15, 120, 120);
        const atmosMaterial = new THREE.MeshBasicMaterial({
            color: atmosphereColors[key],
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
        planetGroup.add(atmosphere);
        
        // Outer glow
        const glowGeometry = new THREE.SphereGeometry(data.radius * 1.15, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: atmosphereColors[key],
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        planetGroup.add(glow);
    }
    
//     // Add clouds for Earth
//     if (data.hasClouds) {
//         const cloudGeometry = new THREE.SphereGeometry(data.radius * 1.02, 32, 32);
//         const cloudMaterial = new THREE.MeshStandardMaterial({
//             color: 0xffffff,
//             transparent: true,
//             opacity: 1,
//             roughness: 0,
//             metalness: 0
//         });
//         const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
//         planetGroup.add(clouds);
//     }
    
//     // Add Great Red Spot for Jupiter
// if (data.hasGreatRedSpot) {
//     const spotGeometry = new THREE.SphereGeometry(data.radius * 0.38, 64, 64);
//     const spotMaterial = new THREE.MeshStandardMaterial({
//         color: 0x8b4513,
//         roughness: 1,
//         metalness: 0,
//         opacity: .5
//     });

//     const spot = new THREE.Mesh(spotGeometry, spotMaterial);

//     // Position slightly above planet surface
//     spot.position.set(data.radius * 0.65, 0, data.radius * .01);

//     planetGroup.add(spot);
// }
    
    // Create orbit ring (dotted effect using points)
    const orbitPoints = [];
    const orbitSegments = 180;
    for (let i = 0; i <= orbitSegments; i++) {
        const angle = (i / orbitSegments) * Math.PI * 2;
        orbitPoints.push(
            Math.cos(angle) * data.distance,
            0,
            Math.sin(angle) * data.distance
        );
    }
    
    const orbitGeometry = new THREE.BufferGeometry();
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
    const orbitMaterial = new THREE.PointsMaterial({
        color: 0x656565,
        size: 1,
        transparent: true,
        opacity: 0.3
    });
    const orbit = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbit);
    
    // Solid orbit line (thin)
    const orbitLineGeom = new THREE.RingGeometry(
        data.distance - 0.5, 
        data.distance + 0.05, 128
    );

    const orbitLineMat = new THREE.MeshBasicMaterial({
        color: 0x333333,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const orbitLine = new THREE.Mesh(orbitLineGeom, orbitLineMat);
    orbitLine.rotation.x = -Math.PI / 2;
    
    scene.add(orbitLine);

    // Create Saturn's rings - enhanced version
    if (data.hasRings) {
        // Multiple ring bands for realistic effect
        const ringBands = [
            { inner: 5.0, outer: 5.5, color: 0xccbb99, opacity: 0.4 },
            { inner: 5.5, outer: 6.5, color: 0xddaa77, opacity: 0.6 },
            { inner: 6.5, outer: 7.2, color: 0xbb8866, opacity: 0.5 },
            { inner: 7.2, outer: 8.0, color: 0xaa7755, opacity: 0.4 },
            { inner: 8.0, outer: 8.8, color: 0xccbbaa, opacity: 0.3 }
        ];
        
        ringBands.forEach(band => {
            const ringGeom = new THREE.RingGeometry(band.inner, band.outer, 128);
            const ringMat = new THREE.MeshBasicMaterial({
                color: band.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: band.opacity
            });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.rotation.x =Math.PI / 2.5;
            planetGroup.add(ring);
        });
    }
    
    // Store planet data
    const planetData = {
        group: planetGroup,
        planet: planet,
        data: data,
        angle: Math.random() * Math.PI * 2 // Random starting position
    };
    
    planetObjects.push(planetData);
    scene.add(planetGroup);
    
    return planetData;
}

// Create all planets
Object.keys(PLANETS).forEach(key => {
    createPlanet(key, PLANETS[key]);
});

// Sun clickable mesh
const sunMeshes = [sun];

// =============================================================================
// PLANET LABELS - Position Tracking
// =============================================================================

// Get label DOM elements
const labels = {
    sun: document.getElementById('label-sun'),
    mercury: document.getElementById('label-mercury'),
    venus: document.getElementById('label-venus'),
    earth: document.getElementById('label-earth'),
    mars: document.getElementById('label-mars'),
    jupiter: document.getElementById('label-jupiter'),
    saturn: document.getElementById('label-saturn'),
    uranus: document.getElementById('label-uranus'),
    neptune: document.getElementById('label-neptune'),
    moon: document.getElementById('label-moon')
};

// Vector for position calculations
const tempV = new THREE.Vector3();

// Update label positions
function updateLabels() {
    // Update sun label
    tempV.setFromMatrixPosition(sun.matrixWorld);
    tempV.project(camera);
    const sunX = (tempV.x * 0.5 + 0.5) * window.innerWidth;
    const sunY = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;
    
    // Position label above sun (with offset)
    const sunLabelOffset = 20;
    if (tempV.z < 1) {
        labels.sun.style.left = sunX + 'px';
        labels.sun.style.top = (sunY - sunLabelOffset) + 'px';
        labels.sun.style.opacity = '1';
    } else {
        labels.sun.style.opacity = '0';
    }
    
    // Update planet labels
    planetObjects.forEach(obj => {
        const key = obj.data.name.toLowerCase();
        const label = labels[key];
        
        if (label) {
            // Get planet position in world space
            tempV.setFromMatrixPosition(obj.group.matrixWorld);
            tempV.project(camera);
            
            const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;
            
            // Position label above planet (with offset based on planet size)
            const labelOffset = obj.data.radius * 8 + 20;
            
            // Hide label if planet is behind camera
            if (tempV.z < 1) {
                label.style.left = x + 'px';
                label.style.top = (y - labelOffset) + 'px';
                label.style.opacity = '1';
            } else {
                label.style.opacity = '0';
            }
        }
    });
}

// =============================================================================
// RAYCASTING FOR CLICK DETECTION
// =============================================================================

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Check for planet intersections
    const planetIntersects = raycaster.intersectObjects(planetMeshes);
    
    if (planetIntersects.length > 0) {
        const planetData = planetIntersects[0].object.userData;
        showPlanetInfo(planetData.key, planetData.data);
        return;
    }
    
    // Check for sun intersection
    const sunIntersects = raycaster.intersectObjects(sunMeshes);
    if (sunIntersects.length > 0) {
        showSunInfo();
    }
}

window.addEventListener('click', onMouseClick);

// Touch support for mobile
window.addEventListener('touchend', (event) => {
    if (event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        // Create a synthetic click event
        onMouseClick({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }
});

// =============================================================================
// INFORMATION PANEL
// =============================================================================

function showPlanetInfo(key, data) {
    const nameEl = document.getElementById('planet-name');
    const contentEl = document.getElementById('info-content');
    
    nameEl.textContent = data.name;
    
    contentEl.innerHTML = `
        <div class="info-item">
            <span class="label">Distance from Sun:</span>
            <span class="value">${data.info.distance}</span>
        </div>
        <div class="info-item">
            <span class="label">Diameter:</span>
            <span class="value">${data.info.diameter}</span>
        </div>
        <div class="info-item">
            <span class="label">Orbital Period:</span>
            <span class="value">${data.info.orbitalPeriod}</span>
        </div>
        <div class="info-item">
            <span class="label">Moon/s:</span>
            <span class="value">${data.info.moon}</span>
        </div>
        <div class="fact">${data.info.fact}</div>
    `;
}

function showSunInfo() {
    const nameEl = document.getElementById('planet-name');
    const contentEl = document.getElementById('info-content');
    
    nameEl.textContent = SUN_INFO.name;
    
    contentEl.innerHTML = `
        <div class="info-item">
            <span class="label">Position:</span>
            <span class="value">${SUN_INFO.info.distance}</span>
        </div>
        <div class="info-item">
            <span class="label">Diameter:</span>
            <span class="value">${SUN_INFO.info.diameter}</span>
        </div>
        <div class="info-item">
            <span class="label">Orbital Period:</span>
            <span class="value">${SUN_INFO.info.orbitalPeriod}</span>
        </div>
        <div class="fact">${SUN_INFO.info.fact}</div>
    `;
}

// =============================================================================
// ANIMATION LOOP
// =============================================================================

let isPaused = false;

// Pause button functionality
const pauseBtn = document.getElementById('pause-btn');
pauseBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from triggering planet click
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Play' : 'Pause';
    pauseBtn.classList.toggle('paused', isPaused);
});

// Find Earth for Moon orbit reference
let earthPlanet = null;

function animate() {
    requestAnimationFrame(animate);
    
    // Only update planet positions if not paused
    if (!isPaused) {
        // First pass: update regular planets
        planetObjects.forEach(obj => {
            if (obj.data.isMoon) return; // Skip moons in first pass
            
            // Update orbital angle
            obj.angle += obj.data.orbitalSpeed;
            
            // Calculate new position
            const x = obj.data.distance * Math.cos(obj.angle);
            const z = obj.data.distance * Math.sin(obj.angle);
            
            obj.group.position.set(x, 0, z);
            
            // Rotate planet on axis
            obj.planet.rotation.y += obj.data.rotationSpeed;
            
            // Store Earth reference for Moon
            if (obj.data.name === "Earth") {
                earthPlanet = obj;
            }
        });
        
        // Second pass: update moons (orbits around parent planet)
        planetObjects.forEach(obj => {
            if (!obj.data.isMoon || !earthPlanet) return;
            
            // Update orbital angle
            obj.angle += obj.data.orbitalSpeed;
            
            // Calculate position relative to parent planet
            const parentX = earthPlanet.group.position.x;
            const parentZ = earthPlanet.group.position.z;
            
            const x = parentX + obj.data.distance * Math.cos(obj.angle);
            const z = parentZ + obj.data.distance * Math.sin(obj.angle);
            
            obj.group.position.set(x, 0, z);
            
            // Rotate moon on axis
            obj.planet.rotation.y += obj.data.rotationSpeed;
        });
        
        // Rotate sun
        sun.rotation.y += 0.002;
    }
    
    // Update planet labels
    updateLabels();
    
    // Update controls
    controls.update();
    
    // Render
    renderer.render(scene, camera);
}

// =============================================================================
// WINDOW RESIZE HANDLER
// =============================================================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// =============================================================================
// START
// =============================================================================

// Hide loading screen after a short delay
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
}, 0);

// Start animation
animate();

