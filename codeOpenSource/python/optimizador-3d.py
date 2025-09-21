#!/usr/bin/env python3
"""
🧱 Optimizador de Corte 3D para Bloques de Espuma
Autor: Marc Rodríguez (@RoMa-88)
Fecha: 2025

Proyecto Python para simular y optimizar la colocación de piezas dentro de un bloque cúbico de espuma,
respetando restricciones de altura y aprovechando al máximo el volumen disponible.
"""

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import random
from typing import List, Tuple, Dict
import json

class Pieza:
    """Clase para representar una pieza 3D"""
    
    def __init__(self, nombre: str, ancho: float, alto: float, profundidad: float):
        self.nombre = nombre
        self.ancho = ancho
        self.alto = alto
        self.profundidad = profundidad
        self.volumen = ancho * alto * profundidad
        self.posicion = None  # (x, y, z) cuando se coloque
        self.colocada = False
        self.color = self._generar_color()
    
    def _generar_color(self) -> Tuple[float, float, float, float]:
        """Genera un color aleatorio para la visualización"""
        return (
            random.random(),
            random.random(),
            random.random(),
            0.7
        )
    
    def rotar(self) -> 'Pieza':
        """Crea una nueva pieza con dimensiones rotadas"""
        rotaciones = [
            (self.ancho, self.alto, self.profundidad),
            (self.ancho, self.profundidad, self.alto),
            (self.alto, self.ancho, self.profundidad),
            (self.alto, self.profundidad, self.ancho),
            (self.profundidad, self.ancho, self.alto),
            (self.profundidad, self.alto, self.ancho)
        ]
        
        ancho, alto, prof = random.choice(rotaciones)
        pieza_rotada = Pieza(f"{self.nombre}_rot", ancho, alto, prof)
        pieza_rotada.color = self.color
        return pieza_rotada

class Bloque:
    """Clase para representar el bloque de espuma"""
    
    def __init__(self, ancho: float, alto: float, profundidad: float):
        self.ancho = ancho
        self.alto = alto
        self.profundidad = profundidad
        self.volumen_total = ancho * alto * profundidad
        self.volumen_ocupado = 0
        self.piezas_colocadas = []
        self.huecos = [(0, 0, 0, ancho, alto, profundidad)]  # (x, y, z, ancho, alto, prof)
    
    def puede_colocar(self, pieza: Pieza, posicion: Tuple[float, float, float]) -> bool:
        """Verifica si una pieza puede colocarse en una posición"""
        x, y, z = posicion
        
        # Verificar límites del bloque
        if (x + pieza.ancho > self.ancho or 
            y + pieza.alto > self.alto or 
            z + pieza.profundidad > self.profundidad):
            return False
        
        # Verificar límite de altura (150cm)
        if z + pieza.profundidad > 150:
            return False
        
        # Verificar colisiones con otras piezas
        for pieza_colocada in self.piezas_colocadas:
            if self._hay_colision(pieza, posicion, pieza_colocada):
                return False
        
        return True
    
    def _hay_colision(self, pieza1: Pieza, pos1: Tuple[float, float, float], 
                     pieza2: Pieza) -> bool:
        """Verifica si dos piezas se superponen"""
        x1, y1, z1 = pos1
        x2, y2, z2 = pieza2.posicion
        
        return not (x1 + pieza1.ancho <= x2 or x2 + pieza2.ancho <= x1 or
                   y1 + pieza1.alto <= y2 or y2 + pieza2.alto <= y1 or
                   z1 + pieza1.profundidad <= z2 or z2 + pieza2.profundidad <= z1)
    
    def colocar_pieza(self, pieza: Pieza, posicion: Tuple[float, float, float]) -> bool:
        """Coloca una pieza en el bloque"""
        if not self.puede_colocar(pieza, posicion):
            return False
        
        pieza.posicion = posicion
        pieza.colocada = True
        self.piezas_colocadas.append(pieza)
        self.volumen_ocupado += pieza.volumen
        
        # Actualizar huecos disponibles
        self._actualizar_huecos(pieza, posicion)
        
        return True
    
    def _actualizar_huecos(self, pieza: Pieza, posicion: Tuple[float, float, float]):
        """Actualiza la lista de huecos disponibles"""
        x, y, z = posicion
        
        # Dividir huecos existentes
        nuevos_huecos = []
        for hueco in self.huecos:
            hx, hy, hz, hancho, halto, hprof = hueco
            
            # Si el hueco se superpone con la pieza, dividirlo
            if not (x + pieza.ancho <= hx or hx + hancho <= x or
                   y + pieza.alto <= hy or hy + halto <= y or
                   z + pieza.profundidad <= hz or hz + hprof <= z):
                
                # Crear nuevos huecos alrededor de la pieza colocada
                if hx < x:
                    nuevos_huecos.append((hx, hy, hz, x - hx, halto, hprof))
                if hx + hancho > x + pieza.ancho:
                    nuevos_huecos.append((x + pieza.ancho, hy, hz, 
                                        hx + hancho - (x + pieza.ancho), halto, hprof))
                if hy < y:
                    nuevos_huecos.append((max(hx, x), hy, hz, 
                                        min(hancho, x + pieza.ancho - max(hx, x)), 
                                        y - hy, hprof))
                if hy + halto > y + pieza.alto:
                    nuevos_huecos.append((max(hx, x), y + pieza.alto, hz, 
                                        min(hancho, x + pieza.ancho - max(hx, x)), 
                                        hy + halto - (y + pieza.alto), hprof))
                if hz < z:
                    nuevos_huecos.append((max(hx, x), max(hy, y), hz, 
                                        min(hancho, x + pieza.ancho - max(hx, x)), 
                                        min(halto, y + pieza.alto - max(hy, y)), 
                                        z - hz))
                if hz + hprof > z + pieza.profundidad:
                    nuevos_huecos.append((max(hx, x), max(hy, y), z + pieza.profundidad, 
                                        min(hancho, x + pieza.ancho - max(hx, x)), 
                                        min(halto, y + pieza.alto - max(hy, y)), 
                                        hz + hprof - (z + pieza.profundidad)))
            else:
                nuevos_huecos.append(hueco)
        
        self.huecos = [h for h in nuevos_huecos if h[3] > 0 and h[4] > 0 and h[5] > 0]
    
    def calcular_eficiencia(self) -> float:
        """Calcula el porcentaje de eficiencia del bloque"""
        return (self.volumen_ocupado / self.volumen_total) * 100

class Optimizador3D:
    """Clase principal del optimizador"""
    
    def __init__(self, bloque: Bloque):
        self.bloque = bloque
        self.piezas_no_colocadas = []
    
    def optimizar(self, piezas: List[Pieza]) -> Dict:
        """Algoritmo greedy para optimizar la colocación"""
        piezas_ordenadas = sorted(piezas, key=lambda p: p.volumen, reverse=True)
        
        for pieza in piezas_ordenadas:
            colocada = False
            
            # Intentar diferentes rotaciones
            for _ in range(6):
                pieza_rotada = pieza.rotar()
                
                # Buscar en huecos disponibles
                for hueco in self.bloque.huecos:
                    hx, hy, hz, hancho, halto, hprof = hueco
                    
                    if (pieza_rotada.ancho <= hancho and 
                        pieza_rotada.alto <= halto and 
                        pieza_rotada.profundidad <= hprof):
                        
                        if self.bloque.colocar_pieza(pieza_rotada, (hx, hy, hz)):
                            colocada = True
                            break
                
                if colocada:
                    break
            
            if not colocada:
                self.piezas_no_colocadas.append(pieza)
        
        return self._generar_reporte()
    
    def _generar_reporte(self) -> Dict:
        """Genera un reporte de la optimización"""
        return {
            'piezas_colocadas': len(self.bloque.piezas_colocadas),
            'piezas_no_colocadas': len(self.piezas_no_colocadas),
            'eficiencia': self.bloque.calcular_eficiencia(),
            'volumen_ocupado': self.bloque.volumen_ocupado,
            'volumen_total': self.bloque.volumen_total
        }
    
    def visualizar(self):
        """Crea una visualización 3D del resultado"""
        fig = plt.figure(figsize=(12, 8))
        ax = fig.add_subplot(111, projection='3d')
        
        # Dibujar el bloque
        ax.bar3d(0, 0, 0, self.bloque.ancho, self.bloque.alto, self.bloque.profundidad,
                alpha=0.1, color='gray', edgecolor='black')
        
        # Dibujar las piezas colocadas
        for pieza in self.bloque.piezas_colocadas:
            x, y, z = pieza.posicion
            ax.bar3d(x, y, z, pieza.ancho, pieza.alto, pieza.profundidad,
                    alpha=0.8, color=pieza.color, edgecolor='black')
            
            # Etiqueta de la pieza
            ax.text(x + pieza.ancho/2, y + pieza.alto/2, z + pieza.profundidad/2,
                   pieza.nombre, fontsize=8, ha='center')
        
        ax.set_xlabel('Ancho (cm)')
        ax.set_ylabel('Alto (cm)')
        ax.set_zlabel('Profundidad (cm)')
        ax.set_title('🧱 Optimización de Corte 3D - Resultado')
        
        plt.tight_layout()
        plt.show()

def cargar_piezas_ejemplo() -> List[Pieza]:
    """Carga un conjunto de piezas de ejemplo"""
    piezas = [
        Pieza("Pieza_A", 20, 15, 10),
        Pieza("Pieza_B", 25, 20, 15),
        Pieza("Pieza_C", 30, 25, 20),
        Pieza("Pieza_D", 35, 30, 25),
        Pieza("Pieza_E", 40, 35, 30),
        Pieza("Pieza_F", 45, 40, 35),
        Pieza("Pieza_G", 50, 45, 40),
        Pieza("Pieza_H", 15, 12, 8),
        Pieza("Pieza_I", 18, 14, 9),
        Pieza("Pieza_J", 22, 16, 11),
    ]
    
    # Duplicar algunas piezas para crear pares
    piezas.extend([
        Pieza("Pieza_A2", 20, 15, 10),
        Pieza("Pieza_B2", 25, 20, 15),
        Pieza("Pieza_C2", 30, 25, 20),
    ])
    
    return piezas

def main():
    """Función principal"""
    print("🧱 Optimizador de Corte 3D para Bloques de Espuma")
    print("=" * 50)
    print("Autor: Marc Rodríguez (@RoMa-88)")
    print()
    
    # Crear bloque de ejemplo (118x200x180 cm)
    bloque = Bloque(200, 118, 180)
    print(f"📦 Bloque creado: {bloque.ancho}x{bloque.alto}x{bloque.profundidad} cm")
    print(f"📊 Volumen total: {bloque.volumen_total:,.0f} cm³")
    print()
    
    # Cargar piezas
    piezas = cargar_piezas_ejemplo()
    print(f"🧩 Piezas a optimizar: {len(piezas)}")
    
    # Mostrar piezas
    print("\n📋 Lista de piezas:")
    for pieza in piezas:
        print(f"  • {pieza.nombre}: {pieza.ancho}x{pieza.alto}x{pieza.profundidad} cm "
              f"(vol: {pieza.volumen:,.0f} cm³)")
    
    print("\n🚀 Iniciando optimización...")
    
    # Optimizar
    optimizador = Optimizador3D(bloque)
    resultado = optimizador.optimizar(piezas)
    
    # Mostrar resultados
    print("\n📊 RESULTADOS DE LA OPTIMIZACIÓN")
    print("=" * 40)
    print(f"✅ Piezas colocadas: {resultado['piezas_colocadas']}")
    print(f"❌ Piezas no colocadas: {resultado['piezas_no_colocadas']}")
    print(f"📈 Eficiencia: {resultado['eficiencia']:.1f}%")
    print(f"📦 Volumen ocupado: {resultado['volumen_ocupado']:,.0f} cm³")
    print(f"📦 Volumen total: {resultado['volumen_total']:,.0f} cm³")
    
    # Mostrar piezas no colocadas
    if optimizador.piezas_no_colocadas:
        print("\n❌ Piezas que no pudieron colocarse:")
        for pieza in optimizador.piezas_no_colocadas:
            print(f"  • {pieza.nombre}: {pieza.ancho}x{pieza.alto}x{pieza.profundidad} cm")
    
    # Visualizar
    print("\n🎨 Generando visualización 3D...")
    optimizador.visualizar()
    
    print("\n✅ Optimización completada!")
    print("💡 Mejoras futuras: algoritmos genéticos, backtracking, etc.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Optimización interrumpida por el usuario")
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        print("💡 Asegúrate de tener matplotlib instalado: pip install matplotlib")
