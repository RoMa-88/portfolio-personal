# Mi Portafolio Personal

Un portafolio web moderno y futurista con estética tech/gamer, desarrollado con HTML5, CSS3 y JavaScript vanilla.

## 🎨 Características

- **Diseño Futurista**: Estética inspirada en interfaces de videojuegos y tecnología
- **Dark Mode por Defecto**: Tema oscuro con colores azul-violeta
- **Light Mode**: Alternativa con fondo azul claro y elementos púrpura/negro
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones Fluidas**: Transiciones y efectos visuales atractivos
- **Formulario de Contacto**: Integrado con Formspree para funcionalidad completa

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Fuentes**: Orbitron (títulos), Exo 2 (texto)
- **Iconos**: Font Awesome 6.0
- **Formularios**: Formspree
- **Hosting**: GitHub Pages

## 📁 Estructura del Proyecto

```
portfolioPersonal/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── script.js          # Funcionalidad JavaScript
├── resources/
│   └── images/
│       └── aboutMe/
│           ├── a6c44f2b-e33e-4bf8-b155-8bdef8812f97.jpeg
│           └── references/
│               └── large-thumbnail20250307-867559-17gzndn.mp4
└── README.md
```

## 🛠️ Instalación y Configuración

### 1. Configuración Local

1. **Clona o descarga el proyecto** en tu carpeta XAMPP:
   ```
   C:\xampp\htdocs\portfolioPersonal\
   ```

2. **Inicia XAMPP** y activa Apache

3. **Accede al proyecto** desde tu navegador:
   ```
   http://localhost/portfolioPersonal
   ```

### 2. Configuración del Formulario de Contacto

Para que el formulario funcione correctamente:

1. **Ve a [Formspree.io](https://formspree.io/)**
2. **Crea una cuenta gratuita**
3. **Crea un nuevo formulario**
4. **Copia tu Form ID** (algo como `xvgkqjrw`)
5. **Reemplaza `YOUR_FORM_ID`** en el archivo `index.html` línea 284:
   ```html
   <form class="contact-form" action="https://formspree.io/f/TU_FORM_ID_AQUI" method="POST">
   ```

### 3. Personalización

#### Información Personal
Edita el archivo `index.html` para personalizar:

- **Datos de contacto** (líneas 265-275)
- **Información sobre ti** (sección About)
- **Proyectos** (sección Projects)
- **Enlaces sociales** (líneas 279-291)

#### Colores y Estética
Modifica las variables CSS en `css/styles.css` (líneas 3-25):

```css
:root {
  --accent-primary: #8b5cf6;    /* Púrpura principal */
  --accent-secondary: #3b82f6;  /* Azul secundario */
  --accent-tertiary: #06b6d4;   /* Cian terciario */
}
```

## 🌐 Despliegue en GitHub Pages

### 1. Crear Repositorio en GitHub

1. **Ve a GitHub.com** y crea un nuevo repositorio
2. **Nombre sugerido**: `tu-usuario.github.io` o `portfolio-personal`
3. **Marca como público**

### 2. Subir el Código

```bash
# En la terminal, navega a tu carpeta del proyecto
cd C:\xampp\htdocs\portfolioPersonal

# Inicializa Git (si no está inicializado)
git init

# Añade todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit: Portfolio personal"

# Conecta con tu repositorio de GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Sube el código
git push -u origin main
```

### 3. Activar GitHub Pages

1. **Ve a tu repositorio en GitHub**
2. **Click en "Settings"**
3. **Scroll hasta "Pages"** en el menú lateral
4. **Source**: Selecciona "Deploy from a branch"
5. **Branch**: Selecciona "main" y "/ (root)"
6. **Click "Save"**

Tu portafolio estará disponible en:
```
https://tu-usuario.github.io/tu-repositorio
```

## 📱 Acceso desde Otros Dispositivos

### Desde tu PC de Sobremesa (misma red)

1. **Encuentra tu IP local**:
   ```cmd
   ipconfig
   ```
   Busca la dirección IPv4 (ejemplo: 192.168.1.100)

2. **Accede desde el otro dispositivo**:
   ```
   http://192.168.1.100/portfolioPersonal
   ```

### Solución de Problemas

- **Si no puedes acceder**: Verifica que el firewall de Windows permita conexiones en el puerto 80
- **Si XAMPP no inicia**: Asegúrate de que no haya otros servicios usando los puertos 80 o 443

## 🎯 Características del Diseño

### Dark Mode (Por Defecto)
- Fondo: Negro profundo (#0a0a0a)
- Acentos: Gradiente azul-violeta (#8b5cf6 → #3b82f6 → #06b6d4)
- Texto: Blanco con grises para jerarquía

### Light Mode
- Fondo: Azul claro (#e0f2fe)
- Acentos: Púrpura y negro/plateado
- Texto: Negro con grises para contraste

### Elementos Interactivos
- **Efectos hover** en todos los elementos clickeables
- **Animaciones de scroll** para revelar contenido
- **Partículas flotantes** en la sección hero
- **Cursor personalizado** con efectos de hover
- **Barras de progreso animadas** para las habilidades

## 🔧 Personalización Avanzada

### Añadir Nuevos Proyectos

Edita la sección de proyectos en `index.html`:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Tu imagen o placeholder -->
    </div>
    <div class="project-content">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción del proyecto...</p>
        <div class="project-tech">
            <span class="tech-tag">Tecnología 1</span>
            <span class="tech-tag">Tecnología 2</span>
        </div>
    </div>
</div>
```

### Modificar Habilidades

Actualiza las barras de progreso en `index.html`:

```html
<div class="skill-item">
    <span class="skill-name">Nueva Habilidad</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="85"></div>
    </div>
</div>
```

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Revisa la consola del navegador** (F12) para errores
2. **Verifica que todos los archivos estén en las carpetas correctas**
3. **Asegúrate de que XAMPP esté funcionando correctamente**

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta creando tu portafolio profesional!** 🚀
