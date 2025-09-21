# 🍄 Índice Micológico Catalunya

Análisis de datos meteorológicos de Meteocat para predecir las mejores épocas de recolección de setas en diferentes zonas de Catalunya.

## 🚧 Estado: En Desarrollo

## 🛠️ Tecnologías

- **Python 3.8+** - Análisis de datos
- **API Meteocat** - Datos meteorológicos
- **Pandas** - Manipulación de datos
- **Matplotlib** - Visualizaciones
- **Requests** - Cliente HTTP

## 📊 Estaciones de Referencia

- **XO - Vic**: Estación principal para datos del interior
- **XL - El Prat de Llobregat**: Estación para datos costeros

## 🔗 APIs Utilizadas

### Meteocat XEMA
- **Base URL**: `https://api.meteo.cat/xema/v1`
- **Documentación**: [Meteocat API Docs](https://apidocs.meteocat.gencat.cat/)
- **Endpoints principales**:
  - `/estacions/metadades` - Metadatos de estaciones
  - `/estacions/mesurades/{codi}/{YYYY}/{MM}/{DD}` - Medidas diarias
  - `/variables/mesurades/{codi}/{YYYY}/{MM}/{DD}` - Variables específicas

### Variables de Interés
- **PPT** - Precipitación (mm)
- **TM** - Temperatura media (°C)
- **TX** - Temperatura máxima (°C)
- **TN** - Temperatura mínima (°C)
- **HRM** - Humedad relativa media (%)

## 📋 Características en Desarrollo

### ✅ Completadas
- [x] Cliente básico para API Meteocat
- [x] Descarga de datos de estaciones XO y XL
- [x] Estructura de datos con Pandas
- [x] Funciones de análisis básico

### 🚧 En Progreso
- [ ] Índice micológico personalizado
- [ ] Gráficos y visualizaciones
- [ ] Predicción por zonas geográficas
- [ ] Análisis histórico multi-año

### 📅 Próximas Funcionalidades
- [ ] Mapa interactivo por comarcas
- [ ] Alertas automáticas
- [ ] API REST para consultas
- [ ] Dashboard web

## 🧮 Algoritmo del Índice Micológico

```python
def indice_micologico_simple(lluvia7, lluvia14, pct_t_ok):
    """
    Índice prototipo: pondera lluvia reciente y temperatura 'ideal'
    """
    # Normalizaciones simples
    n7 = min(lluvia7 / 20.0, 1.0)     # 20mm/7d = "ple"
    n14 = min(lluvia14 / 40.0, 1.0)   # 40mm/14d = "ple"
    return 0.5*n7 + 0.3*n14 + 0.2*pct_t_ok
```

### Factores Considerados
- **Precipitación reciente** (7 y 14 días)
- **Temperatura óptima** (8-20°C)
- **Humedad relativa** (>70%)
- **Días desde última lluvia**
- **Amplitud térmica**

## 🚀 Instalación

```bash
# Instalar dependencias
pip install requests pandas matplotlib python-dotenv

# Configurar API Key
export METEOCAT_API_KEY="tu_api_key_aqui"

# Ejecutar análisis
python analisis_micologico.py
```

## 📁 Estructura del Proyecto

```
indice-micologico/
├── README.md
├── requirements.txt
├── config/
│   └── settings.py
├── src/
│   ├── meteocat_client.py
│   ├── analisis_micologico.py
│   └── visualizaciones.py
├── data/
│   ├── raw/          # Datos crudos
│   ├── processed/    # Datos procesados
│   └── outputs/      # Gráficos y reportes
└── tests/
    └── test_meteocat.py
```

## 📝 Notas de Desarrollo

- **Comentarios en catalán** en el código
- **Manejo de errores** robusto para API
- **Caché local** para evitar límites de API
- **Documentación** completa de funciones

## 🔑 API Key

Para obtener acceso a la API de Meteocat:
1. Registrarse en [Meteocat](https://www.meteo.cat/)
2. Solicitar API Key en el catálogo de servicios
3. Configurar variable de entorno `METEOCAT_API_KEY`

---

**Desarrollado por:** Marc Rodríguez  
**Contacto:** m4rc.roma7@gmail.com  
**GitHub:** [@RoMa-88](https://github.com/RoMa-88)
