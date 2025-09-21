# 🗺️ Configuración de Google Maps para Gestor Inmobiliario

## 📋 Requisitos

Para activar la funcionalidad de mapas en el Gestor Inmobiliario, necesitas:

1. **Cuenta de Google** (gratuita)
2. **API Key de Google Maps** (gratuita con límites generosos)
3. **Configuración de la API Key** en el código

## 🔑 Paso 1: Obtener API Key de Google Maps

### 1. Ir a Google Cloud Console
- Visita: [Google Cloud Console](https://console.cloud.google.com/)
- Inicia sesión con tu cuenta de Google

### 2. Crear un nuevo proyecto (opcional)
- Haz clic en el selector de proyectos
- Selecciona "Nuevo proyecto"
- Nombra tu proyecto (ej: "Gestor Inmobiliario")
- Haz clic en "Crear"

### 3. Habilitar APIs necesarias
- En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
- Busca y habilita estas APIs:
  - **Maps JavaScript API**
  - **Geocoding API**
  - **Places API** (opcional, para búsquedas avanzadas)

### 4. Crear credenciales
- Ve a "APIs y servicios" > "Credenciales"
- Haz clic en "Crear credenciales" > "Clave de API"
- Copia la API Key generada

## ⚙️ Paso 2: Configurar la API Key

### Opción A: Configuración directa (para desarrollo)
1. Abre el archivo `crud.html`
2. Busca esta línea:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```
3. Reemplaza `YOUR_API_KEY` con tu API Key real:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvOkBwVcHdEfGhIjKlMnOpQrStUvWxYzI&callback=initMap"></script>
```

### Opción B: Configuración segura (recomendada para producción)
1. Crea un archivo `config.js`:
```javascript
const GOOGLE_MAPS_API_KEY = 'tu_api_key_aqui';
```

2. Modifica el script en `crud.html`:
```html
<script src="config.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap"></script>
```

## 🛡️ Paso 3: Configurar restricciones de seguridad (recomendado)

### Restricciones de aplicación
1. En Google Cloud Console, ve a "APIs y servicios" > "Credenciales"
2. Haz clic en tu API Key
3. En "Restricciones de aplicación", selecciona:
   - **Referencias HTTP** (para desarrollo local)
   - **Dominios de aplicación web** (para producción)

### Restricciones de API
1. En "Restricciones de API", selecciona:
   - Maps JavaScript API
   - Geocoding API
   - Places API (si la usas)

## 💰 Costos y límites

### Límites gratuitos (por mes)
- **Mapas cargados**: 28,000 cargas
- **Geocodificación**: 40,000 solicitudes
- **Places API**: 1,000 solicitudes

### Para el Gestor Inmobiliario
- **Uso típico**: ~100 propiedades = ~100 cargas de mapa
- **Coste mensual**: $0 (dentro del límite gratuito)

## 🚀 Funcionalidades disponibles

### Con API Key configurada:
- ✅ **Mapa interactivo** para seleccionar ubicación
- ✅ **Búsqueda de direcciones** con geocodificación
- ✅ **Marcadores automáticos** en la ubicación
- ✅ **Coordenadas precisas** (latitud/longitud)
- ✅ **Geocodificación inversa** (coordenadas → dirección)

### Sin API Key:
- ⚠️ **Mensaje informativo** sobre configuración necesaria
- ✅ **Todas las demás funcionalidades** funcionan normalmente
- ✅ **Campos de coordenadas** editables manualmente

## 🔧 Solución de problemas

### Error: "This page can't load Google Maps correctly"
- **Causa**: API Key incorrecta o no configurada
- **Solución**: Verificar que la API Key sea correcta

### Error: "RefererNotAllowedMapError"
- **Causa**: Restricciones de dominio muy estrictas
- **Solución**: Añadir tu dominio a las restricciones o usar "Referencias HTTP"

### Error: "QuotaExceededError"
- **Causa**: Se ha excedido el límite gratuito
- **Solución**: Configurar facturación en Google Cloud Console

### Mapa no se carga
- **Causa**: APIs no habilitadas
- **Solución**: Habilitar Maps JavaScript API y Geocoding API

## 📱 Integración con Google Drive (Futuro)

Para la gestión de fotos con Google Drive, necesitarías:

1. **Google Drive API** habilitada
2. **OAuth 2.0** para autenticación
3. **Google Picker API** para selección de archivos

### Configuración básica:
```javascript
// Ejemplo futuro de integración con Google Drive
function initGoogleDrive() {
    gapi.load('picker', function() {
        // Configurar Google Picker para seleccionar fotos
    });
}
```

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Documentación oficial**: [Google Maps Platform](https://developers.google.com/maps/documentation)
2. **Console de Google Cloud**: Revisar logs de errores
3. **Herramientas de desarrollador**: Verificar errores en la consola del navegador

---

**Desarrollado por:** Marc Rodríguez  
**Contacto:** m4rc.roma7@gmail.com  
**GitHub:** [@RoMa-88](https://github.com/RoMa-88)
