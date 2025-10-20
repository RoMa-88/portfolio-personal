// Configuración de APIs - Template
// Copia este archivo como 'config.js' y añade tus API keys reales

const API_CONFIG = {
    // API Key de Meteocat (obtenida de https://api.meteo.cat/)
    METEOCAT_API_KEY: 'TU_API_KEY_METEOCAT_AQUI',
    
    // Otras APIs que puedas necesitar en el futuro
    GOOGLE_MAPS_API_KEY: 'TU_API_KEY_GOOGLE_MAPS_AQUI',
    
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
}
