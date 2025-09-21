# 🔗 Información de APIs para Proyectos en Desarrollo

## 🍄 Índice Micológico - API Meteocat

### 📋 Información General
- **Nombre**: Meteocat XEMA API
- **URL Base**: `https://api.meteo.cat/xema/v1`
- **Documentación**: [Meteocat API Docs](https://apidocs.meteocat.gencat.cat/)
- **Tipo**: REST API
- **Autenticación**: API Key (x-api-key header)

### 🔑 Cómo Obtener API Key

1. **Registrarse** en [Meteocat](https://www.meteo.cat/)
2. **Acceder** al catálogo de servicios: [Serveis Oberts](https://www.meteo.cat/wpweb/serveis/cataleg-de-serveis/serveis-oberts/dades-obertes/)
3. **Solicitar** acceso a la API XEMA
4. **Recibir** la API Key por email
5. **Configurar** variable de entorno: `export METEOCAT_API_KEY="tu_key_aqui"`

### 📊 Endpoints Principales

#### Metadatos de Estaciones
```http
GET /estacions/metadades?estat=OPERATIVA
Headers: x-api-key: tu_api_key
```

#### Medidas Diarias por Estación
```http
GET /estacions/mesurades/{codiEstacio}/{YYYY}/{MM}/{DD}
Headers: x-api-key: tu_api_key
```

#### Variables Específicas
```http
GET /variables/mesurades/{codiVariable}/{YYYY}/{MM}/{DD}?codiEstacio={codi}
Headers: x-api-key: tu_api_key
```

### 🏢 Estaciones de Interés

| Código | Nombre | Ubicación | Tipo |
|--------|--------|-----------|------|
| XO | Vic | Interior Catalunya | Principal |
| XL | El Prat de Llobregat | Zona costera | Secundaria |

### 📈 Variables Meteorológicas

| Acrónimo | Descripción | Unidad | Código Variable |
|----------|-------------|--------|-----------------|
| PPT | Precipitación | mm | Variable por estación |
| TM | Temperatura media | °C | Variable por estación |
| TX | Temperatura máxima | °C | Variable por estación |
| TN | Temperatura mínima | °C | Variable por estación |
| HRM | Humedad relativa media | % | Variable por estación |

### 🐍 Ejemplo de Uso Python

```python
import requests
import os

API_KEY = os.getenv("METEOCAT_API_KEY")
BASE_URL = "https://api.meteo.cat/xema/v1"

def obtener_medidas_estacion(codi_estacio, fecha):
    url = f"{BASE_URL}/estacions/mesurades/{codi_estacio}/{fecha.year}/{fecha.month:02d}/{fecha.day:02d}"
    headers = {"x-api-key": API_KEY, "Accept": "application/json"}
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()

# Uso
import datetime as dt
fecha = dt.date(2025, 9, 21)
datos = obtener_medidas_estacion("XO", fecha)
```

### ⚠️ Limitaciones y Consideraciones

- **Rate Limiting**: No especificado en documentación
- **Datos históricos**: Disponibles desde 2009
- **Frecuencia**: Actualización cada 30 minutos
- **Formato**: JSON
- **Encoding**: UTF-8

### 🔧 Configuración Recomendada

```bash
# En .env o variables de entorno
METEOCAT_API_KEY=tu_api_key_aqui
METEOCAT_BASE_URL=https://api.meteo.cat/xema/v1
METEOCAT_TIMEOUT=30
```

### 📚 Recursos Adicionales

- [Documentación oficial Meteocat](https://apidocs.meteocat.gencat.cat/documentacio/acces-ciutada-i-administracio/)
- [Catálogo de servicios](https://www.meteo.cat/wpweb/serveis/cataleg-de-serveis/serveis-oberts/dades-obertes/)
- [Ejemplos de consultas](https://www.meteo.cat/observacions/xema/dades)

---

## 🏠 Gestor Inmobiliario - No requiere APIs externas

Este proyecto utiliza únicamente tecnologías locales:
- **PHP** con **MySQL** para backend
- **HTML/CSS/JavaScript** para frontend
- **PDO** para acceso seguro a base de datos

No requiere APIs externas, pero podría integrar:
- **Google Maps API** para geolocalización
- **Email API** (SendGrid, Mailgun) para notificaciones
- **Cloud Storage** (AWS S3, Google Cloud) para imágenes

---

**Última actualización**: 21/09/2025  
**Contacto**: m4rc.roma7@gmail.com
