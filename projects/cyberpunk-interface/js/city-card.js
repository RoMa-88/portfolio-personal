/**
 * City Card Component
 * Tarjeta con efecto flip 3D para mostrar ciudades futuristas
 */
class CityCard {
    constructor(cityData, container) {
        this.cityData = cityData;
        this.container = container;
        this.isFlipped = false;
        this.init();
    }

    init() {
        this.createCard();
        this.addEventListeners();
        this.createGlobe();
    }

    createCard() {
        // Crear contenedor principal de la tarjeta
        this.cardElement = document.createElement('div');
        this.cardElement.className = 'city-card';
        this.cardElement.style.cssText = `
            width: 300px;
            height: 400px;
            position: relative;
            perspective: 1000px;
            cursor: pointer;
            margin: 20px;
        `;

        // Crear contenedor del contenido (para el flip)
        this.contentElement = document.createElement('div');
        this.contentElement.className = 'card-content';
        this.contentElement.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        // Crear cara frontal
        this.createFrontFace();

        // Crear cara trasera
        this.createBackFace();

        // Ensamblar la tarjeta
        this.contentElement.appendChild(this.frontFace);
        this.contentElement.appendChild(this.backFace);
        this.cardElement.appendChild(this.contentElement);
        this.container.appendChild(this.cardElement);
    }

    createFrontFace() {
        this.frontFace = document.createElement('div');
        this.frontFace.className = 'card-face front-face';
        this.frontFace.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 15px;
            overflow: hidden;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(0, 212, 255, 0.3);
        `;

        // Crear imagen de fondo
        const backgroundImage = document.createElement('div');
        backgroundImage.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('${this.cityData.image}') center/cover;
            opacity: 0.3;
            filter: hue-rotate(180deg) saturate(2) contrast(1.5);
        `;

        // Crear overlay con gradiente
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                135deg,
                rgba(0, 212, 255, 0.1) 0%,
                rgba(138, 43, 226, 0.2) 50%,
                rgba(255, 0, 128, 0.1) 100%
            );
        `;

        // Crear contenido de la cara frontal
        const frontContent = document.createElement('div');
        frontContent.style.cssText = `
            position: relative;
            z-index: 10;
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `;

        // Título de la ciudad
        const title = document.createElement('h3');
        title.className = 'city-title';
        title.textContent = this.cityData.name;
        title.style.cssText = `
            color: #00d4ff;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            margin: 0 0 10px 0;
            letter-spacing: 2px;
        `;

        // Año de ficción
        const yearFiction = document.createElement('div');
        yearFiction.className = 'year-fiction';
        yearFiction.textContent = this.cityData.year_fiction;
        yearFiction.style.cssText = `
            color: #8a2be2;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
        `;

        // Ubicación
        const location = document.createElement('div');
        location.className = 'city-location';
        location.textContent = this.cityData.location;
        location.style.cssText = `
            color: #b0b0b0;
            font-size: 12px;
            margin-top: 5px;
            opacity: 0.8;
        `;

        // Tags
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags-container';
        tagsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 15px;
        `;

        this.cityData.tags.slice(0, 3).forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'city-tag';
            tagElement.textContent = tag;
            tagElement.style.cssText = `
                background: rgba(0, 212, 255, 0.2);
                color: #00d4ff;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 10px;
                border: 1px solid rgba(0, 212, 255, 0.3);
            `;
            tagsContainer.appendChild(tagElement);
        });

        // Instrucción para voltear
        const flipInstruction = document.createElement('div');
        flipInstruction.className = 'flip-instruction';
        flipInstruction.innerHTML = '👆 Click to flip';
        flipInstruction.style.cssText = `
            color: #ff0080;
            font-size: 12px;
            text-align: center;
            margin-top: auto;
            opacity: 0.7;
            animation: pulse-text 2s infinite;
        `;

        // Ensamblar contenido frontal
        frontContent.appendChild(title);
        frontContent.appendChild(yearFiction);
        frontContent.appendChild(location);
        frontContent.appendChild(tagsContainer);
        frontContent.appendChild(flipInstruction);

        this.frontFace.appendChild(backgroundImage);
        this.frontFace.appendChild(overlay);
        this.frontFace.appendChild(frontContent);
    }

    createBackFace() {
        this.backFace = document.createElement('div');
        this.backFace.className = 'card-face back-face';
        this.backFace.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            border-radius: 15px;
            overflow: hidden;
            background: linear-gradient(135deg, #2d1b69, #11998e);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(255, 0, 128, 0.3);
        `;

        // Crear contenido de la cara trasera
        const backContent = document.createElement('div');
        backContent.style.cssText = `
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `;

        // Título del material origen
        const sourceTitle = document.createElement('h3');
        sourceTitle.className = 'source-title';
        sourceTitle.textContent = this.cityData.source.firstAppearance.split('(')[0].trim();
        sourceTitle.style.cssText = `
            color: #ff0080;
            font-size: 18px;
            font-weight: 700;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
            margin: 0 0 10px 0;
            letter-spacing: 1px;
        `;

        // Tipo de material
        const sourceType = document.createElement('div');
        sourceType.className = 'source-type';
        sourceType.textContent = this.cityData.source.type;
        sourceType.style.cssText = `
            color: #00d4ff;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
        `;

        // Primera aparición
        const firstAppearance = document.createElement('div');
        firstAppearance.className = 'first-appearance';
        firstAppearance.innerHTML = `<strong>Primera aparición:</strong><br>${this.cityData.source.firstAppearance}`;
        firstAppearance.style.cssText = `
            color: #ffffff;
            font-size: 12px;
            line-height: 1.4;
            margin-bottom: 15px;
        `;

        // Otras apariciones
        const otherAppearances = document.createElement('div');
        otherAppearances.className = 'other-appearances';
        otherAppearances.innerHTML = `
            <strong>Otras apariciones:</strong><br>
            ${this.cityData.source.otherAppearances.slice(0, 2).join('<br>')}
        `;
        otherAppearances.style.cssText = `
            color: #b0b0b0;
            font-size: 11px;
            line-height: 1.4;
            margin-bottom: 15px;
        `;

        // Descripción
        const description = document.createElement('div');
        description.className = 'source-description';
        description.textContent = this.cityData.source.description;
        description.style.cssText = `
            color: #ffffff;
            font-size: 11px;
            line-height: 1.3;
            opacity: 0.9;
            flex-grow: 1;
        `;

        // Instrucción para volver
        const backInstruction = document.createElement('div');
        backInstruction.className = 'back-instruction';
        backInstruction.innerHTML = '👆 Click to return';
        backInstruction.style.cssText = `
            color: #8a2be2;
            font-size: 12px;
            text-align: center;
            margin-top: 15px;
            opacity: 0.7;
            animation: pulse-text 2s infinite;
        `;

        // Ensamblar contenido trasero
        backContent.appendChild(sourceTitle);
        backContent.appendChild(sourceType);
        backContent.appendChild(firstAppearance);
        backContent.appendChild(otherAppearances);
        backContent.appendChild(description);
        backContent.appendChild(backInstruction);

        this.backFace.appendChild(backContent);
    }

    createGlobe() {
        // Crear contenedor para el globo en la esquina superior derecha
        const globeContainer = document.createElement('div');
        globeContainer.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 20;
        `;

        // Crear el globo usando el componente GlobeMini
        if (typeof createGlobeMini === 'function') {
            this.globe = createGlobeMini(
                globeContainer,
                this.cityData.lat,
                this.cityData.lng,
                this.cityData.name
            );
        }

        this.frontFace.appendChild(globeContainer);
    }

    addEventListeners() {
        this.cardElement.addEventListener('click', () => {
            this.flipCard();
        });

        // Efectos hover
        this.cardElement.addEventListener('mouseenter', () => {
            this.cardElement.style.transform = 'scale(1.05)';
        });

        this.cardElement.addEventListener('mouseleave', () => {
            if (!this.isFlipped) {
                this.cardElement.style.transform = 'scale(1)';
            }
        });
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;

        if (this.isFlipped) {
            this.contentElement.style.transform = 'rotateY(180deg)';
            this.cardElement.style.transform = 'scale(1.02)';
        } else {
            this.contentElement.style.transform = 'rotateY(0deg)';
            this.cardElement.style.transform = 'scale(1)';
        }

        // Emitir evento personalizado
        const event = new CustomEvent('cityCardFlipped', {
            detail: {
                city: this.cityData,
                isFlipped: this.isFlipped
            }
        });
        this.cardElement.dispatchEvent(event);
    }

    // Método para resetear la tarjeta
    reset() {
        this.isFlipped = false;
        this.contentElement.style.transform = 'rotateY(0deg)';
        this.cardElement.style.transform = 'scale(1)';
    }

    // Método para destruir la tarjeta
    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        if (this.cardElement && this.cardElement.parentNode) {
            this.cardElement.parentNode.removeChild(this.cardElement);
        }
    }
}

// Función helper para crear una tarjeta rápidamente
function createCityCard(cityData, container) {
    return new CityCard(cityData, container);
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CityCard, createCityCard };
}

