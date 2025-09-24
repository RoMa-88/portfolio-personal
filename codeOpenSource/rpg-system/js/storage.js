/**
 * Storage Module - Gestión de Persistencia Local
 * Maneja el almacenamiento y recuperación de datos del juego
 */

class StorageManager {
    constructor() {
        this.storageKey = 'rpgSystemData';
        this.defaultData = {
            players: [],
            diceHistory: [],
            settings: {
                theme: 'medieval',
                sounds: true,
                autoSave: true
            }
        };
    }

    /**
     * Guarda los datos del juego en localStorage
     * @param {Object} data - Datos a guardar
     */
    save(data) {
        try {
            const dataToSave = {
                ...data,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
            console.log('Datos guardados en localStorage');
        } catch (error) {
            console.error('Error guardando datos:', error);
        }
    }

    /**
     * Carga los datos del juego desde localStorage
     * @returns {Object} Datos cargados o datos por defecto
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                console.log('Datos cargados desde localStorage');
                return { ...this.defaultData, ...data };
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
        
        console.log('Usando datos por defecto');
        return this.defaultData;
    }

    /**
     * Guarda un jugador específico
     * @param {Object} player - Datos del jugador
     */
    savePlayer(player) {
        const data = this.load();
        const existingIndex = data.players.findIndex(p => p.id === player.id);
        
        if (existingIndex >= 0) {
            data.players[existingIndex] = player;
        } else {
            data.players.push(player);
        }
        
        this.save(data);
    }

    /**
     * Elimina un jugador
     * @param {number} playerId - ID del jugador a eliminar
     */
    deletePlayer(playerId) {
        const data = this.load();
        data.players = data.players.filter(p => p.id !== playerId);
        this.save(data);
    }

    /**
     * Guarda una tirada de dados en el historial
     * @param {Object} roll - Datos de la tirada
     */
    saveDiceRoll(roll) {
        const data = this.load();
        data.diceHistory.unshift({
            ...roll,
            timestamp: new Date().toISOString()
        });
        
        // Mantener solo las últimas 100 tiradas
        if (data.diceHistory.length > 100) {
            data.diceHistory = data.diceHistory.slice(0, 100);
        }
        
        this.save(data);
    }

    /**
     * Obtiene el historial de tiradas
     * @returns {Array} Array de tiradas
     */
    getDiceHistory() {
        const data = this.load();
        return data.diceHistory;
    }

    /**
     * Limpia el historial de tiradas
     */
    clearDiceHistory() {
        const data = this.load();
        data.diceHistory = [];
        this.save(data);
    }

    /**
     * Obtiene todos los jugadores
     * @returns {Array} Array de jugadores
     */
    getPlayers() {
        const data = this.load();
        return data.players;
    }

    /**
     * Guarda la configuración
     * @param {Object} settings - Configuración a guardar
     */
    saveSettings(settings) {
        const data = this.load();
        data.settings = { ...data.settings, ...settings };
        this.save(data);
    }

    /**
     * Obtiene la configuración
     * @returns {Object} Configuración actual
     */
    getSettings() {
        const data = this.load();
        return data.settings;
    }

    /**
     * Exporta todos los datos como JSON
     * @returns {string} Datos en formato JSON
     */
    exportData() {
        const data = this.load();
        return JSON.stringify(data, null, 2);
    }

    /**
     * Importa datos desde JSON
     * @param {string} jsonData - Datos en formato JSON
     * @returns {boolean} True si la importación fue exitosa
     */
    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            this.save(importedData);
            console.log('Datos importados correctamente');
            return true;
        } catch (error) {
            console.error('Error importando datos:', error);
            return false;
        }
    }

    /**
     * Resetea todos los datos a los valores por defecto
     */
    reset() {
        localStorage.removeItem(this.storageKey);
        console.log('Datos reseteados a valores por defecto');
    }

    /**
     * Obtiene estadísticas de uso
     * @returns {Object} Estadísticas del juego
     */
    getStats() {
        const data = this.load();
        const stats = {
            totalRolls: data.diceHistory.length,
            totalPlayers: data.players.length,
            lastSaved: data.lastSaved,
            mostUsedDice: this.getMostUsedDice(data.diceHistory),
            totalDamage: this.getTotalDamage(data.diceHistory)
        };
        
        return stats;
    }

    /**
     * Obtiene el dado más usado
     * @param {Array} history - Historial de tiradas
     * @returns {string} Tipo de dado más usado
     */
    getMostUsedDice(history) {
        const diceCount = {};
        history.forEach(roll => {
            const diceType = roll.type || 'd6';
            diceCount[diceType] = (diceCount[diceType] || 0) + 1;
        });
        
        return Object.keys(diceCount).reduce((a, b) => 
            diceCount[a] > diceCount[b] ? a : b, 'd6'
        );
    }

    /**
     * Calcula el daño total infligido
     * @param {Array} history - Historial de tiradas
     * @returns {number} Daño total
     */
    getTotalDamage(history) {
        return history.reduce((total, roll) => {
            if (roll.results && roll.results.length > 0) {
                return total + roll.results.reduce((sum, result) => sum + result, 0);
            }
            return total;
        }, 0);
    }
}

// Crear instancia global del StorageManager
window.storageManager = new StorageManager();
