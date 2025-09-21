<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏠 Gestor Inmobiliario - Aplicación</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Orbitron', monospace;
            background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
            color: #ffffff;
            min-height: 100vh;
            padding: 2rem;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .header h1 {
            color: #f59e0b;
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .status {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 2rem;
        }

        .nav-tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 1rem;
        }

        .nav-tab {
            background: rgba(245, 158, 11, 0.1);
            border: 2px solid #f59e0b;
            color: #f59e0b;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .nav-tab:hover, .nav-tab.active {
            background: #f59e0b;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
        }

        .tab-content {
            display: none;
            background: rgba(245, 158, 11, 0.05);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .tab-content.active {
            display: block;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            color: #f59e0b;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #f59e0b;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #d97706;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
        }

        .btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
        }

        .properties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .property-card {
            background: rgba(245, 158, 11, 0.1);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.3s ease;
        }

        .property-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
        }

        .property-card h3 {
            color: #f59e0b;
            margin-bottom: 1rem;
        }

        .property-info {
            margin-bottom: 1rem;
        }

        .property-info p {
            margin-bottom: 0.5rem;
            color: #d1d5db;
        }

        .property-info strong {
            color: #f59e0b;
        }

        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .alert-success {
            background: rgba(34, 197, 94, 0.1);
            border: 2px solid #22c55e;
            color: #22c55e;
        }

        .alert-error {
            background: rgba(239, 68, 68, 0.1);
            border: 2px solid #ef4444;
            color: #ef4444;
        }

        .setup-info {
            background: rgba(139, 92, 246, 0.1);
            border: 2px solid #8b5cf6;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .setup-info h3 {
            color: #8b5cf6;
            margin-bottom: 1rem;
        }

        .setup-info ol {
            color: #d1d5db;
            padding-left: 2rem;
        }

        .setup-info li {
            margin-bottom: 0.5rem;
        }

        .setup-info code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            color: #f59e0b;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Gestor Inmobiliario</h1>
            <div class="status">🚧 Demo Funcional</div>
        </div>

        <div class="setup-info">
            <h3>🔧 Configuración Inicial</h3>
            <ol>
                <li>Crear base de datos MySQL: <code>gestor_inmobiliario</code></li>
                <li>Ejecutar el archivo <code>database/schema.sql</code></li>
                <li>Configurar credenciales en <code>config/database.php</code></li>
                <li>Acceder via XAMPP: <code>http://localhost/portfolioPersonal/codeOpenSource/desarrollo/gestor-inmobiliario/app.php</code></li>
            </ol>
        </div>

        <div class="nav-tabs">
            <div class="nav-tab active" onclick="showTab('propiedades')">📋 Propiedades</div>
            <div class="nav-tab" onclick="showTab('nueva')">➕ Nueva Propiedad</div>
            <div class="nav-tab" onclick="showTab('contactos')">👥 Contactos</div>
            <div class="nav-tab" onclick="showTab('citas')">📅 Citas</div>
        </div>

        <!-- Tab Propiedades -->
        <div id="propiedades" class="tab-content active">
            <h2>📋 Listado de Propiedades</h2>
            <div class="properties-grid">
                <!-- Las propiedades se cargarán aquí via PHP -->
                <div class="property-card">
                    <h3>🏠 Carrer Major, 123</h3>
                    <div class="property-info">
                        <p><strong>Código Postal:</strong> 08500</p>
                        <p><strong>Valor de Mercado:</strong> 250.000€</p>
                        <p><strong>Dormitorios:</strong> 3 | <strong>Baños:</strong> 2</p>
                        <p><strong>Terraza:</strong> Sí | <strong>Eficiencia:</strong> C</p>
                        <p><strong>Contactos:</strong> 2 personas</p>
                        <p><strong>Citas:</strong> 2 programadas</p>
                    </div>
                </div>

                <div class="property-card">
                    <h3>🏠 Avinguda de la Pau, 45</h3>
                    <div class="property-info">
                        <p><strong>Código Postal:</strong> 08001</p>
                        <p><strong>Valor de Mercado:</strong> 180.000€</p>
                        <p><strong>Dormitorios:</strong> 2 | <strong>Baños:</strong> 1</p>
                        <p><strong>Terraza:</strong> No | <strong>Eficiencia:</strong> D</p>
                        <p><strong>Contactos:</strong> 1 persona</p>
                        <p><strong>Citas:</strong> 1 programada</p>
                    </div>
                </div>

                <div class="property-card">
                    <h3>🏠 Plaça Catalunya, 7</h3>
                    <div class="property-info">
                        <p><strong>Código Postal:</strong> 08002</p>
                        <p><strong>Valor de Mercado:</strong> 320.000€</p>
                        <p><strong>Dormitorios:</strong> 4 | <strong>Baños:</strong> 2</p>
                        <p><strong>Terraza:</strong> Sí | <strong>Eficiencia:</strong> B</p>
                        <p><strong>Contactos:</strong> 1 persona</p>
                        <p><strong>Citas:</strong> 1 programada</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Nueva Propiedad -->
        <div id="nueva" class="tab-content">
            <h2>➕ Nueva Propiedad</h2>
            <form action="app.php" method="POST">
                <div class="form-group">
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required>
                </div>

                <div class="form-group">
                    <label for="cp">Código Postal:</label>
                    <input type="text" id="cp" name="cp" required>
                </div>

                <div class="form-group">
                    <label for="valor_mercado">Valor de Mercado (€):</label>
                    <input type="number" id="valor_mercado" name="valor_mercado" step="0.01" required>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label for="dormitorios">Dormitorios:</label>
                        <select id="dormitorios" name="dormitorios" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="banos">Baños:</label>
                        <select id="banos" name="banos" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label for="terraza">Terraza:</label>
                        <select id="terraza" name="terraza" required>
                            <option value="0">No</option>
                            <option value="1">Sí</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="eficiencia">Eficiencia Energética:</label>
                        <select id="eficiencia" name="eficiencia">
                            <option value="">No especificada</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="transp_publico">Transporte Público:</label>
                    <textarea id="transp_publico" name="transp_publico" rows="3"></textarea>
                </div>

                <button type="submit" class="btn">💾 Guardar Propiedad</button>
            </form>
        </div>

        <!-- Tab Contactos -->
        <div id="contactos" class="tab-content">
            <h2>👥 Gestión de Contactos</h2>
            <p style="color: #d1d5db; margin-bottom: 2rem;">
                Aquí puedes gestionar los contactos asociados a cada propiedad.
            </p>
            <!-- Formulario de contactos se implementará -->
        </div>

        <!-- Tab Citas -->
        <div id="citas" class="tab-content">
            <h2>📅 Gestión de Citas</h2>
            <p style="color: #d1d5db; margin-bottom: 2rem;">
                Programa y gestiona las visitas a las propiedades.
            </p>
            <!-- Formulario de citas se implementará -->
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Ocultar todas las pestañas
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));

            // Remover clase active de todos los botones
            const buttons = document.querySelectorAll('.nav-tab');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Mostrar la pestaña seleccionada
            document.getElementById(tabName).classList.add('active');
            
            // Activar el botón correspondiente
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
