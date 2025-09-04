// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// All fade-in effects removed for better visibility

// Contact Section - No form needed, just direct contact info

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation removed for better visibility

(function() {
    // Simple DRM System with QR Codes
    console.log('🚀 Starting DRM System...');
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDRM);
    } else {
        initializeDRM();
    }
    
    function initializeDRM() {
        console.log('📱 DOM loaded, initializing DRM...');
        
    // Load QR.js library from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
    script.onload = function() {
            console.log('✅ QRious library loaded successfully');
            // Wait a bit more to ensure images are loaded
            setTimeout(generateSimpleDRMOverlay, 1000);
    };
    script.onerror = function() {
            console.error('❌ Failed to load QR.js library');
    };
    document.head.appendChild(script);
    }
    
    function generateSimpleDRMOverlay() {
        console.log('🔍 Looking for protected images...');
        
        // Find all protected images with progressive difficulty
        const protectedImages = [
            { id: 'mpic1', difficulty: 'hard' },      // Barely visible (hardest to scan)
            { id: 'mpic2', difficulty: 'medium' },    // Kind of visible (medium difficulty)
            { id: 'mpic3', difficulty: 'easy' }       // Super visible and scannable (easiest)
        ];
        let protectedCount = 0;
        
        for (const imageConfig of protectedImages) {
            const targetImg = document.getElementById(imageConfig.id);
            console.log(`🔍 Looking for image: ${imageConfig.id} - Found: ${targetImg ? 'YES' : 'NO'}`);
            
            if (targetImg) {
                console.log(`✅ Found ${imageConfig.id}, applying ${imageConfig.difficulty} difficulty...`);
                // Protect this specific image with progressive difficulty
                protectSingleImage(targetImg, imageConfig.id, imageConfig.difficulty);
            protectedCount++;
            } else {
                console.log(`❌ Image ${imageConfig.id} not found in DOM`);
            }
        }
        
        console.log(`🛡️ Progressive Difficulty DRM Protection applied to ${protectedCount} images!`);
        console.log(`📊 Difficulty Levels: mpic1 (HARD - barely visible), mpic2 (MEDIUM - kind of visible), mpic3 (EASY - super visible)`);
        
        if (protectedCount === 0) {
            console.log('⚠️ No images were protected. Check if images have correct IDs: mpic1, mpic2, mpic3');
        }
    }
    
    function protectSingleImage(targetImg, imageId, difficulty) {
        console.log(`🛡️ Protecting ${imageId} with ${difficulty} difficulty...`);
        
        // Generate unique session ID for tracking
        const sessionId = 'MCL_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
        
        // Get user agent info
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        
        // Enhanced browser detection for QR URL
        function detectBrowserForQR() {
            const userAgent = navigator.userAgent;
            if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
                return "Safari";
            } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
                return "Google Chrome";
            } else if (userAgent.includes("Firefox")) {
                return "Mozilla Firefox";
            } else if (userAgent.includes("Edg")) {
                return "Microsoft Edge";
            } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
                return "Opera";
            } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
                return "Internet Explorer";
            } else {
                return "Unknown Browser";
            }
        }
        
        // Create dynamic QR code URL that leads to personalized page
        const baseUrl = window.location.origin;
        const detectedBrowser = detectBrowserForQR();
        const qrInfoUrl = `${baseUrl}/qr-info/?session=${sessionId}&image=${imageId}&platform=${encodeURIComponent(platform)}&browser=${encodeURIComponent(detectedBrowser)}&useragent=${encodeURIComponent(userAgent)}`;
        
        // QR code message - now a URL instead of text
        const qrMessage = qrInfoUrl;
        
        // Smaller QR codes for better scanning
        const isMobile = window.innerWidth <= 768;
        const qrSize = isMobile ? 100 : 150;
        
        const qr = new QRious({
            value: qrMessage,
            size: 130, // Doubled from 65px for much better scanning
            foreground: '#000000',
            background: '#ffffff',
            level: 'H' // High error correction for better scanning
        });
        
        console.log(`🔍 QR Code generated with size: 130px, actual canvas: ${qr.canvas.width}x${qr.canvas.height}`);
        
        // Create overlay container with progressive difficulty
        const overlay = document.createElement('div');
        const isMobileOverlay = window.innerWidth <= 768;
        
        // Progressive difficulty opacity levels
        let opacityLevel, backgroundAlpha;
        switch(difficulty) {
            case 'hard':
                opacityLevel = 0.05;       // First picture - 5% visible (hardest to scan)
                backgroundAlpha = 0.05;
                break;
            case 'medium':
                opacityLevel = 0.3;        // Second picture - 30% visible (medium difficulty)
                backgroundAlpha = 0.25;
                break;
            case 'easy':
                opacityLevel = 0.9;        // Third picture - 90% visible (easiest to scan)
                backgroundAlpha = 0.85;
                break;
            default:
                opacityLevel = 0.5;
                backgroundAlpha = 0.4;
        }
        
        overlay.style.cssText = `
            position: absolute;
            ${isMobileOverlay ? 'top: 50%; right: 50%; transform: translate(50%, -50%);' : 'top: 15px; right: 15px;'}
            opacity: ${opacityLevel} !important;
            z-index: 9999;
            pointer-events: none;
            border-radius: 8px;
            border: 2px solid #333;
            padding: ${isMobileOverlay ? '6px' : '8px'};
            background: rgba(255, 255, 255, ${backgroundAlpha}) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        `;
        
        // Debug: Log the actual computed styles
        console.log(`🔍 Setting opacity for ${imageId}: ${opacityLevel}`);
        console.log(`🔍 Setting background alpha for ${imageId}: ${backgroundAlpha}`);
        
        // Add QR code canvas to overlay
        qr.canvas.style.display = 'block';
        qr.canvas.style.borderRadius = '8px';
        qr.canvas.style.maxWidth = '100%';
        qr.canvas.style.height = 'auto';
        
        // Responsive sizing - doubled for much better scanning
        if (window.innerWidth < 768) {
            qr.canvas.style.width = '208px';  // Doubled from 104px
            qr.canvas.style.height = '208px';
            console.log(`📱 Mobile: Setting QR size to 208x208px for ${imageId}`);
        } else {
            qr.canvas.style.width = '312px';  // Doubled from 156px
            qr.canvas.style.height = '312px';
            console.log(`🖥️ Desktop: Setting QR size to 312x312px for ${imageId}`);
        }
        
        // Force canvas size with !important
        qr.canvas.style.setProperty('width', window.innerWidth < 768 ? '208px' : '312px', 'important');
        qr.canvas.style.setProperty('height', window.innerWidth < 768 ? '208px' : '312px', 'important');
        
        overlay.appendChild(qr.canvas);
        
        // Difficulty indicator removed for cleaner interface
        
        // Make sure the parent container is relatively positioned
        const parent = targetImg.parentElement;
        if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        
        // Add data attributes for resize listener
        parent.dataset.imageId = imageId;
        parent.dataset.difficulty = difficulty;
        
        // Add overlay to the image
        parent.appendChild(overlay);
        
        // Debug: Check if opacity was actually applied
        setTimeout(() => {
            const computedOpacity = window.getComputedStyle(overlay).opacity;
            const computedBackground = window.getComputedStyle(overlay).backgroundColor;
            console.log(`🔍 ${imageId} - Set opacity: ${opacityLevel}, Computed opacity: ${computedOpacity}`);
            console.log(`🔍 ${imageId} - Set background alpha: ${backgroundAlpha}, Computed background: ${computedBackground}`);
        }, 100);
        
        console.log(`🛡️ DRM Protection Deployed for ${imageId} with ${difficulty} difficulty!`);
        console.log(`🎯 ${imageId} opacity: ${opacityLevel}, background: ${backgroundAlpha}`);
    }
    
    // Add resize listener for responsive QR codes
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        const qrSize = isMobile ? 100 : 150;
        
        // Update existing QR codes if they exist
        document.querySelectorAll('.protected-image-container .overlay canvas').forEach(canvas => {
            if (canvas.width !== qrSize) {
                // Regenerate QR code with new size
                const container = canvas.closest('.protected-image-container');
                const imageId = container.dataset.imageId;
                const difficulty = container.dataset.difficulty;
                
                if (imageId && difficulty) {
                    const baseUrl = window.location.origin;
                    const newSessionId = 'MCL_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
                    
                    // Use the same enhanced browser detection
                    function detectBrowserForResize() {
                        const userAgent = navigator.userAgent;
                        if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
                            return "Safari";
                        } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
                            return "Google Chrome";
                        } else if (userAgent.includes("Firefox")) {
                            return "Mozilla Firefox";
                        } else if (userAgent.includes("Edg")) {
                            return "Microsoft Edge";
                        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
                            return "Opera";
                        } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
                            return "Internet Explorer";
                        } else {
                            return "Unknown Browser";
                        }
                    }
                    
                    const detectedBrowser = detectBrowserForResize();
                    const qrInfoUrl = `${baseUrl}/qr-info/?session=${newSessionId}&image=${imageId}&platform=${encodeURIComponent(navigator.platform)}&browser=${encodeURIComponent(detectedBrowser)}&useragent=${encodeURIComponent(navigator.userAgent)}`;
                    const qrMessage = qrInfoUrl;
                    
                    const newQr = new QRious({
                        value: qrMessage,
                        size: qrSize,
                        foreground: '#000000',
                        background: '#ffffff',
                        level: 'H'
                    });
                    
                    canvas.width = qrSize;
                    canvas.height = qrSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(newQr.image, 0, 0);
                    
                                            // Preserve the opacity based on difficulty
                        const overlay = container.querySelector('.overlay');
                        if (overlay) {
                            let opacityLevel, backgroundAlpha;
                            switch(difficulty) {
                                case 'hard':
                                    opacityLevel = 0.05;
                                    backgroundAlpha = 0.05;
                                    break;
                                case 'medium':
                                    opacityLevel = 0.3;
                                    backgroundAlpha = 0.25;
                                    break;
                                case 'easy':
                                    opacityLevel = 0.9;
                                    backgroundAlpha = 0.85;
                                    break;
                                default:
                                    opacityLevel = 0.5;
                                    backgroundAlpha = 0.4;
                            }
                            
                            overlay.style.opacity = opacityLevel + ' !important';
                            overlay.style.background = `rgba(255, 255, 255, ${backgroundAlpha}) !important`;
                            
                            // Update canvas size in resize listener
                            const canvas = overlay.querySelector('canvas');
                            if (canvas) {
                                if (isMobile) {
                                    canvas.style.width = '208px';
                                    canvas.style.height = '208px';
                                } else {
                                    canvas.style.width = '312px';
                                    canvas.style.height = '312px';
                                }
                            }
                            
                            console.log(`🔄 Resize: Preserved ${difficulty} difficulty for ${imageId} - opacity: ${opacityLevel}`);
                        }
                }
            }
        });
    });
    
    console.log('🚀 Loading Progressive Difficulty QR Code DRM Protection System...');
})();