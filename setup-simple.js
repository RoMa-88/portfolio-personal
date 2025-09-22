#!/usr/bin/env node

/**
 * Script Simple de Configuración de APIs
 * Versión simplificada y más intuitiva
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
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
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
    console.clear();
    log('🚀 CONFIGURACIÓN DE APIS - PORTFOLIO MARC RODRÍGUEZ', 'bold');
    log('==================================================', 'cyan');
    
    log('\n📋 Este script configura las APIs necesarias para tus proyectos:', 'yellow');
    log('   🗺️  Google Maps → Gestor Inmobiliario', 'blue');
    log('   🌤️  Meteocat → Índice Micológico (Búsqueda de Setas)', 'green');
    
    const config = {
        GOOGLE_MAPS_API_KEY: '',
        METEOCAT_API_KEY: ''
    };
    
    // Configurar Google Maps
    log('\n🗺️  GOOGLE MAPS API', 'bold');
    log('   📍 Para: Gestor Inmobiliario (mapas interactivos)', 'blue');
    log('   🔗 Obtener: https://console.cloud.google.com/', 'cyan');
    log('   💰 Costo: Gratis hasta 28,000 cargas/mes', 'green');
    
    const googleKey = await askQuestion('   🔑 ¿Tienes tu API key de Google Maps? (Enter si no): ');
    if (googleKey.trim()) {
        config.GOOGLE_MAPS_API_KEY = googleKey.trim();
        log('   ✅ Google Maps configurado', 'green');
    } else {
        log('   ⏭️  Google Maps omitido (puedes añadirlo después)', 'yellow');
    }
    
    // Configurar Meteocat
    log('\n🌤️  METEOCAT API', 'bold');
    log('   🍄 Para: Índice Micológico (análisis de setas)', 'green');
    log('   🔗 Obtener: https://api.meteo.cat/', 'cyan');
    log('   💰 Costo: Gratis (100 predicciones, 750 XEMA, 250 XDDE/mes)', 'green');
    log('   📋 Ya tienes tu API key: Aq4ckjFXym99r3EeRmOLJ7nA3ELczDPG8NBhGXNP', 'magenta');
    
    const meteocatChoice = await askQuestion('   🔑 ¿Usar tu API key de Meteocat? (s/n): ');
    if (meteocatChoice.toLowerCase() === 's' || meteocatChoice.toLowerCase() === 'si') {
        config.METEOCAT_API_KEY = 'Aq4ckjFXym99r3EeRmOLJ7nA3ELczDPG8NBhGXNP';
        log('   ✅ Meteocat configurado', 'green');
    } else {
        log('   ⏭️  Meteocat omitido', 'yellow');
    }
    
    // Crear archivos de configuración
    if (config.GOOGLE_MAPS_API_KEY || config.METEOCAT_API_KEY) {
        await createConfigFiles(config);
        
        log('\n✅ ¡CONFIGURACIÓN COMPLETADA!', 'green');
        log('\n📁 Archivos creados:', 'bold');
        if (config.GOOGLE_MAPS_API_KEY) {
            log('   🗺️  codeOpenSource/desarrollo/gestor-inmobiliario/config.js', 'blue');
        }
        if (config.METEOCAT_API_KEY) {
            log('   🍄 codeOpenSource/desarrollo/indice-micologico/config.js', 'green');
        }
        
        log('\n🔒 Seguridad: Estos archivos NO se suben a Git', 'cyan');
        log('🌐 Para usar online: Configura variables de entorno en tu hosting', 'yellow');
        
    } else {
        log('\n⚠️  No se configuró ninguna API', 'yellow');
        log('   Puedes ejecutar este script nuevamente cuando las necesites', 'blue');
    }
    
    log('\n📚 Ayuda:', 'bold');
    log('   🗺️  Google Maps: codeOpenSource/desarrollo/gestor-inmobiliario/GOOGLE_MAPS_SETUP.md', 'blue');
    log('   🍄 Meteocat: codeOpenSource/desarrollo/indice-micologico/README.md', 'green');
    
    rl.close();
}

async function createConfigFiles(config) {
    // Configuración para Gestor Inmobiliario
    if (config.GOOGLE_MAPS_API_KEY) {
        const gestorConfig = `// Configuración Google Maps - Gestor Inmobiliario
// ⚠️  NO SUBIR A GIT - Este archivo contiene API keys reales

const API_CONFIG = {
    GOOGLE_MAPS_API_KEY: '${config.GOOGLE_MAPS_API_KEY}',
    
    MAP_CONFIG: {
        center: { lat: 41.3851, lng: 2.1734 }, // Barcelona
        zoom: 13,
        mapTypeId: 'roadmap'
    }
};

// Validación
function validateConfig() {
    if (!API_CONFIG.GOOGLE_MAPS_API_KEY) {
        console.warn('⚠️ Google Maps API Key no configurada');
        return false;
    }
    console.log('✅ Google Maps configurado correctamente');
    return true;
}

// Exportar
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.validateConfig = validateConfig;
}`;

        const gestorDir = path.join('codeOpenSource', 'desarrollo', 'gestor-inmobiliario');
        if (!fs.existsSync(gestorDir)) {
            fs.mkdirSync(gestorDir, { recursive: true });
        }
        fs.writeFileSync(path.join(gestorDir, 'config.js'), gestorConfig);
    }
    
    // Configuración para Índice Micológico
    if (config.METEOCAT_API_KEY) {
        const micologicoConfig = `// Configuración Meteocat - Índice Micológico
// ⚠️  NO SUBIR A GIT - Este archivo contiene API keys reales
// 🍄 Para análisis de condiciones meteorológicas para recolección de setas

const API_CONFIG = {
    METEOCAT_API_KEY: '${config.METEOCAT_API_KEY}',
    
    APP_CONFIG: {
        // Estaciones meteorológicas por defecto
        DEFAULT_STATIONS: {
            XO: 'Vic',
            XL: 'El Prat de Llobregat'
        },
        
        // Límites de la API Meteocat (según tu suscripción)
        API_LIMITS: {
            PREDICCION: 100,      // consultas por mes
            XEMA: 750,            // consultas por mes  
            XDDE: 250             // consultas por mes
        },
        
        // Algoritmo micológico personalizado
        MUSHROOM_ALGORITHM: {
            TEMP_MIN: 8,          // temperatura mínima óptima
            TEMP_MAX: 20,         // temperatura máxima óptima
            HUMIDITY_MIN: 70,     // humedad mínima óptima
            RAIN_DAYS_MIN: 3,     // días mínimos desde lluvia
            RAIN_DAYS_MAX: 7      // días máximos desde lluvia
        }
    }
};

// Validación
function validateConfig() {
    if (!API_CONFIG.METEOCAT_API_KEY) {
        console.warn('⚠️ Meteocat API Key no configurada');
        return false;
    }
    console.log('✅ Meteocat configurado correctamente');
    return true;
}

// Exportar
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.validateConfig = validateConfig;
}`;

        const micologicoDir = path.join('codeOpenSource', 'desarrollo', 'indice-micologico');
        if (!fs.existsSync(micologicoDir)) {
            fs.mkdirSync(micologicoDir, { recursive: true });
        }
        fs.writeFileSync(path.join(micologicoDir, 'config.js'), micologicoConfig);
    }
}

// Ejecutar el script
if (require.main === module) {
    setupAPIs().catch(console.error);
}

module.exports = { setupAPIs, createConfigFiles };
