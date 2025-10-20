/**
 * Cyberpunk City Card Component - Enhanced Version
 * Tarjeta con efectos cyberpunk avanzados y contenido expandible
 */
class CyberpunkCityCard {
    constructor(cityData, container) {
        this.cityData = cityData;
        this.container = container;
        this.isFlipped = false;
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.createCard();
        this.addEventListeners();
        this.createGlobe();
        this.addCyberpunkStyles();
    }

    createCard() {
        // Crear contenedor principal de la tarjeta
        this.cardElement = document.createElement('div');
        this.cardElement.className = 'cyberpunk-city-card';
        this.cardElement.style.cssText = `
            width: 350px;
            height: 500px;
            position: relative;
            perspective: 1000px;
            cursor: pointer;
            margin: 20px;
            filter: drop-shadow(46px 36px 24px rgba(64, 144, 181, 0.3)) drop-shadow(-55px -40px 25px rgba(158, 48, 169, 0.3));
            animation: blinkShadowsFilter 8s ease-in infinite;
        `;

        // Crear contenedor del contenido (para el flip)
        this.contentElement = document.createElement('div');
        this.contentElement.className = 'cyberpunk-card-content';
        this.contentElement.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        // Crear cara frontal con botones glitch
        this.createFrontFace();

        // Crear cara trasera con efectos glitch
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
            opacity: 0.4;
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
            padding: 25px;
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
            font-size: 26px;
            font-weight: 700;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
            margin: 0 0 15px 0;
            letter-spacing: 3px;
            text-transform: uppercase;
        `;

        // Año de ficción
        const yearFiction = document.createElement('div');
        yearFiction.className = 'year-fiction';
        yearFiction.textContent = this.cityData.year_fiction;
        yearFiction.style.cssText = `
            color: #8a2be2;
            font-size: 16px;
            font-weight: 600;
            font-family: 'Orbitron', monospace;
            text-shadow: 0 0 8px rgba(138, 43, 226, 0.5);
            margin-bottom: 10px;
        `;

        // Ubicación
        const location = document.createElement('div');
        location.className = 'city-location';
        location.textContent = this.cityData.location;
        location.style.cssText = `
            color: #b0b0b0;
            font-size: 13px;
            margin-bottom: 20px;
            opacity: 0.8;
        `;

        // Botones glitch cyberpunk
        const glitchButtonsContainer = document.createElement('div');
        glitchButtonsContainer.className = 'glitch-buttons-container';
        glitchButtonsContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        `;

        // Botón 1: Ciudad
        const cityButton = this.createGlitchButton('CITY', 'c1', '#ff184c', '#fded00');
        // Botón 2: Año
        const yearButton = this.createGlitchButton(this.cityData.year_fiction, 'y1', '#6c3697', '#00e572');
        // Botón 3: Tipo
        const typeButton = this.createGlitchButton(this.cityData.source.type.split(' ')[0], 't1', '#006042', '#00e572');

        glitchButtonsContainer.appendChild(cityButton);
        glitchButtonsContainer.appendChild(yearButton);
        glitchButtonsContainer.appendChild(typeButton);

        // Instrucción para voltear
        const flipInstruction = document.createElement('div');
        flipInstruction.className = 'flip-instruction';
        flipInstruction.innerHTML = '👆 FLIP CARD';
        flipInstruction.style.cssText = `
            color: #ff0080;
            font-size: 14px;
            text-align: center;
            margin-top: auto;
            opacity: 0.7;
            animation: pulse-text 2s infinite;
            font-weight: 700;
            letter-spacing: 2px;
        `;

        // Ensamblar contenido frontal
        frontContent.appendChild(title);
        frontContent.appendChild(yearFiction);
        frontContent.appendChild(location);
        frontContent.appendChild(glitchButtonsContainer);
        frontContent.appendChild(flipInstruction);

        this.frontFace.appendChild(backgroundImage);
        this.frontFace.appendChild(overlay);
        this.frontFace.appendChild(frontContent);
    }

    createGlitchButton(text, id, primaryColor, shadowColor) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'radio-wrapper';
        buttonContainer.style.cssText = `
            position: relative;
            height: 45px;
            width: 120px;
            margin: 5px 0;
        `;

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = id;
        input.name = `btn-${this.cityData.id}`;
        input.className = 'input';
        input.style.cssText = `
            position: absolute;
            height: 100%;
            width: 100%;
            margin: 0;
            cursor: pointer;
            z-index: 10;
            opacity: 0;
        `;

        const button = document.createElement('div');
        button.className = 'btn';
        button.style.cssText = `
            --primary: ${primaryColor};
            --shadow-primary: ${shadowColor};
            --color: white;
            --font-size: 10px;
            --shadow-primary-hue: 180;
            --shadow-secondary-hue: 60;
            --shadow-secondary: hsl(var(--shadow-secondary-hue), 90%, 60%);
            --clip: polygon(11% 0, 95% 0, 100% 25%, 90% 90%, 95% 90%, 85% 90%, 85% 100%, 7% 100%, 0 80%);
            --border: 5px;
            --shimmy-distance: 5;
            color: var(--color);
            text-transform: uppercase;
            font-size: var(--font-size);
            letter-spacing: 2px;
            position: relative;
            font-weight: 900;
            width: 100%;
            height: 100%;
            line-height: 45px;
            text-align: center;
            transition: background 0.2s, 0.3s;
        `;

        button.innerHTML = `
            <span aria-hidden="">_</span>${text}
            <span aria-hidden="" class="btn__glitch">_${text}🦾</span>
            <label class="number">${id}</label>
        `;

        buttonContainer.appendChild(input);
        buttonContainer.appendChild(button);

        return buttonContainer;
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

        // Crear imagen de fondo para la cara trasera
        const backImage = document.createElement('div');
        backImage.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('${this.cityData.backImage}') center/cover;
            opacity: 0.3;
            filter: hue-rotate(45deg) saturate(1.8) contrast(1.3);
        `;

        // Crear contenedor del contenido trasero con efectos glitch
        const backContent = document.createElement('div');
        backContent.className = 'back-card-content';
        backContent.style.cssText = `
            display: grid;
            align-content: center;
            justify-items: center;
            align-items: center;
            text-align: center;
            padding: 1.5em;
            grid-template-rows: 0.15fr 0.6fr 0.25fr;
            background-color: hsl(296, 59%, 8%);
            width: 100%;
            height: 100%;
            -webkit-clip-path: polygon(0 0, 85% 0, 100% 14%, 100% 60%, 92% 65%, 93% 77%, 99% 80%, 99% 90%, 89% 100%, 0 100%);
            clip-path: polygon(0 0, 85% 0, 100% 14%, 100% 60%, 92% 65%, 93% 77%, 99% 80%, 99% 90%, 89% 100%, 0 100%);
            position: relative;
            z-index: 10;
        `;

        // Crear título del material origen
        const sourceTitle = document.createElement('div');
        sourceTitle.className = 'card-title';
        sourceTitle.style.cssText = `
            z-index: 80;
            -webkit-clip-path: polygon(90% 0, 100% 100%, 0% 100%, 0% 0%);
            clip-path: polygon(90% 0, 100% 100%, 0% 100%, 0% 0%);
            background: linear-gradient(90deg, rgba(255, 254, 250, 0) 0%, rgba(102, 224, 255, 0.3) 27%, rgba(102, 224, 255, 0.3) 63%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(102, 224, 255, 0.3) 0%, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0) 96%, rgba(102, 224, 255, 0.3) 100%);
            width: 98%;
            font-size: 1.2em;
        `;

        const titleText = document.createElement('span');
        titleText.className = 'title';
        titleText.textContent = this.cityData.source.firstAppearance.split('(')[0].trim();
        titleText.style.cssText = `
            width: 100%;
            height: 100%;
            text-align: right;
            position: relative;
            z-index: 2;
            color: hsl(192, 100%, 88%);
            font-size: 1em;
            transition: all ease-in-out 2s linear;
            font-family: 'Orbitron', monospace;
            font-weight: 700;
        `;

        // Crear cuerpo con información expandible
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.cssText = `
            padding-block: 1.5em;
            padding-inline: 1em;
            z-index: 80;
            display: flex;
            gap: 1.5em;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            align-content: center;
        `;

        // Crear botones de información
        this.createInfoButtons(cardBody);

        // Crear footer con información adicional
        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        cardFooter.style.cssText = `
            padding-inline: 1em;
        `;

        const footerText = document.createElement('span');
        footerText.className = 'title';
        footerText.textContent = this.cityData.source.type;
        footerText.style.cssText = `
            color: hsl(192, 100%, 88%);
            font-size: 0.9em;
            font-family: 'Orbitron', monospace;
        `;

        // Ensamblar contenido trasero
        sourceTitle.appendChild(titleText);
        cardFooter.appendChild(footerText);

        backContent.appendChild(sourceTitle);
        backContent.appendChild(cardBody);
        backContent.appendChild(cardFooter);

        this.backFace.appendChild(backImage);
        this.backFace.appendChild(backContent);
    }

    createInfoButtons(container) {
        const infoButtons = [
            { icon: '🎬', text: 'MEDIA', info: this.cityData.source.type },
            { icon: '📅', text: 'YEAR', info: this.cityData.created },
            { icon: '🏷️', text: 'TAGS', info: this.cityData.tags.slice(0, 2).join(', ') },
            { icon: '📍', text: 'LOC', info: this.cityData.location.split(',')[0] }
        ];

        infoButtons.forEach((btn, index) => {
            const button = document.createElement('div');
            button.className = 'svg-card';
            button.style.cssText = `
                text-decoration: none;
                color: hsl(192, 100%, 88%);
                background: linear-gradient(90deg, transparent 0%, rgba(102, 224, 255, 0.2) 27%, rgba(102, 224, 255, 0.2) 63%, transparent 100%);
                fill: currentColor;
                width: 2.5em;
                aspect-ratio: 1/1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: 0.5s;
                border-radius: 8px;
                cursor: pointer;
            `;

            const icon = document.createElement('div');
            icon.textContent = btn.icon;
            icon.style.cssText = `
                font-size: 1.2em;
                margin-bottom: 5px;
            `;

            const text = document.createElement('div');
            text.textContent = btn.text;
            text.style.cssText = `
                font-size: 0.7em;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            `;

            // Añadir evento para mostrar información expandida
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showExpandedInfo(btn.info, btn.text);
            });

            button.addEventListener('mouseenter', () => {
                button.style.color = 'hsl(192, 100%, 100%)';
                button.style.transform = 'scale(1.1)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.color = 'hsl(192, 100%, 88%)';
                button.style.transform = 'scale(1)';
            });

            button.appendChild(icon);
            button.appendChild(text);
            container.appendChild(button);
        });
    }

    showExpandedInfo(info, type) {
        // Crear modal de información expandida
        const modal = document.createElement('div');
        modal.className = 'expanded-info-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 15px;
            padding: 30px;
            z-index: 2000;
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            text-align: center;
        `;

        const title = document.createElement('h3');
        title.textContent = type;
        title.style.cssText = `
            color: #00d4ff;
            font-family: 'Orbitron', monospace;
            margin-bottom: 15px;
            font-size: 18px;
        `;

        const content = document.createElement('p');
        content.textContent = info;
        content.style.cssText = `
            color: #ffffff;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 20px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'CLOSE';
        closeBtn.style.cssText = `
            background: linear-gradient(135deg, #ff0080, #8a2be2);
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.appendChild(title);
        modal.appendChild(content);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    createGlobe() {
        // Crear contenedor para el globo en la esquina superior derecha
        const globeContainer = document.createElement('div');
        globeContainer.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
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

    addCyberpunkStyles() {
        if (!document.getElementById('cyberpunk-card-styles')) {
            const style = document.createElement('style');
            style.id = 'cyberpunk-card-styles';
            style.textContent = `
                @keyframes blinkShadowsFilter {
                    0% {
                        filter: drop-shadow(46px 36px 28px rgba(64, 144, 181, 0.34)) drop-shadow(-55px -40px 28px #9e30a9);
                    }
                    25% {
                        filter: drop-shadow(46px -36px 24px rgba(64, 144, 181, 0.9)) drop-shadow(-55px 40px 24px #9e30a9);
                    }
                    50% {
                        filter: drop-shadow(46px 36px 30px rgba(64, 144, 181, 0.9)) drop-shadow(-55px 40px 30px rgba(159, 48, 169, 0.29));
                    }
                    75% {
                        filter: drop-shadow(20px -18px 25px rgba(64, 144, 181, 0.9)) drop-shadow(-20px 20px 25px rgba(159, 48, 169, 0.29));
                    }
                    100% {
                        filter: drop-shadow(46px 36px 28px rgba(64, 144, 181, 0.34)) drop-shadow(-55px -40px 28px #9e30a9);
                    }
                }

                .btn:after, .btn:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    clip-path: var(--clip);
                    z-index: -1;
                }

                .btn:before {
                    background: var(--shadow-primary);
                    transform: translate(var(--border), 0);
                }

                .btn:after {
                    background: var(--primary);
                }

                .btn__glitch {
                    position: absolute;
                    top: calc(var(--border) * -1);
                    left: calc(var(--border) * -1);
                    right: calc(var(--border) * -1);
                    bottom: calc(var(--border) * -1);
                    background: var(--shadow-primary);
                    text-shadow: 2px 2px var(--shadow-primary), -2px -2px var(--shadow-secondary);
                    clip-path: var(--clip);
                    animation: glitch 2s infinite;
                    display: none;
                }

                .input:hover + .btn .btn__glitch {
                    display: block;
                }

                .input:checked + .btn .btn__glitch {
                    display: block;
                    animation: glitch 5s infinite;
                }

                .btn__glitch:before {
                    content: '';
                    position: absolute;
                    top: calc(var(--border) * 1);
                    right: calc(var(--border) * 1);
                    bottom: calc(var(--border) * 1);
                    left: calc(var(--border) * 1);
                    clip-path: var(--clip);
                    background: var(--primary);
                    z-index: -1;
                }

                .number {
                    background: var(--shadow-primary);
                    color: #323232;
                    font-size: 5.5px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    position: absolute;
                    width: 15px;
                    height: 6px;
                    top: 0;
                    left: 81%;
                    line-height: 6.2px;
                }

                @keyframes glitch {
                    0% { clip-path: polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%); }
                    2%, 8% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%); transform: translate(-5%, 0); }
                    6% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%); transform: translate(5%, 0); }
                    9% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%); transform: translate(0, 0); }
                    10% { clip-path: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%); transform: translate(5%, 0); }
                    13% { clip-path: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%); transform: translate(0, 0); }
                    14%, 21% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); transform: translate(5%, 0); }
                    25% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); transform: translate(5%, 0); }
                    30% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); transform: translate(-5%, 0); }
                    35%, 45% { clip-path: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%); transform: translate(-5%); }
                    40% { clip-path: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%); transform: translate(5%); }
                    50% { clip-path: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%); transform: translate(0, 0); }
                    55% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%); transform: translate(5%, 0); }
                    60% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%); transform: translate(0, 0); }
                    31%, 61%, 100% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); }
                }

                @keyframes backglitch {
                    0% { box-shadow: inset 0px 20px 30px 40px hsl(296, 59%, 10%); }
                    50% { box-shadow: inset 0px -20px 30px 40px hsl(296, 59%, 10.2%); }
                    100% { box-shadow: inset 0px 20px 30px 40px hsl(296, 59%, 10%); }
                }

                @keyframes rotate {
                    0% { transform: rotate(0deg) translate(-50%, 20%); }
                    50% { transform: rotate(180deg) translate(40%, 10%); }
                    100% { transform: rotate(360deg) translate(-50%, 20%); }
                }

                .back-card-content::before {
                    content: "";
                    position: absolute;
                    width: 250%;
                    aspect-ratio: 1/1;
                    transform-origin: center;
                    background: linear-gradient(to bottom, transparent, transparent, #66e0ff, #66e0ff, #e366ff, #e366ff, transparent, transparent), linear-gradient(to left, transparent, transparent, #66e0ff, #66e0ff, #e366ff, #e366ff, transparent, transparent);
                    animation: rotate 5s infinite linear;
                }

                .back-card-content::after {
                    content: "";
                    position: absolute;
                    top: 1%;
                    left: 1%;
                    width: 98%;
                    height: 98%;
                    background: repeating-linear-gradient(to bottom, transparent 0%, rgba(64, 144, 181, 0.6) 1px, rgb(0, 0, 0) 3px, rgba(64, 144, 181, 0.3) 5px, #153544 4px, transparent 0.5%), repeating-linear-gradient(to left, hsl(295, 60%, 12%) 100%, hsla(295, 60%, 12%, 0.99) 100%);
                    box-shadow: inset 0px 0px 30px 40px hsl(296, 59%, 10%);
                    -webkit-clip-path: polygon(0 0, 85% 0, 100% 14%, 100% 60%, 92% 65%, 93% 77%, 99% 80%, 99% 90%, 89% 100%, 0 100%);
                    clip-path: polygon(0 0, 85% 0, 100% 14%, 100% 60%, 92% 65%, 93% 77%, 99% 80%, 99% 90%, 89% 100%, 0 100%);
                    animation: backglitch 94ms linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
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
        const event = new CustomEvent('cyberpunkCityCardFlipped', {
            detail: {
                city: this.cityData,
                isFlipped: this.isFlipped
            }
        });
        this.cardElement.dispatchEvent(event);
    }

    reset() {
        this.isFlipped = false;
        this.contentElement.style.transform = 'rotateY(0deg)';
        this.cardElement.style.transform = 'scale(1)';
    }

    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        if (this.cardElement && this.cardElement.parentNode) {
            this.cardElement.parentNode.removeChild(this.cardElement);
        }
    }
}

// Función helper
function createCyberpunkCityCard(cityData, container) {
    return new CyberpunkCityCard(cityData, container);
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberpunkCityCard, createCyberpunkCityCard };
}









