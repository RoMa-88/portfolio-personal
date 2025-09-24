/**
 * Dice 3D Module - Física 3D con Three.js
 * Maneja la visualización 3D de dados con física realista
 */

class Dice3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.world = null;
        this.diceMeshes = [];
        this.isRolling = false;
        this.maxPhysicalDice = 3;
        
        this.initializeEventListeners();
        this.init3D();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        const throwBtn = document.getElementById('throwDice');
        const resetBtn = document.getElementById('resetDice');
        const closeModal = document.getElementById('closeStatsModal');

        if (throwBtn) {
            throwBtn.addEventListener('click', () => {
                this.throwDice3D();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetDice3D();
            });
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeStatsModal();
            });
        }

        // Cerrar modal al hacer clic fuera
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeStatsModal();
                }
            });
        }
    }

    /**
     * Espera a que Cannon.js esté disponible y luego inicializa
     */
    waitForCannonAndInit() {
        const checkCannon = () => {
            if (typeof CANNON !== 'undefined' && typeof CANNON.World !== 'undefined') {
                console.log('✅ Cannon.js está listo, inicializando sistema 3D...');
                this.init3D();
            } else {
                console.log('⏳ Esperando Cannon.js...');
                setTimeout(checkCannon, 100);
            }
        };
        checkCannon();
    }

    /**
     * Inicializa la escena 3D
     */
    init3D() {
        try {
            // Verificar que las librerías estén cargadas
            if (typeof THREE === 'undefined') {
                console.error('Three.js no está cargado');
                this.showFallbackMessage('Three.js no disponible');
                return;
            }

            if (typeof CANNON === 'undefined') {
                console.error('Cannon.js no está cargado');
                // No mostrar fallback inmediatamente, esperar a que se cargue
                console.log('⏳ Esperando a que Cannon.js se cargue...');
                return;
            }

            // Verificar que las funciones principales estén disponibles
            if (typeof THREE.Scene === 'undefined') {
                console.error('Three.js no está completamente cargado');
                this.showFallbackMessage('Three.js incompleto');
                return;
            }

            if (typeof CANNON.World === 'undefined') {
                console.error('Cannon.js no está completamente cargado');
                this.showFallbackMessage('Cannon.js incompleto');
                return;
            }

            // Si llegamos aquí, las librerías están disponibles
            console.log('✅ Todas las librerías están disponibles, iniciando sistema 3D...');

            const container = document.getElementById('dice3D');
            if (!container) {
                console.error('Container dice3D no encontrado');
                return;
            }

            const width = container.clientWidth || 400;
            const height = 300;

            // Escena
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x2a2a2a);

            // Cámara
            this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            this.camera.position.set(0, 8, 12);
            this.camera.lookAt(0, 0, 0);

            // Renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(width, height);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.setClearColor(0x2a2a2a);
            
            // Limpiar container y añadir canvas
            container.innerHTML = '';
            container.appendChild(this.renderer.domElement);

            // Iluminación
            this.setupLighting();

            // Mundo de física
            this.setupPhysics();

            // Suelo
            this.setupGround();

            console.log('Three.js inicializado correctamente');
            
            // Animar
            this.animate();
        } catch (error) {
            console.error('Error inicializando Three.js:', error);
            this.showFallbackMessage();
        }
    }

    /**
     * Configura la iluminación de la escena
     */
    setupLighting() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambientLight);

        // Luz direccional
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);
    }

    /**
     * Configura el mundo de física
     */
    setupPhysics() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        
        // Solo configurar si las propiedades existen (versión completa de Cannon.js)
        if (typeof CANNON.NaiveBroadphase !== 'undefined') {
            this.world.broadphase = new CANNON.NaiveBroadphase();
        }
        if (this.world.solver && typeof this.world.solver.iterations !== 'undefined') {
            this.world.solver.iterations = 10;
        }
        
        console.log('✅ Mundo de física configurado');
    }

    /**
     * Configura el suelo de la escena
     */
    setupGround() {
        // Suelo físico
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.world.add(groundBody);

        // Suelo visual
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b4513,
            transparent: true,
            opacity: 0.8
        });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.receiveShadow = true;
        this.scene.add(groundMesh);

        // Añadir bordes de la mesa para evitar que los dados se salgan
        this.setupTableBorders();
    }

    /**
     * Configura los bordes de la mesa
     */
    setupTableBorders() {
        const borderHeight = 2;
        const borderThickness = 0.5;
        const tableSize = 10; // Radio de la mesa

        // Bordes de la mesa (4 paredes)
        const borders = [
            // Pared frontal (Z positivo)
            { position: [0, borderHeight/2, tableSize], rotation: [0, 0, 0] },
            // Pared trasera (Z negativo)
            { position: [0, borderHeight/2, -tableSize], rotation: [0, Math.PI, 0] },
            // Pared izquierda (X negativo)
            { position: [-tableSize, borderHeight/2, 0], rotation: [0, Math.PI/2, 0] },
            // Pared derecha (X positivo)
            { position: [tableSize, borderHeight/2, 0], rotation: [0, -Math.PI/2, 0] }
        ];

        borders.forEach((border, index) => {
            // Física del borde
            const borderShape = new CANNON.Box(new CANNON.Vec3(borderThickness, borderHeight, tableSize));
            const borderBody = new CANNON.Body({ mass: 0 });
            borderBody.addShape(borderShape);
            borderBody.position.set(border.position[0], border.position[1], border.position[2]);
            borderBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), border.rotation[1]);
            this.world.add(borderBody);

            // Visual del borde
            const borderGeometry = new THREE.BoxGeometry(borderThickness * 2, borderHeight, tableSize * 2);
            const borderMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x654321,
                transparent: true,
                opacity: 0.9
            });
            const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
            borderMesh.position.set(border.position[0], border.position[1], border.position[2]);
            borderMesh.rotation.y = border.rotation[1];
            borderMesh.castShadow = true;
            this.scene.add(borderMesh);
        });

        console.log('✅ Bordes de mesa configurados');
    }

    /**
     * Crea un dado 3D con física
     * @param {number} sides - Número de caras
     * @param {number} x - Posición X
     * @param {number} z - Posición Z
     * @returns {Object} Objeto con mesh y body
     */
    createDice3D(sides, x = 0, z = 0) {
        let geometry, material, diceMesh, diceBody;

        switch(sides) {
            case 2: // Moneda
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xffd700 });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.Cylinder(0.5, 0.5, 0.1, 8));
                break;
            
            case 4: // d4
                geometry = new THREE.TetrahedronGeometry(1);
                material = new THREE.MeshLambertMaterial({ color: 0x8b0000 });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.ConvexPolyhedron(
                    new THREE.TetrahedronGeometry(1).attributes.position.array
                ));
                break;
            
            case 6: // d6
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)));
                break;
            
            case 10: // d10
                geometry = new THREE.ConeGeometry(0.8, 1.5, 5);
                material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.Cone(0.8, 1.5, 5));
                break;
            
            case 20: // d20
                geometry = new THREE.OctahedronGeometry(1);
                material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.ConvexPolyhedron(
                    new THREE.OctahedronGeometry(1).attributes.position.array
                ));
                break;
            
            case 100: // d100
                geometry = new THREE.SphereGeometry(0.8, 20, 20);
                material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
                diceMesh = new THREE.Mesh(geometry, material);
                diceBody = new CANNON.Body({ mass: 1 });
                diceBody.addShape(new CANNON.Sphere(0.8));
                break;
        }

        // Posición inicial
        diceBody.position.set(x, 6, z);
        diceMesh.position.set(x, 6, z);
        diceMesh.castShadow = true;

        // Añadir al mundo (verificar que existe)
        if (this.world) {
            this.world.add(diceBody);
        } else {
            console.error('❌ El mundo de física no está inicializado');
            return null;
        }
        
        if (this.scene) {
            this.scene.add(diceMesh);
        } else {
            console.error('❌ La escena 3D no está inicializada');
            return null;
        }
        this.diceMeshes.push({ 
            mesh: diceMesh, 
            body: diceBody, 
            sides: sides,
            stopped: false
        });

        return { mesh: diceMesh, body: diceBody };
    }

    /**
     * Lanza dados 3D
     */
    throwDice3D() {
        if (this.isRolling) return;
        
        this.isRolling = true;
        const quantity = parseInt(document.getElementById('diceQuantity').value) || 1;
        
        // Limpiar dados anteriores
        this.clearDice3D();
        
        if (quantity <= this.maxPhysicalDice) {
            // Crear dados físicos
            for (let i = 0; i < quantity; i++) {
                const x = (i - quantity/2) * 2;
                const z = Math.random() * 2 - 1;
                const dice = this.createDice3D(this.getCurrentSides(), x, z);
                
                // Aplicar fuerza aleatoria
                if (dice.body) {
                    const force = new CANNON.Vec3(
                        (Math.random() - 0.5) * 6, // Reducido de 10 a 6
                        Math.random() * 3 + 3,     // Reducido de 5+5 a 3+3
                        (Math.random() - 0.5) * 6  // Reducido de 10 a 6
                    );
                    dice.body.applyImpulse(force, dice.body.position);

                    // Aplicar rotación inicial
                    const angularForce = new CANNON.Vec3(
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 4
                    );
                    dice.body.angularVelocity.set(angularForce.x, angularForce.y, angularForce.z);
                    
                    // Aplicar torque aleatorio
                    const torque = new CANNON.Vec3(
                        Math.random() * 5,
                        Math.random() * 5,
                        Math.random() * 5
                    );
                    dice.body.angularVelocity = torque;
                }
            }

            // Simular tirada después de un tiempo
            setTimeout(() => {
                this.simulateDiceRoll();
            }, 3000);
        } else {
            // Para cantidades grandes, usar simulación
            this.simulateLargeRoll(quantity);
        }
    }

    /**
     * Obtiene el número de caras del dado actual
     * @returns {number} Número de caras
     */
    getCurrentSides() {
        if (window.diceCore) {
            return window.diceCore.currentSides;
        }
        return 6;
    }

    /**
     * Obtiene el tipo de dado actual
     * @returns {string} Tipo de dado
     */
    getCurrentType() {
        if (window.diceCore) {
            return window.diceCore.currentDiceType;
        }
        return 'd6';
    }

    /**
     * Simula la tirada de dados
     */
    simulateDiceRoll() {
        const results = [];
        
        this.diceMeshes.forEach(dice => {
            let result;
            if (dice.sides === 2) {
                result = Math.floor(Math.random() * 2);
            } else {
                result = Math.floor(Math.random() * dice.sides) + 1;
            }
            results.push(result);
        });

        // Mostrar resultados
        this.displayResults(results);
        
        // Guardar en historial
        if (window.diceCore) {
            const total = results.reduce((sum, result) => sum + result, 0);
            window.diceCore.saveRoll(results, total, results.length);
        }

        this.isRolling = false;
    }

    /**
     * Simula tirada grande sin física
     * @param {number} quantity - Cantidad de dados
     */
    simulateLargeRoll(quantity) {
        const sides = this.getCurrentSides();
        const type = this.getCurrentType();
        
        if (window.diceCore) {
            const simulation = window.diceCore.simulateLargeRoll(quantity, sides);
            this.showLargeRollModal(simulation);
        }
        
        this.isRolling = false;
    }

    /**
     * Muestra el modal para tiradas grandes
     * @param {Object} simulation - Resultados de la simulación
     */
    showLargeRollModal(simulation) {
        const modal = document.getElementById('statsModal');
        const statsContent = document.getElementById('statsContent');
        
        const { results, total, stats, quantity, sides, type } = simulation;
        const average = (total / quantity).toFixed(2);
        const min = Math.min(...results);
        const max = Math.max(...results);

        statsContent.innerHTML = `
            <div class="stats-summary">
                <h4>Tirada Simulada: ${quantity}${type}</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">Total:</span>
                        <span class="summary-value">${total}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Promedio:</span>
                        <span class="summary-value">${average}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Mínimo:</span>
                        <span class="summary-value">${min}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Máximo:</span>
                        <span class="summary-value">${max}</span>
                    </div>
                </div>
            </div>
            
            <div class="stats-distribution">
                <h4>Distribución de Valores</h4>
                <div class="distribution-chart">
                    ${Object.entries(stats).map(([value, count]) => `
                        <div class="distribution-bar">
                            <span class="bar-label">${value}</span>
                            <div class="bar-container">
                                <div class="bar-fill" style="width: ${(count / quantity) * 100}%"></div>
                            </div>
                            <span class="bar-count">${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="roll-results">
                <h4>Resultados Individuales</h4>
                <div class="results-list">
                    ${results.map((result, index) => `
                        <span class="result-item">${result}</span>
                    `).join('')}
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    /**
     * Muestra los resultados en la UI
     * @param {Array} results - Resultados de los dados
     */
    displayResults(results) {
        const diceDisplay = document.getElementById('diceDisplay');
        const resultSummary = document.getElementById('resultSummary');

        // Limpiar resultados anteriores
        diceDisplay.innerHTML = '';
        resultSummary.innerHTML = '';

        // Mostrar dados individuales
        results.forEach((result, index) => {
            const diceElement = document.createElement('div');
            diceElement.className = 'dice-result';
            diceElement.textContent = result;
            diceElement.style.animationDelay = `${index * 0.1}s`;
            diceDisplay.appendChild(diceElement);
        });

        // Mostrar resumen
        const total = results.reduce((sum, result) => sum + result, 0);
        const summaryElement = document.createElement('div');
        summaryElement.className = 'result-summary-content';
        summaryElement.innerHTML = `
            <div class="total-result">Total: ${total}</div>
            <div class="roll-details">
                ${results.length}${this.getCurrentType()}: [${results.join(', ')}]
            </div>
        `;
        resultSummary.appendChild(summaryElement);
    }

    /**
     * Limpia los dados 3D
     */
    clearDice3D() {
        if (this.diceMeshes && this.world && this.scene) {
            this.diceMeshes.forEach(dice => {
                if (dice.body) this.world.remove(dice.body);
                if (dice.mesh) this.scene.remove(dice.mesh);
            });
        }
        this.diceMeshes = [];
    }

    /**
     * Resetea los dados 3D
     */
    resetDice3D() {
        this.clearDice3D();
        this.isRolling = false;
        
        // Limpiar UI
        document.getElementById('diceDisplay').innerHTML = '';
        document.getElementById('resultSummary').innerHTML = '';
        document.getElementById('rollStats').innerHTML = '';
    }

    /**
     * Cierra el modal de estadísticas
     */
    closeStatsModal() {
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Muestra mensaje de fallback
     */
    showFallbackMessage(message = 'Vista 3D no disponible') {
        const container = document.getElementById('dice3D');
        if (container) {
            container.innerHTML = `
                <div style="
                    color: white; 
                    text-align: center; 
                    padding: 50px; 
                    background: rgba(0,0,0,0.5); 
                    border-radius: 10px;
                    border: 2px solid #8b4513;
                ">
                    <h3 style="color: #ffd700; margin-bottom: 15px;">⚠️ ${message}</h3>
                    <p style="margin-bottom: 10px;">Usa los dados normales para jugar</p>
                    <p style="font-size: 0.9em; opacity: 0.8; margin-bottom: 20px;">
                        Tu navegador no soporta WebGL o las librerías no se cargaron
                    </p>
                    <button onclick="if(window.diceCore) window.diceCore.rollDice()" style="
                        padding: 10px 20px;
                        background: #8b4513;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">
                        🎲 Lanzar Dados Normales
                    </button>
                </div>
            `;
        }
    }

    /**
     * Bucle de animación
     */
    animate() {
        if (this.renderer && this.scene && this.camera) {
            requestAnimationFrame(() => this.animate());
            
            // Actualizar física
            if (this.world) {
                this.world.step(1/60);
                
                // Sincronizar meshes con cuerpos físicos
                this.diceMeshes.forEach(dice => {
                    if (dice.mesh && dice.body) {
                        dice.mesh.position.copy(dice.body.position);
                        dice.mesh.quaternion.copy(dice.body.quaternion);
                    }
                });
            }
            
            // Renderizar
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Crear instancia global del Dice3D
window.dice3D = new Dice3D();
