/**
 * Globe Mini Component
 * Globo holográfico en miniatura para las tarjetas de ciudades
 */
class GlobeMini {
    constructor(container, lat, lng, cityName) {
        this.container = container;
        this.lat = lat;
        this.lng = lng;
        this.cityName = cityName;
        this.size = 80;
        this.init();
    }

    init() {
        this.createGlobe();
        this.addGlowEffect();
        this.addPulseAnimation();
    }

    createGlobe() {
        // Crear contenedor del globo
        this.globeContainer = document.createElement('div');
        this.globeContainer.className = 'globe-mini-container';
        this.globeContainer.style.cssText = `
            position: relative;
            width: ${this.size}px;
            height: ${this.size}px;
            border-radius: 50%;
            overflow: hidden;
            background: radial-gradient(circle at 30% 30%, #00d4ff, #001122);
            box-shadow: 
                0 0 20px rgba(0, 212, 255, 0.5),
                inset 0 0 20px rgba(0, 212, 255, 0.2);
        `;

        // Crear imagen de la Tierra (usando una imagen de fondo)
        this.earthImage = document.createElement('div');
        this.earthImage.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=200&h=200&fit=crop&crop=center') center/cover;
            border-radius: 50%;
            opacity: 0.8;
            filter: hue-rotate(180deg) saturate(1.5) contrast(1.2);
        `;

        // Crear punto de ubicación
        this.locationDot = document.createElement('div');
        this.locationDot.className = 'location-dot';
        this.locationDot.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: #ff0080;
            border-radius: 50%;
            box-shadow: 
                0 0 10px #ff0080,
                0 0 20px #ff0080;
            z-index: 10;
            animation: pulse-dot 2s infinite;
        `;

        // Calcular posición del punto basado en lat/lng
        const x = ((this.lng + 180) / 360) * 100;
        const y = ((90 - this.lat) / 180) * 100;

        this.locationDot.style.left = `${x}%`;
        this.locationDot.style.top = `${y}%`;

        // Crear líneas de conexión
        this.createConnectionLines();

        // Ensamblar el globo
        this.globeContainer.appendChild(this.earthImage);
        this.globeContainer.appendChild(this.locationDot);
        this.container.appendChild(this.globeContainer);
    }

    createConnectionLines() {
        // Líneas de conexión desde el punto a los bordes
        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            line.style.cssText = `
                position: absolute;
                width: 2px;
                height: 20px;
                background: linear-gradient(to bottom, #ff0080, transparent);
                transform-origin: bottom center;
                transform: rotate(${i * 90}deg);
                top: 50%;
                left: 50%;
                margin-left: -1px;
                margin-top: -10px;
                opacity: 0.6;
                animation: pulse-line 3s infinite;
                animation-delay: ${i * 0.5}s;
            `;
            this.globeContainer.appendChild(line);
        }
    }

    addGlowEffect() {
        // Efecto de resplandor exterior
        const glowEffect = document.createElement('div');
        glowEffect.className = 'globe-glow';
        glowEffect.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border-radius: 50%;
            background: radial-gradient(circle, transparent 60%, rgba(0, 212, 255, 0.3) 70%, transparent 80%);
            pointer-events: none;
            z-index: -1;
        `;
        this.globeContainer.appendChild(glowEffect);
    }

    addPulseAnimation() {
        // Añadir estilos CSS para las animaciones
        if (!document.getElementById('globe-mini-styles')) {
            const style = document.createElement('style');
            style.id = 'globe-mini-styles';
            style.textContent = `
                @keyframes pulse-dot {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5);
                        opacity: 0.7;
                    }
                }

                @keyframes pulse-line {
                    0%, 100% {
                        opacity: 0.3;
                        transform: rotate(var(--rotation)) scaleY(0.5);
                    }
                    50% {
                        opacity: 0.8;
                        transform: rotate(var(--rotation)) scaleY(1);
                    }
                }

                .globe-mini-container:hover {
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }

                .globe-mini-container:hover .location-dot {
                    animation-duration: 1s;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Método para actualizar la posición del punto
    updateLocation(newLat, newLng) {
        this.lat = newLat;
        this.lng = newLng;

        const x = ((this.lng + 180) / 360) * 100;
        const y = ((90 - this.lat) / 180) * 100;

        this.locationDot.style.left = `${x}%`;
        this.locationDot.style.top = `${y}%`;
    }

    // Método para destruir el componente
    destroy() {
        if (this.globeContainer && this.globeContainer.parentNode) {
            this.globeContainer.parentNode.removeChild(this.globeContainer);
        }
    }
}

// Función helper para crear un globo rápidamente
function createGlobeMini(container, lat, lng, cityName = '') {
    return new GlobeMini(container, lat, lng, cityName);
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GlobeMini, createGlobeMini };
}

