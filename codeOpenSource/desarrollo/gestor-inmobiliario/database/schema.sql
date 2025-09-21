-- Schema de base de datos para Gestor Inmobiliario
-- Desarrollado por: Marc Rodríguez (m4rc.roma7@gmail.com)

CREATE DATABASE IF NOT EXISTS gestor_inmobiliario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestor_inmobiliario;

-- Tabla de propiedades
CREATE TABLE propiedades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(200) NOT NULL,
    cp VARCHAR(10) NOT NULL,
    valor_mercado DECIMAL(12,2) NOT NULL,
    banos TINYINT UNSIGNED NOT NULL DEFAULT 1,
    dormitorios TINYINT UNSIGNED NOT NULL DEFAULT 1,
    terraza BOOLEAN NOT NULL DEFAULT 0,
    eficiencia CHAR(2) NULL COMMENT 'A, B, C, D, E, F, G',
    transp_publico TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cp (cp),
    INDEX idx_valor (valor_mercado)
);

-- Tabla de contactos
CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propiedad_id INT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    email VARCHAR(120) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propiedad_id) REFERENCES propiedades(id) ON DELETE CASCADE,
    INDEX idx_propiedad (propiedad_id),
    INDEX idx_telefono (telefono)
);

-- Tabla de citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    propiedad_id INT NOT NULL,
    fecha DATETIME NOT NULL,
    notas VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propiedad_id) REFERENCES propiedades(id) ON DELETE CASCADE,
    INDEX idx_propiedad (propiedad_id),
    INDEX idx_fecha (fecha)
);

-- Datos de ejemplo
INSERT INTO propiedades (direccion, cp, valor_mercado, banos, dormitorios, terraza, eficiencia, transp_publico) VALUES
('Carrer Major, 123', '08500', 250000.00, 2, 3, 1, 'C', 'Autobús línea 1, 2 y 5. Metro L1 a 10 min'),
('Avinguda de la Pau, 45', '08001', 180000.00, 1, 2, 0, 'D', 'Metro L3 directo al centro'),
('Plaça Catalunya, 7', '08002', 320000.00, 2, 4, 1, 'B', 'Centro histórico, todo el transporte público'),
('Carrer del Sol, 89', '08003', 195000.00, 1, 2, 1, 'C', 'Tranvía T4, Autobús 40 y 45');

INSERT INTO contactos (propiedad_id, nombre, telefono, email) VALUES
(1, 'Maria García López', '612345678', 'maria.garcia@email.com'),
(1, 'Joan Martínez Ruiz', '623456789', 'joan.martinez@email.com'),
(2, 'Anna Rodríguez Sánchez', '634567890', 'anna.rodriguez@email.com'),
(3, 'Pere López García', '645678901', 'pere.lopez@email.com'),
(4, 'Carmen Fernández Torres', '656789012', 'carmen.fernandez@email.com');

INSERT INTO citas (propiedad_id, fecha, notas) VALUES
(1, '2025-09-25 10:00:00', 'Primera visita - Interesado en compra'),
(1, '2025-09-28 16:30:00', 'Segunda visita - Revisar documentación'),
(2, '2025-09-26 11:00:00', 'Visita de inspección'),
(3, '2025-09-27 09:30:00', 'Visita familiar - 4 personas'),
(4, '2025-09-29 14:00:00', 'Visita técnica - Verificar instalaciones');
