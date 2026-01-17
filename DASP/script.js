// Function to show/hide sections
function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => seccion.classList.remove('visible'));
    document.getElementById(seccionId).classList.add('visible');
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to get bot response based on SMR themes (montaje, redes, SOM)
function getBotResponse(mensajeTexto) {
    const msg = mensajeTexto.toLowerCase();

    // Quick question responses
    if (msg.includes('¿qué es una ip?') || msg.includes('ip')) {
        return 'Una IP (Internet Protocol) es una dirección única que identifica a un dispositivo en una red. En redes, hay IPs públicas (para internet) y privadas (para redes locales). Por ejemplo, 192.168.1.1 es una IP privada común en routers.';
    }
    if (msg.includes('¿qué es la ram?') || msg.includes('ram')) {
        return 'La RAM (Random Access Memory) es la memoria temporal del PC donde se almacenan datos activos para que el procesador los use rápidamente. Más RAM mejora el rendimiento multitarea, pero no guarda datos permanentemente (eso lo hace el disco duro o SSD).';
    }
    if (msg.includes('¿cómo montar un pc?') || msg.includes('montaje') || msg.includes('montar pc')) {
        return 'Para montar un PC: 1) Instala la placa base en la caja. 2) Conecta CPU, RAM y disipador. 3) Agrega disco duro/SSD, tarjeta gráfica y fuentes de alimentación. 4) Conecta cables (USB, SATA). 5) Enciende y configura BIOS. ¡Usa guantes antiestáticos y sigue manuales!';
    }
    if (msg.includes('¿qué es un sistema operativo?') || msg.includes('sistema operativo') || msg.includes('som')) {
        return 'Un sistema operativo (SO) es el software que gestiona el hardware y software de un PC, como Windows, Linux o macOS. Controla procesos, memoria y dispositivos. En SMR, aprendemos a instalar y configurar SOs para redes y servidores.';
    }
    if (msg.includes('no tengo internet') || msg.includes('internet')) {
        return 'Si no tienes internet: 1) Verifica cables y conexiones WiFi. 2) Reinicia el router/módem. 3) Comprueba configuración de red en el SO (IP automática). 4) Usa comandos como "ipconfig" en Windows o "ifconfig" en Linux. Si persiste, contacta a tu ISP.';
    }

    // Additional keyword-based responses for SMR themes
    if (msg.includes('redes') || msg.includes('network')) {
        return 'En redes (SMR), estudiamos protocolos como TCP/IP, configuración de routers y switches, y resolución de problemas de conectividad. ¿Quieres saber sobre subredes o firewalls?';
    }
    if (msg.includes('cpu') || msg.includes('procesador')) {
        return 'El CPU (procesador) es el "cerebro" del PC, ejecuta instrucciones. En montaje, asegúrate de que sea compatible con la placa base (socket correcto) y usa pasta térmica para el disipador.';
    }
    if (msg.includes('windows') || msg.includes('linux')) {
        return 'Windows y Linux son SOs comunes en SMR. Windows es gráfico y fácil, Linux es open-source y potente para servidores. Practica comandos en terminal para gestión de archivos y redes.';
    }
    if (msg.includes('troubleshooting') || msg.includes('problema')) {
        return 'Para troubleshooting en SMR: Identifica síntomas (e.g., PC no enciende → fuente de alimentación). Usa herramientas como ping para redes o Event Viewer en Windows. ¡Documenta pasos!';
    }

    // Fallback for unmatched messages
    return 'Lo siento, no entiendo esa pregunta. Soy un chatbot especializado en SMR: temas como montaje de PC, redes e instalación de sistemas operativos. Prueba con preguntas como "¿Qué es una IP?" o "¿Cómo montar un PC?".';
}

// Function to send message (used for input and quick questions)
async function enviarMensaje(mensaje = null) {
    const userInput = document.getElementById('userInput');
    const mensajeTexto = mensaje || userInput.value.trim();
    if (!mensajeTexto) return;

    if (!mensaje) userInput.value = '';

    const chatMessages = document.getElementById('chat-messages');

    // Append user message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'msg-user';
    userMsgDiv.textContent = mensajeTexto;
    chatMessages.appendChild(userMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'msg-bot';
    loadingDiv.textContent = 'Pensando...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate async delay for UX (local response is instant, but add a short delay)
    setTimeout(() => {
        const botResponse = getBotResponse(mensajeTexto);

        // Remove loading and append bot response
        chatMessages.removeChild(loadingDiv);
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'msg-bot';
        botMsgDiv.textContent = botResponse;
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500); // 0.5 second delay
}

// Initialize by showing the 'inicio' section on load
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('inicio');
});
