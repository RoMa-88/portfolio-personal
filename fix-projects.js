const fs = require('fs');

// Leer el archivo index.html
let content = fs.readFileSync('index.html', 'utf8');

// Encontrar el inicio de la sección de proyectos
const projectsStart = content.indexOf('<div class="projects-grid">');
const projectsEnd = content.indexOf('</div>', content.indexOf('<!-- Skills Section -->'));

// Extraer solo la primera parte hasta projects-grid
const beforeProjects = content.substring(0, projectsStart);

// Extraer la parte después de projects-grid
const afterProjects = content.substring(content.indexOf('<!-- Skills Section -->'));

// Crear el nuevo contenido con solo 6 proyectos
const cleanProjects = `            <div class="projects-grid">
                <!-- JavaScript/Web Apps -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop" alt="Cyberpunk Interface">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="codeOpenSource/javascript/cyberpunk-interface.html" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="https://github.com/RoMa-88/portfolio-personal" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Cyberpunk Interface</h3>
                        <p>Dashboard futurista con estética ciberpunk, efectos glitch y animaciones neon</p>
                        <div class="project-tech">
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">CSS3</span>
                            <span class="tech-tag">Animations</span>
                        </div>
                    </div>
                </div>

                <!-- JavaScript/Backend -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" alt="Gestor Inmobiliario">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="codeOpenSource/desarrollo/gestor-inmobiliario/app.html" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="https://github.com/RoMa-88/portfolio-personal" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Gestor Inmobiliario</h3>
                        <p>CRUD completo con Google Maps, gestión de fotos y exportación de datos</p>
                        <div class="project-tech">
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">Google Maps</span>
                            <span class="tech-tag">LocalStorage</span>
                        </div>
                    </div>
                </div>

                <!-- Python/Data Science -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Índice Micológico">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="codeOpenSource/desarrollo/indice-micologico/app.html" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="https://github.com/RoMa-88/portfolio-personal" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Índice Micológico</h3>
                        <p>Análisis de condiciones meteorológicas para recolección de setas con API Meteocat</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">API Meteocat</span>
                            <span class="tech-tag">Data Analysis</span>
                        </div>
                    </div>
                </div>

                <!-- HTML/CSS/Frontend -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" alt="MarketingDigital360">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="https://marketingdigital360.es" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="codeOpenSource/html-css/marketing-digital360.html" target="_blank" class="project-link">
                                    <i class="fas fa-info-circle"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>MarketingDigital360.es</h3>
                        <p>Web corporativa con WordPress, diseño responsive y animaciones fluidas</p>
                        <div class="project-tech">
                            <span class="tech-tag">WordPress</span>
                            <span class="tech-tag">CSS3</span>
                            <span class="tech-tag">PHP</span>
                        </div>
                    </div>
                </div>

                <!-- Java/Desktop -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop" alt="Nocthollow Game">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="https://github.com/RoMa-88/day1NocthollowTheGame" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="https://github.com/RoMa-88/day1NocthollowTheGame" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Nocthollow: The Game</h3>
                        <p>Videojuego en Java con Swing, mecánicas de juego y sistema de puntuación</p>
                        <div class="project-tech">
                            <span class="tech-tag">Java</span>
                            <span class="tech-tag">Swing</span>
                            <span class="tech-tag">Game Development</span>
                        </div>
                    </div>
                </div>

                <!-- Three.js/3D -->
                <div class="project-card">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop" alt="Cubo de Rubik 3D">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="codeOpenSource/games/rubik-cube.html" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="https://github.com/RoMa-88/portfolio-personal" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Cubo de Rubik 3D</h3>
                        <p>Simulación interactiva 3D del cubo de Rubik con Three.js y controles de cámara</p>
                        <div class="project-tech">
                            <span class="tech-tag">Three.js</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">3D Graphics</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enlace a más proyectos -->
            <div style="text-align: center; margin-top: 3rem;">
                <a href="codeOpenSource/" class="btn-primary" style="display: inline-block;">
                    <i class="fas fa-code"></i> Ver Todos los Proyectos
                </a>
            </div>
        </section>

        <!-- Skills Section -->`;

// Combinar todo
const newContent = beforeProjects + cleanProjects + afterProjects;

// Escribir el archivo limpio
fs.writeFileSync('index.html', newContent);

console.log('✅ Portfolio limpiado exitosamente');
console.log('📊 Proyectos eliminados: 17 → 6');
console.log('🎯 Solo proyectos principales mantenidos');
