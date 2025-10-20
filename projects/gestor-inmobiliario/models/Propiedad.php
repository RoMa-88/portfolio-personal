<?php
/**
 * Modelo Propiedad - Gestor Inmobiliario
 * 
 * @author Marc Rodríguez
 * @email m4rc.roma7@gmail.com
 */

class Propiedad {
    private $conn;
    private $table_name = "propiedades";

    public $id;
    public $direccion;
    public $cp;
    public $valor_mercado;
    public $banos;
    public $dormitorios;
    public $terraza;
    public $eficiencia;
    public $transp_publico;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Llegir totes les propietats
     */
    public function read() {
        $query = "SELECT p.*, 
                         GROUP_CONCAT(c.nombre SEPARATOR ', ') as contactos,
                         COUNT(citas.id) as num_citas
                  FROM " . $this->table_name . " p
                  LEFT JOIN contactos c ON p.id = c.propiedad_id
                  LEFT JOIN citas ON p.id = citas.propiedad_id
                  GROUP BY p.id
                  ORDER BY p.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    /**
     * Llegir una propietat per ID
     */
    public function readOne() {
        $query = "SELECT p.*, 
                         GROUP_CONCAT(CONCAT(c.nombre, ' (', c.telefono, ')') SEPARATOR '; ') as contactos,
                         GROUP_CONCAT(CONCAT(DATE_FORMAT(citas.fecha, '%d/%m/%Y %H:%i'), ' - ', citas.notas) SEPARATOR '; ') as citas_info
                  FROM " . $this->table_name . " p
                  LEFT JOIN contactos c ON p.id = c.propiedad_id
                  LEFT JOIN citas ON p.id = citas.propiedad_id
                  WHERE p.id = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->direccion = $row['direccion'];
            $this->cp = $row['cp'];
            $this->valor_mercado = $row['valor_mercado'];
            $this->banos = $row['banos'];
            $this->dormitorios = $row['dormitorios'];
            $this->terraza = $row['terraza'];
            $this->eficiencia = $row['eficiencia'];
            $this->transp_publico = $row['transp_publico'];
            $this->created_at = $row['created_at'];
        }
    }

    /**
     * Crear nova propietat
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET direccion=:direccion, cp=:cp, valor_mercado=:valor_mercado,
                      banos=:banos, dormitorios=:dormitorios, terraza=:terraza,
                      eficiencia=:eficiencia, transp_publico=:transp_publico";

        $stmt = $this->conn->prepare($query);

        // Netejar dades
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->cp = htmlspecialchars(strip_tags($this->cp));
        $this->valor_mercado = htmlspecialchars(strip_tags($this->valor_mercado));
        $this->banos = htmlspecialchars(strip_tags($this->banos));
        $this->dormitorios = htmlspecialchars(strip_tags($this->dormitorios));
        $this->terraza = $this->terraza ? 1 : 0;
        $this->eficiencia = htmlspecialchars(strip_tags($this->eficiencia));
        $this->transp_publico = htmlspecialchars(strip_tags($this->transp_publico));

        // Bind parameters
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':cp', $this->cp);
        $stmt->bindParam(':valor_mercado', $this->valor_mercado);
        $stmt->bindParam(':banos', $this->banos);
        $stmt->bindParam(':dormitorios', $this->dormitorios);
        $stmt->bindParam(':terraza', $this->terraza);
        $stmt->bindParam(':eficiencia', $this->eficiencia);
        $stmt->bindParam(':transp_publico', $this->transp_publico);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    /**
     * Actualitzar propietat
     */
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET direccion=:direccion, cp=:cp, valor_mercado=:valor_mercado,
                      banos=:banos, dormitorios=:dormitorios, terraza=:terraza,
                      eficiencia=:eficiencia, transp_publico=:transp_publico
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Netejar dades
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->cp = htmlspecialchars(strip_tags($this->cp));
        $this->valor_mercado = htmlspecialchars(strip_tags($this->valor_mercado));
        $this->banos = htmlspecialchars(strip_tags($this->banos));
        $this->dormitorios = htmlspecialchars(strip_tags($this->dormitorios));
        $this->terraza = $this->terraza ? 1 : 0;
        $this->eficiencia = htmlspecialchars(strip_tags($this->eficiencia));
        $this->transp_publico = htmlspecialchars(strip_tags($this->transp_publico));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind parameters
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':cp', $this->cp);
        $stmt->bindParam(':valor_mercado', $this->valor_mercado);
        $stmt->bindParam(':banos', $this->banos);
        $stmt->bindParam(':dormitorios', $this->dormitorios);
        $stmt->bindParam(':terraza', $this->terraza);
        $stmt->bindParam(':eficiencia', $this->eficiencia);
        $stmt->bindParam(':transp_publico', $this->transp_publico);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    /**
     * Eliminar propietat
     */
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
