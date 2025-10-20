/**
 * Cyberpunk Atlas - Main Application
 * Aplicación principal que integra todos los componentes
 */
class CyberpunkAtlas {
    constructor() {
        this.cities = [];
        this.cityCards = [];
        this.infoPanel = null;
        this.currentSelectedCity = null;
        this.init();
    }

    async init() {
        try {
            // Cargar datos de ciudades
            await this.loadCities();

            // Crear la interfaz
            this.createInterface();

            // Inicializar componentes
            this.initializeComponents();

            // Configurar eventos
            this.setupEventListeners();

            console.log('🚀 Cyberpunk Atlas inicializado correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar Cyberpunk Atlas:', error);
        }
    }

    async loadCities() {
        try {
            const response = await fetch('cities.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.cities = await response.json();
            console.log(`📍 Cargadas ${this.cities.length} ciudades`);
        } catch (error) {
            console.error('Error al cargar cities.json:', error);
            // Datos de fallback
            this.cities = [
                {
                    id: 1,
                    name: "Night City",
                    lat: 37.7749,
                    lng: -122.4194,
                    location: "Costa Oeste, California, EE.UU.",
                    created: "1988",
                    year_fiction: "2077",
                    source: {
                        type: "Videojuego / Rol",
                        firstAppearance: "Cyberpunk 2020 (juego de rol, 1988)",
                        otherAppearances: ["Cyberpunk 2077 (videojuego, 2020)"],
                        description: "Metrópolis corporativa donde la tecnología y la humanidad se fusionan."
                    },
                    tags: ["Corporaciones", "Implantes", "Violencia urbana"],
                    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
                    globePosition: { x: "65%", y: "35%" }
                }
            ];
        }
    }

    createInterface() {
        // Crear contenedor principal
        this.mainContainer = document.createElement('div');
        this.mainContainer.className = 'cyberpunk-atlas';
        this.mainContainer.style.cssText = `
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            position: relative;
            overflow-x: auto;
            font-family: 'Orbitron', 'Courier New', monospace;
        `;

        // Crear fondo con efectos
        this.createBackground();

        // Crear header
        this.createHeader();

        // Crear contenedor de tarjetas
        this.createCardsContainer();

        // Crear panel de información
        this.createInfoPanelContainer();

        // Añadir al body
        document.body.appendChild(this.mainContainer);
    }

    createBackground() {
        // Efecto de partículas
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Crear partículas
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00d4ff;
                border-radius: 50%;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s infinite linear;
                box-shadow: 0 0 10px #00d4ff;
            `;
            particlesContainer.appendChild(particle);
        }

        // Grid de fondo
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-background';
        gridContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;

        this.mainContainer.appendChild(particlesContainer);
        this.mainContainer.appendChild(gridContainer);
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'atlas-header';
        header.style.cssText = `
            text-align: center;
            padding: 40px 20px;
            position: relative;
            z-index: 10;
        `;

        const title = document.createElement('h1');
        title.className = 'atlas-title';
        title.textContent = 'CYBERPUNK ATLAS';
        title.style.cssText = `
            color: #00d4ff;
            font-size: 48px;
            font-weight: 900;
            text-shadow: 
                0 0 20px rgba(0, 212, 255, 0.8),
                0 0 40px rgba(0, 212, 255, 0.6),
                0 0 60px rgba(0, 212, 255, 0.4);
            margin: 0 0 10px 0;
            letter-spacing: 8px;
            animation: title-glow 3s ease-in-out infinite alternate;
        `;

        const subtitle = document.createElement('p');
        subtitle.className = 'atlas-subtitle';
        subtitle.textContent = 'Explora las ciudades futuristas de la ciencia ficción';
        subtitle.style.cssText = `
            color: #8a2be2;
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 2px;
            opacity: 0.8;
        `;

        header.appendChild(title);
        header.appendChild(subtitle);
        this.mainContainer.appendChild(header);
    }

    createCardsContainer() {
        this.cardsContainer = document.createElement('div');
        this.cardsContainer.className = 'cards-container';
        this.cardsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            padding: 20px;
            gap: 30px;
            position: relative;
            z-index: 10;
            max-width: 1400px;
            margin: 0 auto;
        `;

        this.mainContainer.appendChild(this.cardsContainer);
    }

    createInfoPanelContainer() {
        this.infoPanelContainer = document.createElement('div');
        this.infoPanelContainer.className = 'info-panel-container';
        this.infoPanelContainer.style.cssText = `
            position: relative;
            z-index: 1000;
        `;

        this.mainContainer.appendChild(this.infoPanelContainer);
    }

    initializeComponents() {
        // Crear tarjetas para cada ciudad usando el componente mejorado
        this.cities.forEach(cityData => {
            const cityCard = new CyberpunkCityCard(cityData, this.cardsContainer);
            this.cityCards.push(cityCard);
        });

        // Crear panel de información
        this.infoPanel = new InfoPanel(this.infoPanelContainer);
    }

    setupEventListeners() {
        // Escuchar eventos de las tarjetas
        document.addEventListener('cyberpunkCityCardFlipped', (e) => {
            this.handleCityCardFlipped(e.detail);
        });

        // Reseteo de tarjetas al hacer clic en otra
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.city-card') && !e.target.closest('.info-panel')) {
                this.resetAllCards();
            }
        });

        // Efectos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.resetAllCards();
                this.infoPanel.hide();
            }
        });
    }

    handleCityCardFlipped(detail) {
        if (detail.isFlipped) {
            // Resetear otras tarjetas
            this.cityCards.forEach(card => {
                if (card !== this.cityCards.find(c => c.cityData.id === detail.city.id)) {
                    card.reset();
                }
            });

            // Mostrar panel de información
            this.infoPanel.show(detail.city);
            this.currentSelectedCity = detail.city;
        } else {
            // Ocultar panel si se deselecciona la tarjeta
            if (this.currentSelectedCity && this.currentSelectedCity.id === detail.city.id) {
                this.infoPanel.hide();
                this.currentSelectedCity = null;
            }
        }
    }

    resetAllCards() {
        this.cityCards.forEach(card => {
            card.reset();
        });
        this.infoPanel.hide();
        this.currentSelectedCity = null;
    }

    // Método para añadir estilos CSS
    addStyles() {
        if (!document.getElementById('cyberpunk-atlas-styles')) {
            const style = document.createElement('style');
            style.id = 'cyberpunk-atlas-styles';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    100% { transform: translateY(0px) rotate(360deg); }
                }

                @keyframes title-glow {
                    0% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.8); }
                    100% { text-shadow: 0 0 30px rgba(0, 212, 255, 1), 0 0 40px rgba(138, 43, 226, 0.5); }
                }

                @keyframes pulse-text {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }

                .cyberpunk-atlas * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Método para destruir la aplicación
    destroy() {
        this.cityCards.forEach(card => card.destroy());
        if (this.infoPanel) this.infoPanel.destroy();
        if (this.mainContainer && this.mainContainer.parentNode) {
            this.mainContainer.parentNode.removeChild(this.mainContainer);
        }
    }
}

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    const atlas = new CyberpunkAtlas();
    atlas.addStyles();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberpunkAtlas;
}
