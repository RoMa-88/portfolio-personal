# 🚀 Configuración Simple de APIs

## ⚡ Configuración Rápida (2 minutos)

### 1. Ejecutar Script Automático
```bash
node setup-simple.js
```

### 2. Seguir las Instrucciones
El script te preguntará:
- 🗺️ **Google Maps** (para Gestor Inmobiliario)
- 🌤️ **Meteocat** (para Índice Micológico - ya tienes la key)

### 3. ¡Listo!
Los archivos se configuran automáticamente y NO se suben a Git.

---

## 📋 APIs Disponibles

### 🗺️ Google Maps API
- **Para:** Gestor Inmobiliario
- **Obtener:** https://console.cloud.google.com/
- **Costo:** Gratis (28,000 cargas/mes)
- **Necesario:** Solo si quieres mapas interactivos

### 🌤️ Meteocat API
- **Para:** Índice Micológico (Búsqueda de Setas)
- **Ya tienes:** `Aq4ckjFXym99r3EeRmOLJ7nA3ELczDPG8NBhGXNP`
- **Costo:** Gratis (100 predicciones, 750 XEMA, 250 XDDE/mes)
- **Válida hasta:** 30-09-2026

---

## 🔒 Seguridad

✅ **Las API keys NO se suben a Git** (protegidas por `.gitignore`)  
✅ **Solo funcionan en tu máquina local**  
✅ **Para GitHub Pages:** Configurar variables de entorno  

---

## 🆘 Si Algo Sale Mal

1. **Borrar configuración:**
   ```bash
   rm codeOpenSource/desarrollo/*/config.js
   ```

2. **Volver a configurar:**
   ```bash
   node setup-simple.js
   ```

3. **Verificar que no se suben a Git:**
   ```bash
   git status
   # Los archivos config.js NO deben aparecer
   ```

---

**Desarrollado por:** Marc Rodríguez  
**Contacto:** m4rc.roma7@gmail.com
