/**
 * Info Panel Component
 * Panel de información dinámico que se actualiza según la ciudad seleccionada
 */
class InfoPanel {
    constructor(container) {
        this.container = container;
        this.currentCity = null;
        this.init();
    }

    init() {
        this.createPanel();
        this.addStyles();
        this.setupEventListeners();
    }

    createPanel() {
        // Crear contenedor principal del panel
        this.panelElement = document.createElement('div');
        this.panelElement.className = 'info-panel';
        this.panelElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 800px;
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
            border-radius: 20px;
            border: 2px solid rgba(0, 212, 255, 0.3);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(0, 212, 255, 0.2),
                inset 0 0 20px rgba(0, 212, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            opacity: 0;
            transform: translateX(-50%) translateY(100px);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1000;
        `;

        // Crear header del panel
        this.createHeader();

        // Crear contenido del panel
        this.createContent();

        // Crear footer del panel
        this.createFooter();

        this.container.appendChild(this.panelElement);
    }

    createHeader() {
        this.headerElement = document.createElement('div');
        this.headerElement.className = 'info-panel-header';
        this.headerElement.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 212, 255, 0.3);
        `;

        // Título principal
        this.titleElement = document.createElement('h2');
        this.titleElement.className = 'panel-title';
        this.titleElement.style.cssText = `
            color: #00d4ff;
            font-size: 28px;
            font-weight: 700;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
            margin: 0;
            letter-spacing: 2px;
        `;

        // Botón de cerrar
        this.closeButton = document.createElement('button');
        this.closeButton.className = 'close-button';
        this.closeButton.innerHTML = '✕';
        this.closeButton.style.cssText = `
            background: none;
            border: none;
            color: #ff0080;
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 50%;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        this.headerElement.appendChild(this.titleElement);
        this.headerElement.appendChild(this.closeButton);
        this.panelElement.appendChild(this.headerElement);
    }

    createContent() {
        this.contentElement = document.createElement('div');
        this.contentElement.className = 'info-panel-content';
        this.contentElement.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 20px;
        `;

        // Columna izquierda - Información básica
        this.createBasicInfo();

        // Columna derecha - Información detallada
        this.createDetailedInfo();

        this.panelElement.appendChild(this.contentElement);
    }

    createBasicInfo() {
        this.basicInfoElement = document.createElement('div');
        this.basicInfoElement.className = 'basic-info';
        this.basicInfoElement.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(138, 43, 226, 0.3);
        `;

        // Ubicación
        this.locationElement = document.createElement('div');
        this.locationElement.className = 'info-item';
        this.createInfoItem(this.locationElement, '📍 Ubicación', '');

        // Año de creación
        this.createdElement = document.createElement('div');
        this.createdElement.className = 'info-item';
        this.createInfoItem(this.createdElement, '📅 Creado en', '');

        // Año de ficción
        this.fictionYearElement = document.createElement('div');
        this.fictionYearElement.className = 'info-item';
        this.createInfoItem(this.fictionYearElement, '🚀 Año de ficción', '');

        // Tipo de material
        this.sourceTypeElement = document.createElement('div');
        this.sourceTypeElement.className = 'info-item';
        this.createInfoItem(this.sourceTypeElement, '🎬 Tipo de material', '');

        this.basicInfoElement.appendChild(this.locationElement);
        this.basicInfoElement.appendChild(this.createdElement);
        this.basicInfoElement.appendChild(this.fictionYearElement);
        this.basicInfoElement.appendChild(this.sourceTypeElement);
        this.contentElement.appendChild(this.basicInfoElement);
    }

    createDetailedInfo() {
        this.detailedInfoElement = document.createElement('div');
        this.detailedInfoElement.className = 'detailed-info';
        this.detailedInfoElement.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(255, 0, 128, 0.3);
        `;

        // Primera aparición
        this.firstAppearanceElement = document.createElement('div');
        this.firstAppearanceElement.className = 'info-item';
        this.createInfoItem(this.firstAppearanceElement, '🎭 Primera aparición', '');

        // Otras apariciones
        this.otherAppearancesElement = document.createElement('div');
        this.otherAppearancesElement.className = 'info-item';
        this.createInfoItem(this.otherAppearancesElement, '🎪 Otras apariciones', '');

        // Tags
        this.tagsElement = document.createElement('div');
        this.tagsElement.className = 'info-item';
        this.createInfoItem(this.tagsElement, '🏷️ Características', '');

        this.detailedInfoElement.appendChild(this.firstAppearanceElement);
        this.detailedInfoElement.appendChild(this.otherAppearancesElement);
        this.detailedInfoElement.appendChild(this.tagsElement);
        this.contentElement.appendChild(this.detailedInfoElement);
    }

    createInfoItem(container, label, value) {
        container.innerHTML = `
            <div class="info-label">${label}</div>
            <div class="info-value">${value}</div>
        `;
        container.style.cssText = `
            margin-bottom: 15px;
        `;

        // Estilos para el label
        const labelElement = container.querySelector('.info-label');
        labelElement.style.cssText = `
            color: #8a2be2;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        // Estilos para el value
        const valueElement = container.querySelector('.info-value');
        valueElement.style.cssText = `
            color: #ffffff;
            font-size: 14px;
            line-height: 1.4;
        `;
    }

    createFooter() {
        this.footerElement = document.createElement('div');
        this.footerElement.className = 'info-panel-footer';
        this.footerElement.style.cssText = `
            padding-top: 15px;
            border-top: 1px solid rgba(0, 212, 255, 0.3);
            text-align: center;
        `;

        // Descripción
        this.descriptionElement = document.createElement('div');
        this.descriptionElement.className = 'panel-description';
        this.descriptionElement.style.cssText = `
            color: #b0b0b0;
            font-size: 14px;
            line-height: 1.5;
            font-style: italic;
        `;

        this.footerElement.appendChild(this.descriptionElement);
        this.panelElement.appendChild(this.footerElement);
    }

    addStyles() {
        if (!document.getElementById('info-panel-styles')) {
            const style = document.createElement('style');
            style.id = 'info-panel-styles';
            style.textContent = `
                .close-button:hover {
                    background: rgba(255, 0, 128, 0.2);
                    transform: scale(1.1);
                }

                .info-panel.show {
                    opacity: 1 !important;
                    transform: translateX(-50%) translateY(0) !important;
                }

                .info-panel.hide {
                    opacity: 0 !important;
                    transform: translateX(-50%) translateY(100px) !important;
                }

                .tag-item {
                    display: inline-block;
                    background: rgba(0, 212, 255, 0.2);
                    color: #00d4ff;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    margin: 2px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupEventListeners() {
        // Botón de cerrar
        this.closeButton.addEventListener('click', () => {
            this.hide();
        });

        // Cerrar al hacer clic fuera del panel
        document.addEventListener('click', (e) => {
            if (!this.panelElement.contains(e.target) && this.isVisible()) {
                this.hide();
            }
        });

        // Escuchar eventos de las tarjetas
        document.addEventListener('cityCardFlipped', (e) => {
            if (e.detail.isFlipped) {
                this.show(e.detail.city);
            }
        });
    }

    show(cityData) {
        this.currentCity = cityData;
        this.updateContent();
        this.panelElement.classList.remove('hide');
        this.panelElement.classList.add('show');
    }

    hide() {
        this.panelElement.classList.remove('show');
        this.panelElement.classList.add('hide');
        setTimeout(() => {
            this.currentCity = null;
        }, 500);
    }

    isVisible() {
        return this.panelElement.classList.contains('show');
    }

    updateContent() {
        if (!this.currentCity) return;

        // Actualizar título
        this.titleElement.textContent = this.currentCity.name;

        // Actualizar información básica
        this.updateInfoItem(this.locationElement, '📍 Ubicación', this.currentCity.location);
        this.updateInfoItem(this.createdElement, '📅 Creado en', this.currentCity.created);
        this.updateInfoItem(this.fictionYearElement, '🚀 Año de ficción', this.currentCity.year_fiction);
        this.updateInfoItem(this.sourceTypeElement, '🎬 Tipo de material', this.currentCity.source.type);

        // Actualizar información detallada
        this.updateInfoItem(this.firstAppearanceElement, '🎭 Primera aparición', this.currentCity.source.firstAppearance);

        const otherAppearances = this.currentCity.source.otherAppearances.join('<br>• ');
        this.updateInfoItem(this.otherAppearancesElement, '🎪 Otras apariciones', `• ${otherAppearances}`);

        // Actualizar tags
        const tagsHtml = this.currentCity.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');
        this.updateInfoItem(this.tagsElement, '🏷️ Características', tagsHtml);

        // Actualizar descripción
        this.descriptionElement.textContent = this.currentCity.source.description;
    }

    updateInfoItem(container, label, value) {
        const labelElement = container.querySelector('.info-label');
        const valueElement = container.querySelector('.info-value');

        if (labelElement) labelElement.textContent = label;
        if (valueElement) valueElement.innerHTML = value;
    }

    // Método para destruir el panel
    destroy() {
        if (this.panelElement && this.panelElement.parentNode) {
            this.panelElement.parentNode.removeChild(this.panelElement);
        }
    }
}

// Función helper para crear el panel rápidamente
function createInfoPanel(container) {
    return new InfoPanel(container);
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InfoPanel, createInfoPanel };
}

