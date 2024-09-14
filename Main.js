// إعداد خلفية النجوم
const starBackground = document.querySelector('.star-background');

// عدد النجوم
const starCount = 300;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // حجم عشوائي للنجمة
    const size = Math.random() * 2 + 1; // حجم أصغر لنجوم خلفية
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // تحديد موقع النجمة
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;

    // لون عشوائي للنجمة
    const color = `rgba(255, 255, 255, ${Math.random()})`;
    star.style.backgroundColor = color;

    // إضافة النجمة إلى الخلفية
    starBackground.appendChild(star);

    // تحريك النجمة لأسفل بتأثير التوهج
    star.animate([
        { transform: 'translateY(0)', opacity: 0.8 },
        { transform: 'translateY(100vh)', opacity: 0 }
    ], {
        duration: Math.random() * 10000 + 10000,  // وقت الحركة عشوائي
        iterations: Infinity,
        easing: 'linear'
    });
}

// إعداد مشهد Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('galaxyCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// تحميل النسيج (Texture) للكواكب
const textureLoader = new THREE.TextureLoader();

// إنشاء كواكب باستخدام صور ثلاثية الأبعاد
function createPlanet(size, texturePath, position) {
    const geometry = new THREE.SphereGeometry(size, 64, 64); // زيادة تفاصيل الكوكب
    
    // تحميل النسيج من الملف
    const texture = textureLoader.load(texturePath);
    
    // تطبيق النسيج على المادة
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.5, // إضافة تأثير خشونة للمادة
        metalness: 0.5
    });

    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position.x, position.y, position.z);
    scene.add(planet);
    return planet;
}

// إنشاء الكواكب مع تكبير حجمها
const planet1 = createPlanet(8, 'images/textures/planet1.jpg', { x: 20, y: 0, z: 0 });
const planet2 = createPlanet(8.5, 'images/textures/planet2.jpg', { x: 25, y: 0, z: 0 });
const planet3 = createPlanet(9, 'images/textures/planet3.jpg', { x: 30, y: 0, z: 0 });

// إضافة نجم مركزي مع صورة ثلاثية الأبعاد للشمس
const sunTexture = textureLoader.load('images/textures/sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    emissive: 0xFFFF00, // لون التوهج
    emissiveIntensity: 2 // زيادة شدة التوهج
});
const sunGeometry = new THREE.SphereGeometry(20, 40, 50);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// إضافة مصدر ضوء للنجمة
const sunLight = new THREE.PointLight(0xFFFFFF, 3, 100); // تقليل شدة الضوء قليلاً
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// ضبط الكاميرا
camera.position.z = 100;

// إنشاء حلقة الرسوم المتحركة
function animate() {
    requestAnimationFrame(animate);

    // تحريك الكواكب حول النجم
    planet1.position.x = Math.sin(Date.now() * 0.0003) * 82;
    planet1.position.z = Math.cos(Date.now() * 0.0003) * 40;

    planet2.position.x = Math.sin(Date.now() * 0.0002) * 70;
    planet2.position.z = Math.cos(Date.now() * 0.0002) * 40;

    planet3.position.x = Math.sin(Date.now() * 0.0004) * 90;
    planet3.position.z = Math.cos(Date.now() * 0.0004) * 40;

    // إضافة دوران للكواكب حول محورها
    planet1.rotation.y += 0.01;
    planet2.rotation.y += 0.01;
    planet3.rotation.y += 0.01;

    // إضافة دوران للشمس حول محورها
    sun.rotation.y += 0.002;

    renderer.render(scene, camera);
}

animate();
// landing_____________________________________________________

document.addEventListener("DOMContentLoaded", function() {
    // استدعاء العنصرين السهم والمحتوى
    const content = document.querySelector('.landing .content');
    const toggleButton = document.querySelector('.landing .change-background');

    // حالة افتراضية للمحتوى (مخفى)
    let isContentVisible = false;

    // وظيفة تبديل حالة الإظهار والإخفاء
    toggleButton.addEventListener('click', function() {
        if (isContentVisible) {
            content.classList.remove('show');  // إخفاء المحتوى بانسيابية
            toggleButton.classList.remove('fa-angle-left'); // عكس اتجاه السهم
            toggleButton.classList.add('fa-angle-right');
        } else {
            content.classList.add('show'); // إظهار المحتوى بانسيابية
            toggleButton.classList.remove('fa-angle-right');
            toggleButton.classList.add('fa-angle-left');
        }
        isContentVisible = !isContentVisible; // تبديل الحالة
    });
});
