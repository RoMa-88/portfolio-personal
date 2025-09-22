#!/usr/bin/env node

/**
 * Script de Configuración de APIs
 * Este script ayuda a configurar las API keys de forma segura
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Colores para la consola
const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function setupAPIs() {
    log('\n🔧 Configuración de APIs para Portfolio Personal', 'bold');
    log('================================================', 'blue');
    
    log('\n📋 Este script te ayudará a configurar las API keys de forma segura.', 'yellow');
    log('Las API keys NO se subirán a Git gracias al archivo .gitignore', 'green');
    
    const config = {
        METEOCAT_API_KEY: '',
        GOOGLE_MAPS_API_KEY: ''
    };
    
    // Configurar API de Meteocat
    log('\n🌤️  Configuración de API Meteocat:', 'bold');
    log('   - Para el proyecto Índice Micológico Catalunya', 'blue');
    log('   - Obtén tu API key en: https://api.meteo.cat/', 'blue');
    
    const meteocatKey = await askQuestion('   🔑 Introduce tu API key de Meteocat (o presiona Enter para saltar): ');
    if (meteocatKey.trim()) {
        config.METEOCAT_API_KEY = meteocatKey.trim();
        log('   ✅ API key de Meteocat configurada', 'green');
    } else {
        log('   ⏭️  Saltando configuración de Meteocat', 'yellow');
    }
    
    // Configurar API de Google Maps
    log('\n🗺️  Configuración de Google Maps API:', 'bold');
    log('   - Para el proyecto Gestor Inmobiliario', 'blue');
    log('   - Obtén tu API key en: https://console.cloud.google.com/', 'blue');
    
    const googleKey = await askQuestion('   🔑 Introduce tu API key de Google Maps (o presiona Enter para saltar): ');
    if (googleKey.trim()) {
        config.GOOGLE_MAPS_API_KEY = googleKey.trim();
        log('   ✅ API key de Google Maps configurada', 'green');
    } else {
        log('   ⏭️  Saltando configuración de Google Maps', 'yellow');
    }
    
    // Crear archivo de configuración
    if (config.METEOCAT_API_KEY || config.GOOGLE_MAPS_API_KEY) {
        await createConfigFiles(config);
        log('\n✅ Configuración completada exitosamente!', 'green');
        log('\n📁 Archivos creados:', 'bold');
        log('   - codeOpenSource/desarrollo/indice-micologico/config.js', 'blue');
        log('   - codeOpenSource/desarrollo/gestor-inmobiliario/config.js', 'blue');
        log('\n🔒 Estos archivos están en .gitignore y NO se subirán a Git', 'green');
    } else {
        log('\n⚠️  No se configuró ninguna API key', 'yellow');
        log('   Puedes ejecutar este script nuevamente cuando tengas las keys', 'blue');
    }
    
    log('\n📚 Documentación:', 'bold');
    log('   - Meteocat: codeOpenSource/desarrollo/indice-micologico/README.md', 'blue');
    log('   - Google Maps: codeOpenSource/desarrollo/gestor-inmobiliario/GOOGLE_MAPS_SETUP.md', 'blue');
    
    rl.close();
}

async function createConfigFiles(config) {
    // Configuración para Índice Micológico
    const micologicoConfig = `// Configuración de APIs - Archivo Real (NO SUBIR A GIT)
// Este archivo contiene las API keys reales y NO debe subirse al repositorio

const API_CONFIG = {
    // API Key de Meteocat (real)
    METEOCAT_API_KEY: '${config.METEOCAT_API_KEY}',
    
    // Configuración de la aplicación
    APP_CONFIG: {
        // Estaciones meteorológicas por defecto
        DEFAULT_STATIONS: {
            XO: 'Vic',
            XL: 'El Prat de Llobregat'
        },
        
        // Límites de la API Meteocat
        API_LIMITS: {
            PREDICCION: 100,      // consultas por mes
            XEMA: 750,            // consultas por mes  
            XDDE: 250             // consultas por mes
        },
        
        // Configuración del algoritmo micológico
        MUSHROOM_ALGORITHM: {
            TEMP_MIN: 8,          // temperatura mínima óptima
            TEMP_MAX: 20,         // temperatura máxima óptima
            HUMIDITY_MIN: 70,     // humedad mínima óptima
            RAIN_DAYS_MIN: 3,     // días mínimos desde lluvia
            RAIN_DAYS_MAX: 7      // días máximos desde lluvia
        }
    }
};

// Verificar que las API keys estén configuradas
function validateConfig() {
    const errors = [];
    
    if (!API_CONFIG.METEOCAT_API_KEY || API_CONFIG.METEOCAT_API_KEY === 'TU_API_KEY_METEOCAT_AQUI') {
        errors.push('METEOCAT_API_KEY no está configurada');
    }
    
    if (errors.length > 0) {
        console.warn('⚠️ Configuración incompleta:', errors);
        return false;
    }
    
    console.log('✅ Configuración validada correctamente');
    return true;
}

// Exportar configuración (para módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, validateConfig };
}

// Para uso en navegador
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.validateConfig = validateConfig;
}`;

    // Configuración para Gestor Inmobiliario
    const gestorConfig = `// Configuración de APIs - Archivo Real (NO SUBIR A GIT)
// Este archivo contiene las API keys reales y NO debe subirse al repositorio

const API_CONFIG = {
    // API Key de Google Maps (real)
    GOOGLE_MAPS_API_KEY: '${config.GOOGLE_MAPS_API_KEY}',
    
    // Configuración de la aplicación
    APP_CONFIG: {
        // Configuración del mapa por defecto
        MAP_CONFIG: {
            center: { lat: 41.3851, lng: 2.1734 }, // Barcelona
            zoom: 13,
            mapTypeId: 'roadmap'
        },
        
        // Configuración de marcadores
        MARKER_CONFIG: {
            title: 'Ubicación de la propiedad',
            animation: 'DROP'
        }
    }
};

// Verificar que las API keys estén configuradas
function validateConfig() {
    const errors = [];
    
    if (!API_CONFIG.GOOGLE_MAPS_API_KEY || API_CONFIG.GOOGLE_MAPS_API_KEY === 'TU_API_KEY_GOOGLE_MAPS_AQUI') {
        errors.push('GOOGLE_MAPS_API_KEY no está configurada');
    }
    
    if (errors.length > 0) {
        console.warn('⚠️ Configuración incompleta:', errors);
        return false;
    }
    
    console.log('✅ Configuración validada correctamente');
    return true;
}

// Exportar configuración (para módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, validateConfig };
}

// Para uso en navegador
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.validateConfig = validateConfig;
}`;

    // Crear directorios si no existen
    const micologicoDir = path.join('codeOpenSource', 'desarrollo', 'indice-micologico');
    const gestorDir = path.join('codeOpenSource', 'desarrollo', 'gestor-inmobiliario');
    
    if (!fs.existsSync(micologicoDir)) {
        fs.mkdirSync(micologicoDir, { recursive: true });
    }
    
    if (!fs.existsSync(gestorDir)) {
        fs.mkdirSync(gestorDir, { recursive: true });
    }
    
    // Escribir archivos de configuración
    if (config.METEOCAT_API_KEY) {
        fs.writeFileSync(path.join(micologicoDir, 'config.js'), micologicoConfig);
    }
    
    if (config.GOOGLE_MAPS_API_KEY) {
        fs.writeFileSync(path.join(gestorDir, 'config.js'), gestorConfig);
    }
}

// Ejecutar el script
if (require.main === module) {
    setupAPIs().catch(console.error);
}

module.exports = { setupAPIs, createConfigFiles };
