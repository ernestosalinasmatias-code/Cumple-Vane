// --- Generación de Flores Dinámicas ---

const mainContent = document.getElementById('mainContent');
const flowersBackground = mainContent.querySelector('.flowers-background');

// Tipos de flores y sus colores
const flowerTypes = [
    { type: '🌻', color: '#ffd700' }, // Girasol (Amarillo)
    { type: '🌹', color: '#ff3333' }, // Rosa (Roja)
    { type: '🌸', color: '#ffccf2' }, // Flor de cerezo (Rosa claro - opcional)
    { type: '🌷', color: '#ff99cc' }, // Tulipán (Rosa - opcional)
    { type: '💙', color: '#33a1ff' }, // Corazón azul (representando flor azul)
    { type: '💜', color: '#cc33ff' }, // Corazón morado (representando flor morada)
];

// Función para generar flores aleatorias
function generateFlowers() {
    for (let i = 0; i < 50; i++) { // Número de flores a generar
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Elige un tipo de flor aleatorio
        const randomFlower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.innerText = randomFlower.type;
        flower.style.color = randomFlower.color;

        // Posición aleatoria dentro del fondo
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 200 + '%'; // Cubre todo el alto duplicado
        flower.style.fontSize = Math.random() * (2.5 - 1) + 1 + 'em'; // Tamaño variado
        
        flowersBackground.appendChild(flower);
    }
}

// Llama a la función al cargar la página
generateFlowers();

// --- Duplicar contenido para el Loop Suave ---

// Clonar la sección de mensajes y añadirla al final de mainContent
const messageSection = mainContent.querySelector('.message-section');
const clonedMessages = messageSection.cloneNode(true);
mainContent.appendChild(clonedMessages);


// --- Sistema de Fuegos Artificiales (Interactividad) ---

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializar

// Clase para las partículas de los fuegos artificiales
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1; // Tamaño variable
        this.velocity = {
            x: Math.random() * 6 - 3, // Velocidad horizontal
            y: Math.random() * 6 - 3, // Velocidad vertical
        };
        this.life = 100; // Tiempo de vida de la partícula
        this.opacity = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += 0.05; // Gravedad suave
        this.life--;
        this.opacity -= 0.01; // Desvanecimiento
    }
}

let particles = [];

// Función para crear un estallido de fuegos artificiales
function createFirework(x, y) {
    const colors = ['#ff3333', '#33a1ff', '#cc33ff', '#ffd700', '#33ff33']; // Colores variados
    const particleCount = 50; // Número de partículas por estallido
    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}

// Animación de los fuegos artificiales
function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas en cada frame

    particles.forEach((particle, index) => {
        if (particle.life > 0 && particle.opacity > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(index, 1); // Eliminar partículas muertas
        }
    });
}

animateFireworks(); // Iniciar animación

// Manejar clics y toques
window.addEventListener('mousedown', (e) => {
    createFirework(e.clientX, e.clientY);
});

window.addEventListener('touchstart', (e) => {
    // Para dispositivos táctiles, usa el primer punto de contacto
    createFirework(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault(); // Evita comportamientos predeterminados del navegador
});
