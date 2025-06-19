// Global variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Loading screen management
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initHeroAnimations();
            }, 500);
        }
    }, 100);
}

// WebGL Background with Three.js
function initWebGL() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle system
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    
    particles.position.x += (mouseX * 0.0001);
    particles.position.y += (-mouseY * 0.0001);
    
    renderer.render(scene, camera);
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursor || !cursorDot || !cursorRing) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        // Smooth dot movement
        dotX += (mouseX - dotX) * 0.1;
        dotY += (mouseY - dotY) * 0.1;
        
        // Smooth ring movement
        ringX += (mouseX - ringX) * 0.05;
        ringY += (mouseY - ringY) * 0.05;
        
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('.cta-button, .floating-card, .logo-mark');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorRing.style.transform += ' scale(1.5)';
            cursorRing.style.borderColor = 'rgba(0, 209, 178, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.5)', '');
            cursorRing.style.borderColor = 'rgba(0, 209, 178, 0.5)';
        });
    });
}

// GSAP Animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // Main content entrance
    tl.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    .to('.logo-mark', {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.8')
    .to('.brand-name', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.tagline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.cta-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2')
    .to('.stats-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2');
    
    // Animate stats numbers
    animateStats();
    
    // Floating cards animation
    gsap.to('.floating-card', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        stagger: 0.2,
        yoyo: true,
        repeat: -1
    });
}

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.textContent.includes('%') ? '%' : '';
        
        gsap.to(stat, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                stat.textContent = Math.ceil(stat.textContent) + suffix;
            }
        });
    });
}

// Particle system enhancement
function initParticleSystem() {
    const particleLayers = document.querySelectorAll('.particle-layer');
    
    particleLayers.forEach((layer, index) => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        
        gsap.to(layer, {
            y: -100,
            duration: 20 / speed,
            ease: 'none',
            repeat: -1
        });
    });
}

// Interactive button effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Create particle burst effect
            createButtonParticles(button);
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Click animation
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Show success message
            showSuccessMessage();
        });
    });
}

// Create button particle effects
function createButtonParticles(button) {
    const particleContainer = button.querySelector('.button-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00D1B2;
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particleContainer.appendChild(particle);
        
        gsap.fromTo(particle, 
            {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0
            },
            {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            }
        );
    }
}

// Success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00D1B2, #00B8A9);
        color: #0A0A0F;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        box-shadow: 0 8px 32px rgba(0, 209, 178, 0.3);
    `;
    message.textContent = '🚀 Action initiated successfully!';
    
    document.body.appendChild(message);
    
    gsap.to(message, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    setTimeout(() => {
        gsap.to(message, {
            x: '100%',
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => message.remove()
        });
    }, 3000);
}

// Parallax effect for floating elements
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Mouse tracking for WebGL
function initMouseTracking() {
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    });
}

// Window resize handling
function handleResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) {
                console.warn(`Low FPS detected: ${fps}`);
                // Reduce particle count or effects
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        requestAnimationFrame(checkPerformance);
    }
}

// Touch device detection and optimization
function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Disable custom cursor on touch devices
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.display = 'none';
        
        // Restore default cursor
        document.body.style.cursor = 'auto';
        
        // Optimize animations for touch
        gsap.set('.floating-card', {
            animation: 'none'
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Start with loading screen
    initLoadingScreen();
    
    // Initialize WebGL
    initWebGL();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize particle system
    initParticleSystem();
    
    // Initialize button effects
    initButtonEffects();
    
    // Initialize parallax
    initParallax();
    
    // Initialize mouse tracking
    initMouseTracking();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize touch optimizations
    initTouchOptimizations();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any modals or overlays
        }
    });
});

// Export for external use
window.StraviusTech = {
    initWebGL,
    initCustomCursor,
    initHeroAnimations,
    animateStats,
    createButtonParticles
}; 