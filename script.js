// 1. Release Countdown
// Set date to June 30, 2026
const releaseDate = new Date("June 30, 2026 00:00:00").getTime();

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = formatTime(days);
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);

    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector(".countdown-wrapper").innerHTML = "<h2 style='color:var(--neon-cyan); letter-spacing:5px;'>SYSTEM ONLINE</h2>";
    }
}, 1000);

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// 2. Extension Downloader (Simulation)
function downloadExtension(name) {
    const filename = `${name.replace(/\s+/g, '_')}_Module.pzm`;
    
    // Fake syntax for the file
    const fileContent = `
/* PRISM MODULE: ${name} */
/* TARGET: SCRATCH VM 3.0 */

import core.memory;

module ${name.replace(/\s+/g, '')} {
    
    @Override
    init(sys_args) {
        Console.print("Initializing ${name}...");
        Memory.alloc(0x24F);
        return true;
    }

    // Logic implementation
    void update() {
        // High frequency loop
    }
}
    `;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    alert(`[SYSTEM] downloading package: ${filename}`);
}

// 3. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle flex/none
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(2, 2, 5, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--neon-cyan)';
    }
});
