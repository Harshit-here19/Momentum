// js/background.js

import { save, load } from './storage.js';

const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
];

const minimalColors = [
    '#1a1a2e',
    '#16213e',
    '#222831'
];

let backgroundData = [];

export async function loadBackgrounds() {
    try {
        const response = await fetch('./assets/backgrounds/backgrounds.json');
        const data = await response.json();
        backgroundData = data.backgrounds || [];
        
        // Preload images safely AFTER backgroundData is populated
        backgroundData.forEach(bg => {
            const img = new Image();
            img.src = `./assets/${bg.filename}`;
        });
    } catch (err) {
        console.error('Failed to load backgrounds.json', err);
    }
}

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function setBackground(state) {
    const theme = state.bgTheme;

    // Gradient mode
    if (theme === 'gradient') {
        const gradient = gradients[Math.floor(Math.random() * gradients.length)];
        document.body.style.backgroundImage = 'none';
        document.body.style.background = gradient;
        return;
    }

    // Minimal mode
    if (theme === 'minimal') {
        const color = minimalColors[Math.floor(Math.random() * minimalColors.length)];
        document.body.style.backgroundImage = 'none';
        document.body.style.background = color;
        return;
    }

    // Local image backgrounds
    if (!backgroundData.length) return;

    const today = new Date().toDateString();
    let lastDate = load('momentum_bgDate', '');
    
    // Track our current step in the order pool, and the tracking pool itself
    let currentStep = load('momentum_bgStep', null);
    let orderPool = load('momentum_bgOrderPool', null);

    // DAY CHANGE CONDITION or FIRST INITIALIZATION
    if (lastDate !== today || currentStep === null || orderPool === null) {
        
        // If order pool doesn't exist, or we have exhausted all images, regenerate/reshuffle it
        if (!orderPool || orderPool.length === 0 || currentStep >= backgroundData.length) {
            // Create an array of indices [0, 1, 2, ... up to data length]
            const indices = Array.from({ length: backgroundData.length }, (_, i) => i);
            orderPool = shuffleArray(indices);
            currentStep = 0; // Reset back to the beginning of the list
        } else if (lastDate !== today) {
            // It's a new day, increment to the next image in our unique pool
            currentStep++;
            
            // Safety Check: If a user was away and the pool maxed out during their absence
            if (currentStep >= backgroundData.length) {
                const indices = Array.from({ length: backgroundData.length }, (_, i) => i);
                orderPool = shuffleArray(indices);
                currentStep = 0;
            }
        }

        // Save our state values for tomorrow
        save('momentum_bgStep', currentStep);
        save('momentum_bgOrderPool', orderPool);
        save('momentum_bgDate', today);
    }

    // Get the actual clean background index mapped out from our tracking pool
    const bgIndex = orderPool[currentStep];
    const bg = backgroundData[bgIndex];

    // Fallback protection just in case JSON changes layout sizes dynamically
    if (!bg) return;

    // prepend ./assets/
    const imagePath = `./assets/${bg.filename}`;

    document.body.style.backgroundImage = `url('${imagePath}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Apply widget theme colors automatically
    if (bg.widgetColor) {
        document.documentElement.style.setProperty('--widget-bg', bg.widgetColor.hsla);
        document.documentElement.style.setProperty('--widget-text', bg.widgetColor.bodyTextColor);
    }

    // Optional credits
    const credit = document.getElementById('photoCredit');
    if (credit) {
        credit.innerHTML = `
            📷 ${bg.title} — 
            <a href="${bg.sourceUrl}" target="_blank">
                ${bg.source}
            </a>
        `;
    }
}