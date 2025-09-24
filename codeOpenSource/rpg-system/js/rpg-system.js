/**
 * RPG System - Sistema Principal
 * Coordina todos los módulos del sistema RPG
 */

class RPGSystem {
    constructor() {
        this.isInitialized = false;
        this.modules = {
            storage: null,
            diceCore: null,
            dice3D: null,
            players: null
        };
        
        this.initialize();
    }

    /**
     * Inicializa el sistema RPG
     */
    initialize() {
        console.log('🎲 Inicializando Sistema RPG...');
        
        // Esperar a que las librerías se carguen antes de inicializar
        setTimeout(() => {
            // Verificar que todos los módulos estén disponibles
            if (this.checkModules()) {
                this.setupModules();
                this.setupEventListeners();
                this.loadInitialData();
                this.isInitialized = true;
                console.log('✅ Sistema RPG inicializado correctamente');
                
                // Esperar un poco más para que Cannon.js esté listo
                setTimeout(() => {
                    if (this.dice3DManager && typeof CANNON !== 'undefined') {
                        console.log('🎯 Reinicializando sistema 3D con Cannon.js...');
                        this.dice3DManager.init3D();
                    }
                }, 1000);
            } else {
                console.error('❌ Error: No se pudieron cargar todos los módulos');
                this.showErrorMessage();
            }
        }, 1500);
    }

    /**
     * Verifica que todos los módulos estén disponibles
     * @returns {boolean} True si todos los módulos están disponibles
     */
    checkModules() {
        const requiredModules = ['storageManager', 'diceCore', 'dice3D', 'playersManager'];
        
        for (const module of requiredModules) {
            if (!window[module]) {
                console.error(`Módulo faltante: ${module}`);
                return false;
            }
        }
        
        return true;
    }

    /**
     * Configura las referencias a los módulos
     */
    setupModules() {
        this.modules.storage = window.storageManager;
        this.modules.diceCore = window.diceCore;
        this.modules.dice3D = window.dice3D;
        this.modules.players = window.playersManager;
    }

    /**
     * Configura los event listeners globales
     */
    setupEventListeners() {
        // Event listeners para teclas rápidas
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Event listeners para el modal de estadísticas
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.modules.dice3D.closeStatsModal();
                }
            });
        }

        // Event listeners para el formulario de jugador
        const playerForm = document.getElementById('playerForm');
        if (playerForm) {
            playerForm.addEventListener('click', (e) => {
                if (e.target === playerForm) {
                    this.modules.players.hidePlayerForm();
                }
            });
        }

        // Event listeners para el teclado en el formulario
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modules.players.hidePlayerForm();
                this.modules.dice3D.closeStatsModal();
            }
        });
    }

    /**
     * Maneja las teclas rápidas
     * @param {KeyboardEvent} e - Evento de teclado
     */
    handleKeyboardShortcuts(e) {
        // Solo si no hay campos de entrada activos
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
            return;
        }

        switch(e.key) {
            case 'r':
            case 'R':
                // Lanzar dados
                e.preventDefault();
                this.modules.diceCore.rollDice();
                break;
            case 'n':
            case 'N':
                // Nuevo jugador
                e.preventDefault();
                this.modules.players.showPlayerForm();
                break;
            case 't':
            case 'T':
                // Lanzar dados 3D
                e.preventDefault();
                this.modules.dice3D.throwDice3D();
                break;
            case 's':
            case 'S':
                // Mostrar estadísticas
                e.preventDefault();
                this.showSystemStats();
                break;
        }
    }

    /**
     * Carga los datos iniciales
     */
    loadInitialData() {
        // Los módulos ya se encargan de cargar sus propios datos
        // Aquí podríamos cargar configuraciones globales adicionales
        console.log('📊 Datos iniciales cargados');
    }

    /**
     * Muestra estadísticas del sistema
     */
    showSystemStats() {
        const playerStats = this.modules.players.getPlayerStats();
        const storageStats = this.modules.storage.getStats();
        
        const statsMessage = `
📊 ESTADÍSTICAS DEL SISTEMA

👥 JUGADORES:
• Total: ${playerStats.total}
• Vivos: ${playerStats.alive}
• Eliminados: ${playerStats.eliminated}
• HP Bajo: ${playerStats.lowHP}
• HP Promedio: ${playerStats.averageHP}

🎲 DADOS:
• Tiradas Totales: ${storageStats.totalRolls}
• Dado Más Usado: ${storageStats.mostUsedDice}
• Daño Total: ${storageStats.totalDamage}

💾 ALMACENAMIENTO:
• Última Guardada: ${new Date(storageStats.lastSaved).toLocaleString()}
        `;
        
        alert(statsMessage);
    }

    /**
     * Muestra mensaje de error
     */
    showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        errorDiv.innerHTML = `
            <h1 style="color: #ff4444; margin-bottom: 20px;">❌ Error del Sistema</h1>
            <p style="text-align: center; max-width: 600px; line-height: 1.6;">
                No se pudieron cargar todos los módulos del sistema RPG.<br>
                Por favor, recarga la página e inténtalo de nuevo.<br>
                Si el problema persiste, verifica que tu navegador soporte JavaScript moderno.
            </p>
            <button onclick="location.reload()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">🔄 Recargar Página</button>
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Obtiene el estado del sistema
     * @returns {Object} Estado del sistema
     */
    getSystemState() {
        return {
            isInitialized: this.isInitialized,
            modules: Object.keys(this.modules).reduce((acc, key) => {
                acc[key] = this.modules[key] ? 'loaded' : 'missing';
                return acc;
            }, {}),
            playerCount: this.modules.players ? this.modules.players.getPlayerCount() : 0,
            diceHistoryLength: this.modules.diceCore ? this.modules.diceCore.getHistory().length : 0
        };
    }

    /**
     * Exporta todos los datos del sistema
     * @returns {string} Datos en formato JSON
     */
    exportAllData() {
        if (!this.isInitialized) {
            throw new Error('Sistema no inicializado');
        }
        
        const data = {
            players: this.modules.players.getAllPlayers(),
            diceHistory: this.modules.diceCore.getHistory(),
            settings: this.modules.storage.getSettings(),
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        return JSON.stringify(data, null, 2);
    }

    /**
     * Importa datos al sistema
     * @param {string} jsonData - Datos en formato JSON
     * @returns {boolean} True si la importación fue exitosa
     */
    importAllData(jsonData) {
        if (!this.isInitialized) {
            console.error('Sistema no inicializado');
            return false;
        }
        
        try {
            const data = JSON.parse(jsonData);
            
            // Importar jugadores
            if (data.players && Array.isArray(data.players)) {
                this.modules.players.importPlayers(JSON.stringify(data.players));
            }
            
            // Importar configuración
            if (data.settings) {
                this.modules.storage.saveSettings(data.settings);
            }
            
            // Nota: El historial de dados no se importa para evitar duplicados
            
            console.log('✅ Datos importados correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error importando datos:', error);
            return false;
        }
    }

    /**
     * Resetea todo el sistema
     */
    resetSystem() {
        if (confirm('¿Estás seguro de que quieres resetear todo el sistema? Se perderán todos los datos.')) {
            this.modules.storage.reset();
            this.modules.diceCore.clearHistory();
            this.modules.players.players = [];
            this.modules.players.addDemoPlayer();
            this.modules.players.renderPlayers();
            
            console.log('🔄 Sistema reseteado');
        }
    }

    /**
     * Obtiene información de la versión
     * @returns {Object} Información de versión
     */
    getVersionInfo() {
        return {
            version: '1.0.0',
            buildDate: '2025-01-24',
            modules: {
                storage: '1.0.0',
                diceCore: '1.0.0',
                dice3D: '1.0.0',
                players: '1.0.0'
            },
            features: [
                'Dados 3D con física realista',
                'Sistema de jugadores con HP',
                'Estadísticas avanzadas',
                'Persistencia local',
                'Teclas rápidas',
                'Responsive design'
            ]
        };
    }
}

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Sistema RPG...');
    window.rpgSystem = new RPGSystem();
    
    // Hacer disponible globalmente para debugging
    window.debug = {
        system: window.rpgSystem,
        storage: window.storageManager,
        dice: window.diceCore,
        dice3D: window.dice3D,
        players: window.playersManager
    };
    
    console.log('🎮 Sistema RPG listo para usar!');
    console.log('💡 Teclas rápidas: R (lanzar), T (3D), N (nuevo jugador), S (estadísticas)');
});
