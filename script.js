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
        document.querySelector(".countdown-wrapper").innerHTML = 
            "<h2 style='color:var(--neon-cyan); letter-spacing:5px;'>SYSTEM ONLINE</h2>";
    }
}, 1000);

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function downloadExtension(name) {
    const filename = `${name.replace(/\s+/g, '_')}.txt`;
    const filePath = `./extensions/${filename}`;

    console.log(`[SYSTEM] Attempting to fetch module: ${filename}`);

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            alert(`[SYSTEM] Module downloaded: ${filename}\nImport this text file into your Scratch List.`);
        })
        .catch(error => {
            console.error('Download failed:', error);
            alert(`[ERROR] Module file not found on server.\nMissing file: /extensions/${filename}`);
        });
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
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
            navLinks.style.zIndex = '999';
        }
    });
}
