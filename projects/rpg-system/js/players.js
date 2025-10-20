/**
 * Players Module - Gestión de Jugadores
 * Maneja la creación, edición y gestión de jugadores
 */

class PlayersManager {
    constructor() {
        this.players = [];
        this.editingPlayerId = null;
        this.nextPlayerId = 1;
        this.colorOptions = [
            { value: 'red-orange', name: 'Rojo-Naranja' },
            { value: 'green-brown', name: 'Verde-Marrón' },
            { value: 'turquoise-blue', name: 'Turquesa-Azul' },
            { value: 'violet-pink', name: 'Violeta-Rosa' },
            { value: 'gold-bronze', name: 'Oro-Bronce' },
            { value: 'silver-grey', name: 'Plata-Gris' }
        ];
        
        this.initializeEventListeners();
        this.loadPlayers();
        this.renderPlayers();
        this.addDemoPlayer();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        // Botón añadir jugador
        const addBtn = document.getElementById('addPlayerBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showPlayerForm();
            });
        }

        // Botones del formulario
        const saveBtn = document.getElementById('savePlayer');
        const cancelBtn = document.getElementById('cancelPlayer');
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.savePlayer();
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hidePlayerForm();
            });
        }

        // Event listeners para botones de HP (delegación de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hp-btn')) {
                this.handleHPButton(e.target.closest('.hp-btn'));
            }
            if (e.target.closest('.delete-player')) {
                this.handleDeletePlayer(e.target.closest('.delete-player'));
            }
        });
    }

    /**
     * Carga los jugadores desde el storage
     */
    loadPlayers() {
        if (window.storageManager) {
            this.players = window.storageManager.getPlayers();
            // Actualizar el siguiente ID
            if (this.players.length > 0) {
                this.nextPlayerId = Math.max(...this.players.map(p => p.id)) + 1;
            }
        }
    }

    /**
     * Guarda los jugadores en el storage
     */
    savePlayers() {
        if (window.storageManager) {
            this.players.forEach(player => {
                window.storageManager.savePlayer(player);
            });
        }
    }

    /**
     * Añade un jugador demo si no hay jugadores
     */
    addDemoPlayer() {
        if (this.players.length === 0) {
            const demoPlayer = {
                id: this.nextPlayerId++,
                name: 'Jugador Demo',
                hp: 20,
                maxHp: 20,
                color: 'red-orange',
                createdAt: new Date().toISOString()
            };
            this.players.push(demoPlayer);
            this.savePlayers();
        }
    }

    /**
     * Muestra el formulario de jugador
     * @param {Object} player - Jugador a editar (opcional)
     */
    showPlayerForm(player = null) {
        const form = document.getElementById('playerForm');
        if (!form) return;

        if (player) {
            this.editingPlayerId = player.id;
            document.getElementById('playerName').value = player.name;
            document.getElementById('playerHp').value = player.hp;
            document.getElementById('playerGradient').value = player.color;
        } else {
            this.editingPlayerId = null;
            document.getElementById('playerName').value = '';
            document.getElementById('playerHp').value = 20;
            document.getElementById('playerGradient').value = 'red-orange';
        }

        form.style.display = 'flex';
    }

    /**
     * Oculta el formulario de jugador
     */
    hidePlayerForm() {
        const form = document.getElementById('playerForm');
        if (form) {
            form.style.display = 'none';
        }
        this.editingPlayerId = null;
    }

    /**
     * Guarda un jugador
     */
    savePlayer() {
        const name = document.getElementById('playerName').value.trim();
        const hp = parseInt(document.getElementById('playerHp').value);
        const color = document.getElementById('playerGradient').value;

        if (!name) {
            alert('El nombre del jugador no puede estar vacío.');
            return;
        }

        if (hp <= 0) {
            alert('Los puntos de vida deben ser mayores que 0.');
            return;
        }

        if (this.editingPlayerId) {
            // Editar jugador existente
            const playerIndex = this.players.findIndex(p => p.id === this.editingPlayerId);
            if (playerIndex !== -1) {
                this.players[playerIndex] = {
                    ...this.players[playerIndex],
                    name,
                    hp,
                    maxHp: hp,
                    color,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            // Crear nuevo jugador
            const newPlayer = {
                id: this.nextPlayerId++,
                name,
                hp,
                maxHp: hp,
                color,
                createdAt: new Date().toISOString()
            };
            this.players.push(newPlayer);
        }

        this.savePlayers();
        this.renderPlayers();
        this.hidePlayerForm();
    }

    /**
     * Elimina un jugador
     * @param {number} playerId - ID del jugador a eliminar
     */
    deletePlayer(playerId) {
        if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
            this.players = this.players.filter(p => p.id !== playerId);
            this.savePlayers();
            this.renderPlayers();
            
            if (window.storageManager) {
                window.storageManager.deletePlayer(playerId);
            }
        }
    }

    /**
     * Maneja los botones de HP
     * @param {HTMLElement} button - Botón clickeado
     */
    handleHPButton(button) {
        const playerId = parseInt(button.dataset.playerId);
        const hpChange = button.dataset.hpChange;
        const hpAction = button.dataset.hpAction;

        if (hpAction === 'reset') {
            this.resetHP(playerId);
        } else if (hpChange) {
            this.changeHP(playerId, parseInt(hpChange));
        }
    }

    /**
     * Maneja el botón de eliminar
     * @param {HTMLElement} button - Botón clickeado
     */
    handleDeletePlayer(button) {
        const playerId = parseInt(button.dataset.playerId);
        this.deletePlayer(playerId);
    }

    /**
     * Cambia los HP de un jugador
     * @param {number} playerId - ID del jugador
     * @param {number} change - Cambio en HP (puede ser negativo)
     */
    changeHP(playerId, change) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        // Permitir HP negativo y exceder el máximo
        player.hp = Math.max(0, player.hp + change);
        
        if (player.hp === 0) {
            alert(`¡${player.name} ha perdido! ¡Por noob! 😄`);
        }

        this.savePlayers();
        this.renderPlayers();
    }

    /**
     * Resetea los HP de un jugador al máximo
     * @param {number} playerId - ID del jugador
     */
    resetHP(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        player.hp = player.maxHp;
        this.savePlayers();
        this.renderPlayers();
    }

    /**
     * Renderiza todos los jugadores
     */
    renderPlayers() {
        const playersGrid = document.getElementById('playersGrid');
        if (!playersGrid) return;

        playersGrid.innerHTML = '';

        this.players.forEach(player => {
            const card = document.createElement('div');
            card.className = `player-card ${player.color}`;
            card.dataset.playerId = player.id;

            const hpPercentage = Math.min((player.hp / player.maxHp) * 100, 100);
            const exceededPercentage = player.hp > player.maxHp ? 
                ((player.hp - player.maxHp) / player.maxHp) * 100 : 0;

            card.innerHTML = `
                <div class="player-header">
                    <h3 class="player-name">${player.name}</h3>
                    <button class="delete-player" data-player-id="${player.id}" data-action="delete">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="player-hp">
                    <span class="hp-label">Vida:</span>
                    <span class="hp-value ${player.hp > player.maxHp ? 'hp-exceeded' : ''}">
                        ${player.hp}/${player.maxHp}${player.hp > player.maxHp ? ' ⬆️' : ''}
                    </span>
                    <div class="hp-bar">
                        <div class="hp-fill ${player.hp > player.maxHp ? 'hp-exceeded-fill' : ''}" 
                             style="width: ${hpPercentage}%"></div>
                        ${exceededPercentage > 0 ? 
                            `<div class="hp-exceeded-bar" style="width: ${exceededPercentage}%"></div>` : 
                            ''}
                    </div>
                </div>
                <div class="player-actions">
                    <button class="hp-btn decrease" data-player-id="${player.id}" data-hp-change="-1">-1</button>
                    <button class="hp-btn increase" data-player-id="${player.id}" data-hp-change="1">+1</button>
                    <button class="hp-btn increase-big" data-player-id="${player.id}" data-hp-change="5">+5</button>
                    <button class="hp-btn decrease-big" data-player-id="${player.id}" data-hp-change="-5">-5</button>
                    <button class="hp-btn reset" data-player-id="${player.id}" data-hp-action="reset">Reset</button>
                </div>
            `;
            playersGrid.appendChild(card);
        });
    }

    /**
     * Obtiene un jugador por ID
     * @param {number} playerId - ID del jugador
     * @returns {Object|null} Jugador encontrado o null
     */
    getPlayer(playerId) {
        return this.players.find(p => p.id === playerId);
    }

    /**
     * Obtiene todos los jugadores
     * @returns {Array} Array de jugadores
     */
    getAllPlayers() {
        return this.players;
    }

    /**
     * Obtiene el número de jugadores
     * @returns {number} Número de jugadores
     */
    getPlayerCount() {
        return this.players.length;
    }

    /**
     * Obtiene jugadores con HP bajo
     * @param {number} threshold - Umbral de HP bajo (por defecto 25% del máximo)
     * @returns {Array} Array de jugadores con HP bajo
     */
    getPlayersWithLowHP(threshold = 0.25) {
        return this.players.filter(player => 
            player.hp <= (player.maxHp * threshold)
        );
    }

    /**
     * Obtiene jugadores eliminados (HP = 0)
     * @returns {Array} Array de jugadores eliminados
     */
    getEliminatedPlayers() {
        return this.players.filter(player => player.hp === 0);
    }

    /**
     * Resetea todos los jugadores al HP máximo
     */
    resetAllPlayers() {
        this.players.forEach(player => {
            player.hp = player.maxHp;
        });
        this.savePlayers();
        this.renderPlayers();
    }

    /**
     * Exporta los jugadores como JSON
     * @returns {string} Datos de jugadores en formato JSON
     */
    exportPlayers() {
        return JSON.stringify(this.players, null, 2);
    }

    /**
     * Importa jugadores desde JSON
     * @param {string} jsonData - Datos en formato JSON
     * @returns {boolean} True si la importación fue exitosa
     */
    importPlayers(jsonData) {
        try {
            const importedPlayers = JSON.parse(jsonData);
            if (Array.isArray(importedPlayers)) {
                this.players = importedPlayers;
                this.nextPlayerId = Math.max(...this.players.map(p => p.id)) + 1;
                this.savePlayers();
                this.renderPlayers();
                return true;
            }
        } catch (error) {
            console.error('Error importando jugadores:', error);
        }
        return false;
    }

    /**
     * Obtiene estadísticas de los jugadores
     * @returns {Object} Estadísticas de jugadores
     */
    getPlayerStats() {
        const totalPlayers = this.players.length;
        const alivePlayers = this.players.filter(p => p.hp > 0).length;
        const eliminatedPlayers = totalPlayers - alivePlayers;
        const lowHPPlayers = this.getPlayersWithLowHP().length;
        const totalHP = this.players.reduce((sum, p) => sum + p.hp, 0);
        const averageHP = totalPlayers > 0 ? (totalHP / totalPlayers).toFixed(1) : 0;

        return {
            total: totalPlayers,
            alive: alivePlayers,
            eliminated: eliminatedPlayers,
            lowHP: lowHPPlayers,
            totalHP,
            averageHP: parseFloat(averageHP)
        };
    }
}

// Crear instancia global del PlayersManager
window.playersManager = new PlayersManager();
