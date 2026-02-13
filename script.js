// ===== HEARTS BACKGROUND ANIMATION =====
function createHeart(x, y, size) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${x}%`;
    heart.style.top = `${y}%`;
    heart.style.fontSize = `${size}px`;
    heart.innerHTML = '❤️';
    
    document.querySelector('.hearts-bg').appendChild(heart);
    
    // Random animation duration and delay
    const duration = 3 + Math.random() * 3;
    const delay = Math.random() * 2;
    
    heart.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Create multiple hearts on page load
window.addEventListener('load', () => {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 10 + Math.random() * 20;
            createHeart(x, y, size);
        }, i * 200);
    }
});

// Add floating animation to CSS via JS (fallback)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 1;
        }
    }
    .heart {
        position: absolute;
        animation-fill-mode: forwards;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// ===== NO BUTTON GROWING =====
let noCount = 0;
const maxNoCount = 10; // Stop growing after 10 clicks

function handleNoClick() {
    noCount++;
    
    // Array of teasing messages
    const messages = [
        "Are you sure? 🥺",
        "Really? Think again! 😢",
        "Don't be like that! 😭",
        "You're breaking my heart! 💔",
        "Last chance! 😉",
        "You're so mean! 😤",
        "I'll keep asking! 😠",
        "Fine, I'll make the YES bigger! 😏",
        "You can't escape! 😈",
        "Okay, this is getting ridiculous! 😂"
    ];
    
    // Show toast message
    const toast = document.getElementById('tease-toast');
    toast.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
    toast.style.opacity = '1';
    
    // Reset toast after animation
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2800);
    
    // Make YES button bigger (but cap it)
    if (noCount <= maxNoCount) {
        const yesBtn = document.getElementById('yes-btn');
        const newSize = 1 + (noCount * 0.15); // Grow by 15% each click
        yesBtn.style.transform = `scale(${newSize})`;
    }
    
    // Change GIF after certain clicks
    if (noCount === 3) {
        document.getElementById('cat-gif').src = 'https://media.tenor.com/JRnmVEv3kYAAAAAC/sad-crying.gif';
    } else if (noCount === 6) {
        document.getElementById('cat-gif').src = 'https://media.tenor.com/9wW0-YfL7DcAAAAAC/crying-sad.gif';
    } else if (noCount === 9) {
        document.getElementById('cat-gif').src = 'https://media.tenor.com/7Hx_bvEUhDwAAAAAC/angry-mad.gif';
    }
}

// ===== YES BUTTON CLICK =====
function handleYesClick() {
    // REDIRECT to yes.html (this is the critical change!)
    window.location.href = 'yes.html';
}

// ===== MUSIC TOGGLE =====
let isMusicPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    
    if (isMusicPlaying) {
        audio.pause();
        toggleBtn.textContent = '🔇';
        isMusicPlaying = false;
    } else {
        audio.muted = false;
        audio.play().then(() => {
            toggleBtn.textContent = '🔊';
            isMusicPlaying = true;
        }).catch(e => {
            console.log("Audio autoplay prevented:", e);
            alert("Music autoplay was blocked by your browser. Please click 'Yes' or 'No' first, then try the music button again!");
        });
    }
}

// ===== AUTOPLAY WORKAROUND =====
// Browsers block autoplay with sound, so we wait for any user interaction
document.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (!isMusicPlaying) {
        audio.muted = true; // Keep it muted initially
    }
}, { once: true });

// ===== PREVENT ACCIDENTAL NAVIGATION =====
window.addEventListener('beforeunload', (e) => {
    if (noCount > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});
