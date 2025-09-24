/**
 * Dice Core Module - Lógica de Dados
 * Maneja la lógica de tirada de dados y estadísticas
 */

class DiceCore {
    constructor() {
        this.currentDiceType = 'd6';
        this.currentSides = 6;
        this.rollHistory = [];
        this.initializeEventListeners();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        // Selector de tipo de dado
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDice(e.target.closest('.dice-btn'));
            });
        });

        // Botón de lanzar dados
        const rollBtn = document.getElementById('rollDice');
        if (rollBtn) {
            rollBtn.addEventListener('click', () => {
                this.rollDice();
            });
        }
    }

    /**
     * Selecciona un tipo de dado
     * @param {HTMLElement} button - Botón seleccionado
     */
    selectDice(button) {
        // Remover selección anterior
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Activar nuevo botón
        button.classList.add('active');

        // Actualizar tipo de dado
        this.currentSides = parseInt(button.dataset.sides);
        this.currentDiceType = button.dataset.type;

        console.log(`Dado seleccionado: ${this.currentDiceType} (${this.currentSides} caras)`);
    }

    /**
     * Lanza un dado
     * @param {number} sides - Número de caras
     * @returns {number} Resultado de la tirada
     */
    rollSingle(sides) {
        if (sides === 2) {
            // Moneda: 0 = Cara, 1 = Cruz
            return Math.floor(Math.random() * 2);
        }
        return Math.floor(Math.random() * sides) + 1;
    }

    /**
     * Lanza múltiples dados
     * @param {number} quantity - Cantidad de dados
     * @param {number} sides - Número de caras
     * @returns {Array} Array de resultados
     */
    rollMultiple(quantity, sides) {
        const results = [];
        for (let i = 0; i < quantity; i++) {
            results.push(this.rollSingle(sides));
        }
        return results;
    }

    /**
     * Lanza dados y muestra resultados
     */
    rollDice() {
        const quantity = parseInt(document.getElementById('diceQuantity').value) || 1;
        
        if (quantity <= 0) {
            alert('La cantidad debe ser mayor que 0');
            return;
        }

        // Lanzar dados
        const results = this.rollMultiple(quantity, this.currentSides);
        const total = results.reduce((sum, result) => sum + result, 0);

        // Mostrar resultados
        this.displayResults(results, total);
        this.updateStats(results);
        
        // Guardar en historial
        this.saveRoll(results, total, quantity);

        // Si hay 3+ dados, mostrar estadísticas
        if (quantity >= 3) {
            this.showStatsModal(results);
        }

        console.log(`Tirada: ${quantity}${this.currentDiceType} = [${results.join(', ')}] = ${total}`);
    }

    /**
     * Muestra los resultados de la tirada
     * @param {Array} results - Resultados de los dados
     * @param {number} total - Suma total
     */
    displayResults(results, total) {
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
        const summaryElement = document.createElement('div');
        summaryElement.className = 'result-summary-content';
        summaryElement.innerHTML = `
            <div class="total-result">Total: ${total}</div>
            <div class="roll-details">
                ${results.length}${this.currentDiceType}: [${results.join(', ')}]
            </div>
        `;
        resultSummary.appendChild(summaryElement);
    }

    /**
     * Actualiza las estadísticas de la tirada
     * @param {Array} results - Resultados de los dados
     */
    updateStats(results) {
        const rollStats = document.getElementById('rollStats');
        
        if (results.length < 3) {
            rollStats.innerHTML = '<div class="stats-note">Tira 3 o más dados para ver estadísticas</div>';
            return;
        }

        // Calcular estadísticas
        const stats = this.calculateStats(results);
        
        rollStats.innerHTML = `
            <div class="stats-title">Estadísticas de la Tirada</div>
            <div class="stats-list">
                ${Object.entries(stats).map(([value, count]) => `
                    <div class="stat-item">
                        <span>${value}:</span>
                        <span>${count} veces</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Calcula estadísticas de los resultados
     * @param {Array} results - Resultados de los dados
     * @returns {Object} Estadísticas
     */
    calculateStats(results) {
        const stats = {};
        results.forEach(result => {
            stats[result] = (stats[result] || 0) + 1;
        });
        return stats;
    }

    /**
     * Muestra el modal de estadísticas
     * @param {Array} results - Resultados de los dados
     */
    showStatsModal(results) {
        const modal = document.getElementById('statsModal');
        const statsContent = document.getElementById('statsContent');
        
        const stats = this.calculateStats(results);
        const total = results.reduce((sum, result) => sum + result, 0);
        const average = (total / results.length).toFixed(2);
        const min = Math.min(...results);
        const max = Math.max(...results);

        statsContent.innerHTML = `
            <div class="stats-summary">
                <h4>Resumen de la Tirada</h4>
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
                                <div class="bar-fill" style="width: ${(count / results.length) * 100}%"></div>
                            </div>
                            <span class="bar-count">${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    /**
     * Guarda una tirada en el historial
     * @param {Array} results - Resultados de los dados
     * @param {number} total - Suma total
     * @param {number} quantity - Cantidad de dados
     */
    saveRoll(results, total, quantity) {
        const roll = {
            type: this.currentDiceType,
            sides: this.currentSides,
            quantity: quantity,
            results: results,
            total: total,
            timestamp: new Date()
        };

        this.rollHistory.unshift(roll);
        
        // Mantener solo las últimas 50 tiradas en memoria
        if (this.rollHistory.length > 50) {
            this.rollHistory = this.rollHistory.slice(0, 50);
        }

        // Guardar en storage
        if (window.storageManager) {
            window.storageManager.saveDiceRoll(roll);
        }
    }

    /**
     * Obtiene el historial de tiradas
     * @returns {Array} Historial de tiradas
     */
    getHistory() {
        return this.rollHistory;
    }

    /**
     * Limpia el historial de tiradas
     */
    clearHistory() {
        this.rollHistory = [];
        if (window.storageManager) {
            window.storageManager.clearDiceHistory();
        }
        
        // Limpiar UI
        document.getElementById('diceDisplay').innerHTML = '';
        document.getElementById('resultSummary').innerHTML = '';
        document.getElementById('rollStats').innerHTML = '';
    }

    /**
     * Simula tiradas para cantidades grandes (4+ dados)
     * @param {number} quantity - Cantidad de dados
     * @param {number} sides - Número de caras
     * @returns {Object} Resultados simulados
     */
    simulateLargeRoll(quantity, sides) {
        const results = this.rollMultiple(quantity, sides);
        const total = results.reduce((sum, result) => sum + result, 0);
        const stats = this.calculateStats(results);
        
        return {
            results,
            total,
            stats,
            quantity,
            sides,
            type: this.currentDiceType
        };
    }
}

// Crear instancia global del DiceCore
window.diceCore = new DiceCore();
