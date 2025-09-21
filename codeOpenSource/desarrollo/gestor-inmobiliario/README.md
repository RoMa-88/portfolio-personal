# 🏠 Gestor Inmobiliario

Sistema web CRUD para gestión de propiedades inmobiliarias. Reemplaza el Excel arcaico con una base de datos estructurada, formularios dinámicos y gestión de citas.

## 🚧 Estado: En Desarrollo

## 🛠️ Tecnologías

- **PHP 8+** - Backend
- **MySQL** - Base de datos
- **MVC Pattern** - Arquitectura
- **PDO** - Acceso a datos seguro
- **HTML/CSS/JS** - Frontend

## 📋 Características en Desarrollo

### ✅ Completadas
- [x] Estructura MVC básica
- [x] Base de datos con tablas normalizadas
- [x] CRUD de propiedades
- [x] Sistema de contactos por propiedad

### 🚧 En Progreso
- [ ] Sistema de citas y agenda
- [ ] Exportación a Excel/CSV
- [ ] Validaciones avanzadas
- [ ] Interfaz de usuario mejorada

### 📅 Próximas Funcionalidades
- [ ] Búsqueda y filtros
- [ ] Edición y borrado de registros
- [ ] Sistema de usuarios
- [ ] Reportes automáticos

## 🗄️ Estructura de Base de Datos

```sql
-- Propiedades
CREATE TABLE propiedades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  direccion VARCHAR(200) NOT NULL,
  cp VARCHAR(10) NOT NULL,
  valor_mercado DECIMAL(12,2) NOT NULL,
  banos TINYINT UNSIGNED NOT NULL,
  dormitorios TINYINT UNSIGNED NOT NULL,
  terraza BOOLEAN NOT NULL DEFAULT 0,
  eficiencia CHAR(2) NULL,
  transp_publico TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contactos
CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  propiedad_id INT NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  email VARCHAR(120) NULL,
  FOREIGN KEY (propiedad_id) REFERENCES propiedades(id) ON DELETE CASCADE
);

-- Citas
CREATE TABLE citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  propiedad_id INT NOT NULL,
  fecha DATETIME NOT NULL,
  notas VARCHAR(255) NULL,
  FOREIGN KEY (propiedad_id) REFERENCES propiedades(id) ON DELETE CASCADE
);
```

## 🚀 Instalación

1. Clonar el repositorio
2. Configurar base de datos MySQL
3. Ejecutar scripts SQL de creación de tablas
4. Configurar conexión en `config/database.php`
5. Acceder via navegador

## 📝 Notas de Desarrollo

- **Comentarios en catalán** en el código
- **Prepared statements** para seguridad
- **Validaciones** en frontend y backend
- **Responsive design** para móviles

---

**Desarrollado por:** Marc Rodríguez  
**Contacto:** m4rc.roma7@gmail.com  
**GitHub:** [@RoMa-88](https://github.com/RoMa-88)
