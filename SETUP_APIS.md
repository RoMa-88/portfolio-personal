# 🔐 Configuración Segura de APIs

Este documento explica cómo configurar las API keys de forma segura para que NO se suban a Git.

## 🚨 Importante: Seguridad

**NUNCA subas API keys reales a Git.** Este repositorio está configurado para ignorar automáticamente los archivos de configuración que contienen datos sensibles.

## 🛠️ Configuración Automática (Recomendado)

### 1. Ejecutar el Script de Configuración

```bash
node setup-apis.js
```

Este script interactivo te guiará paso a paso para configurar tus API keys de forma segura.

### 2. Seguir las Instrucciones

El script te pedirá:
- 🔑 **API Key de Meteocat** (para el Índice Micológico)
- 🔑 **API Key de Google Maps** (para el Gestor Inmobiliario)

### 3. Verificar la Configuración

Los archivos se crearán automáticamente en:
- `codeOpenSource/desarrollo/indice-micologico/config.js`
- `codeOpenSource/desarrollo/gestor-inmobiliario/config.js`

## 🔧 Configuración Manual

### 1. Copiar Templates

```bash
# Para Índice Micológico
cp codeOpenSource/desarrollo/indice-micologico/config-template.js codeOpenSource/desarrollo/indice-micologico/config.js

# Para Gestor Inmobiliario
cp codeOpenSource/desarrollo/gestor-inmobiliario/config-template.js codeOpenSource/desarrollo/gestor-inmobiliario/config.js
```

### 2. Editar Archivos de Configuración

Abre los archivos `config.js` y reemplaza los placeholders con tus API keys reales:

```javascript
// En lugar de:
METEOCAT_API_KEY: 'TU_API_KEY_METEOCAT_AQUI',

// Pon tu API key real:
METEOCAT_API_KEY: 'Aq4ckjFXym99r3EeRmOLJ7nA3ELczDPG8NBhGXNP',
```

## 📋 APIs Necesarias

### 🌤️ Meteocat API

**Para:** Índice Micológico Catalunya

**Cómo obtener:**
1. Visita: https://api.meteo.cat/
2. Solicita acceso a la API
3. Especifica el uso: "Proyecto personal de análisis micológico"
4. Recibirás tu API key por email

**Límites:**
- Predicción: 100 consultas/mes
- XEMA: 750 consultas/mes
- XDDE: 250 consultas/mes

### 🗺️ Google Maps API

**Para:** Gestor Inmobiliario

**Cómo obtener:**
1. Visita: https://console.cloud.google.com/
2. Crea un proyecto o selecciona uno existente
3. Habilita las APIs necesarias:
   - Maps JavaScript API
   - Geocoding API
   - Places API (opcional)
4. Crea credenciales (API Key)
5. Configura restricciones de seguridad

**Límites gratuitos:**
- Mapas: 28,000 cargas/mes
- Geocodificación: 40,000 solicitudes/mes

## 🔒 Seguridad

### Archivos Ignorados por Git

El archivo `.gitignore` está configurado para ignorar:

```gitignore
# Archivos de configuración con API keys (NO SUBIR A GIT)
**/config.js
**/api-keys.js
**/secrets.js

# Archivos de entorno
.env
.env.local
.env.production
```

### Verificación

Para verificar que tus API keys NO se subirán a Git:

```bash
# Ver qué archivos se subirán
git status

# Si ves archivos config.js, significa que hay un problema
# Los archivos config.js NO deben aparecer en git status
```

## 🚀 Uso en los Proyectos

### En el Índice Micológico

```javascript
// El archivo se carga automáticamente
// Usar la configuración:
if (window.API_CONFIG && window.API_CONFIG.METEOCAT_API_KEY) {
    const client = new MeteocatAPIClient(window.API_CONFIG.METEOCAT_API_KEY);
}
```

### En el Gestor Inmobiliario

```javascript
// El archivo se carga automáticamente
// Usar la configuración:
if (window.API_CONFIG && window.API_CONFIG.GOOGLE_MAPS_API_KEY) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${window.API_CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
}
```

## 🔄 Actualización de APIs

Si necesitas cambiar una API key:

1. **Editar** el archivo `config.js` correspondiente
2. **Reemplazar** la API key antigua con la nueva
3. **Verificar** que funciona correctamente
4. **NO hacer commit** del archivo (está en .gitignore)

## 🆘 Solución de Problemas

### Error: "API key no configurada"

**Causa:** El archivo `config.js` no existe o no contiene la API key.

**Solución:**
1. Ejecutar `node setup-apis.js`
2. O crear manualmente el archivo desde el template

### Error: "Configuración incompleta"

**Causa:** La API key está vacía o es el placeholder.

**Solución:**
1. Verificar que el archivo `config.js` contiene la API key real
2. Asegurarse de que no hay espacios extra

### Las APIs no funcionan en GitHub Pages

**Causa:** Los archivos `config.js` no se suben a Git (es correcto).

**Solución:**
1. Para desarrollo local: usar archivos `config.js`
2. Para producción: configurar variables de entorno en el hosting
3. O usar un servicio de configuración externo

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Verificar** que los archivos `config.js` existen
2. **Comprobar** que contienen las API keys correctas
3. **Revisar** la consola del navegador para errores
4. **Consultar** la documentación de cada API

---

**Desarrollado por:** Marc Rodríguez  
**Contacto:** m4rc.roma7@gmail.com  
**GitHub:** [@RoMa-88](https://github.com/RoMa-88)
