document.addEventListener('DOMContentLoaded', () => {
    // Glitch effect on hover for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
            }, 100);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enter button effect
    const enterButton = document.querySelector('.cyber-button');
    enterButton.addEventListener('click', () => {
        document.body.style.animation = 'matrix-effect 0.5s';
        setTimeout(() => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
            document.body.style.animation = '';
        }, 500);
    });
});

// Add matrix rain effect
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.1';

const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ1234567890';
const drops = [];
const fontSize = 16;
const columns = width / fontSize;

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Entrance Portal Handler
class EntrancePortal {
    constructor() {
        this.terminal = document.querySelector('.terminal-text');
        this.portal = document.querySelector('.entrance-portal');
        this.messages = [
            "SCANNING VISITOR...",
            "VERIFYING IDENTITY...",
            "SECURITY CHECK COMPLETE",
            "> ACCESS GRANTED"
        ];
        this.messageIndex = 0;
        this.init();
    }

    init() {
        this.typeWriter();
    }

    typeWriter() {
        if (this.messageIndex >= this.messages.length) {
            this.completeLoading();
            return;
        }

        const message = this.messages[this.messageIndex];
        let i = 0;
        const typing = setInterval(() => {
            if (i < message.length) {
                this.terminal.innerHTML += message.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                this.terminal.innerHTML += '<br>';
                this.messageIndex++;
                setTimeout(() => this.typeWriter(), 400);
            }
        }, 30);
    }

    completeLoading() {
        setTimeout(() => {
            this.portal.style.opacity = '0';
            setTimeout(() => {
                this.portal.style.display = 'none';
            }, 500);
        }, 400);
    }
}

// AI Bartender Chat
class AIBartender {
    constructor() {
        this.chatMessages = document.querySelector('.chat-messages');
        this.input = document.querySelector('.chat-input input');
        this.sendBtn = document.querySelector('.send-btn');
        this.responses = {
            'hello': 'Welcome to NeoHaven. What's your poison?',
            'menu': 'Check out our DIGITAL ELIXIRS section above. The Neural Surge is particularly popular tonight.',
            'help': 'Need directions? The VIP Lounge is upstairs, Hackers' Den in the basement. Watch your step.',
            'default': 'Interesting... *continues cleaning glass with a cybernetic hand*'
        };
        this.init();
    }

    init() {
        this.sendBtn.addEventListener('click', () => this.handleMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleMessage();
        });
    }

    handleMessage() {
        const message = this.input.value.toLowerCase();
        if (!message) return;

        this.addMessage('user', message);
        this.input.value = '';

        setTimeout(() => {
            const response = this.responses[message] || this.responses.default;
            this.addMessage('bartender', response);
        }, 1000);
    }

    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    new EntrancePortal();
    new AIBartender();

    // Room interactions
    document.querySelectorAll('.room').forEach(room => {
        room.addEventListener('click', () => {
            const roomType = room.dataset.room;
            // Add your room-specific interactions here
            console.log(`Accessing ${roomType} room...`);
        });
    });
}); 