# 🌍 Cyberpunk Atlas - Ciudades Futuristas

Un atlas interactivo de ciudades futuristas de la ciencia ficción, donde cada ciudad corresponde a un material específico (videojuego, película, libro, etc.).

## 🎯 Características

- **6 Ciudades Futuristas**: Cada una con su propio material de origen
- **Globo Holográfico**: Mini-globo en cada tarjeta que muestra la ubicación real
- **Efecto Flip 3D**: Las tarjetas se voltean para mostrar información del material origen
- **Panel de Información Dinámico**: Se actualiza según la ciudad seleccionada
- **Diseño Cyberpunk**: Estética futurista con efectos neon y animaciones

## 🏙️ Ciudades Incluidas

1. **Night City** - Cyberpunk 2077 (Videojuego)
2. **Chiba City** - Neuromante (Novela)
3. **Neo-Tokyo** - Akira (Manga/Anime)
4. **Mega-City One** - Judge Dredd (Cómic)
5. **Delta City** - RoboCop (Película)
6. **Olympus** - Appleseed (Manga/Anime)

## 📁 Estructura del Proyecto

```
cyberpunk-interface/
├── index.html                    # Dashboard principal
├── cyberpunk-atlas.html         # Atlas de ciudades
├── cities.json                  # Datos de las ciudades
├── css/
│   └── cyberpunk-theme.css      # Estilos del dashboard
├── js/
│   ├── globe-mini.js           # Componente del globo holográfico
│   ├── city-card.js            # Componente de tarjetas con flip 3D
│   ├── info-panel.js           # Panel de información dinámico
│   └── cyberpunk-atlas.js      # Aplicación principal
└── images/                     # Imágenes de las ciudades
    ├── night-city-bg.jpg
    ├── chiba-city-bg.jpg
    ├── neo-tokyo-bg.jpg
    ├── mega-city-bg.jpg
    ├── delta-city-bg.jpg
    └── olympus-bg.jpg
```

## 🖼️ Imágenes Recomendadas

Para cada ciudad, busca imágenes con estas características:

### Night City
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Skyline nocturno con neones azules y rosas
- **Búsqueda**: "cyberpunk city night skyline neon lights"
- **Ejemplo**: Concept art de Cyberpunk 2077

### Chiba City
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Clínicas y tecnología japonesa futurista
- **Búsqueda**: "cyberpunk japan clinic futuristic technology"
- **Ejemplo**: Ilustraciones retrofuturistas estilo ochentero

### Neo-Tokyo
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Megalópolis post-apocalíptica con autopistas
- **Búsqueda**: "akira neo tokyo cityscape futuristic"
- **Ejemplo**: Fotogramas de Akira con las autopistas

### Mega-City One
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Superciudad autoritaria y superpoblada
- **Búsqueda**: "judge dredd mega city one skyline"
- **Ejemplo**: Arte conceptual de Judge Dredd

### Delta City
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Ciudad corporativa utópica fallida
- **Búsqueda**: "robocop delta city futuristic corporate"
- **Ejemplo**: Póster clásico de RoboCop

### Olympus
- **Tamaño**: 400x600px (vertical)
- **Estilo**: Tecnópolis utópica con arquitectura griega futurista
- **Búsqueda**: "appleseed olympus futuristic city"
- **Ejemplo**: Concept art de Appleseed

## 🎨 Fuentes de Imágenes

### Gratuitas y Legales:
- **Unsplash**: Imágenes de alta calidad
- **Pexels**: Fotos libres de derechos
- **ArtStation**: Arte conceptual (verificar licencias)
- **DeviantArt**: Fanart y arte conceptual

### Búsquedas Específicas:
- "cyberpunk city background"
- "futuristic skyline concept art"
- "neon cityscape digital art"
- "sci-fi urban landscape"

## 🚀 Uso

1. **Acceder al Atlas**: Navegar a `cyberpunk-atlas.html`
2. **Explorar Ciudades**: Hacer clic en cualquier tarjeta
3. **Ver Información**: El panel inferior se actualiza automáticamente
4. **Voltear Tarjetas**: Click en la tarjeta para ver el material origen
5. **Navegación**: Usar el botón "Volver al Dashboard" para regresar

## 🔧 Personalización

### Añadir Nueva Ciudad:
1. Editar `cities.json`
2. Añadir nueva entrada con todos los campos requeridos
3. Añadir imagen correspondiente en `images/`

### Modificar Estilos:
- Editar `cyberpunk-atlas.html` para estilos globales
- Modificar componentes JS para comportamiento específico

### Cambiar Efectos:
- Ajustar animaciones CSS en las clases correspondientes
- Modificar parámetros de transición en los componentes

## 📱 Responsive

El diseño es completamente responsive y se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎵 Efectos y Animaciones

- **Partículas flotantes** en el fondo
- **Grid cyberpunk** animado
- **Efectos glow** en textos y elementos
- **Transiciones suaves** entre estados
- **Animaciones de hover** en tarjetas
- **Efectos de flip 3D** en las tarjetas

## 🔮 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y efectos visuales
- **JavaScript ES6+**: Componentes modulares
- **Fetch API**: Carga de datos JSON
- **Custom Events**: Comunicación entre componentes

---

**Desarrollado por Marc RoMa-88** 🚀

