#!/usr/bin/env python3
"""
Demo del Índex Micològic Catalunya
Utilitza el client de Meteocat per mostrar funcionament

@author Marc Rodríguez
@email m4rc.roma7@gmail.com
"""

import os
import sys
from datetime import date, timedelta
import matplotlib.pyplot as plt
import pandas as pd

# Afegir src al path per importar el client
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from meteocat_client import MeteocatClient

def mostrar_demo():
    """Mostra una demostració del funcionament"""
    
    print("🍄 Índex Micològic Catalunya - Demo")
    print("=" * 60)
    
    # Verificar API key
    api_key = os.getenv('METEOCAT_API_KEY')
    if not api_key:
        print("❌ Error: No s'ha configurat METEOCAT_API_KEY")
        print("\nPer configurar:")
        print("1. Registra't a https://www.meteo.cat/")
        print("2. Demana API key a https://apidocs.meteocat.gencat.cat/")
        print("3. Configura: export METEOCAT_API_KEY='tu_api_key'")
        return
    
    try:
        # Inicialitzar client
        client = MeteocatClient()
        print("✅ Client Meteocat inicialitzat correctament")
        
        # Analitzar estacions d'interès
        estacions = ['XO', 'XL']  # Vic i El Prat
        
        print(f"\n📊 Anàlisi per {len(estacions)} estacions:")
        print("-" * 40)
        
        resultats = []
        
        for estacio in estacions:
            print(f"\n🔍 Analitzant estació {estacio}...")
            
            # Generar informe
            informe = client.generar_informe_micologico(estacio, dies_enrera=14)
            
            if 'error' in informe:
                print(f"❌ Error: {informe['error']}")
                continue
            
            # Mostrar resultats
            print(f"   Estació: {informe['nom_estacio']}")
            print(f"   Període: {informe['data_inici']} - {informe['data_fi']}")
            print(f"   Índex: {informe['indice_micologico']}/1.0")
            print(f"   Interpretació: {informe['interpretacio']}")
            
            if 'factors' in informe and informe['factors']:
                print("   Factors:")
                for factor, valor in informe['factors'].items():
                    print(f"     {factor}: {valor:.2f}")
            
            resultats.append(informe)
        
        # Comparativa
        if len(resultats) > 1:
            print(f"\n📈 Comparativa d'estacions:")
            print("-" * 30)
            
            for resultat in resultats:
                indice = resultat['indice_micologico']
                nom = resultat['nom_estacio']
                
                # Crear barra visual
                barra = "█" * int(indice * 20) + "░" * (20 - int(indice * 20))
                print(f"{nom:20} {barra} {indice:.2f}")
        
        # Recomanacions
        print(f"\n💡 Recomanacions:")
        print("-" * 20)
        
        millor_estacio = max(resultats, key=lambda x: x['indice_micologico'])
        if millor_estacio['indice_micologico'] > 0.6:
            print(f"✅ Millor zona: {millor_estacio['nom_estacio']}")
            print("   Condicions favorables per a la recol·lecció")
        else:
            print("⚠️ Condicions generals poc favorables")
            print("   Espera millor temps o cerca zones més humides")
        
        print(f"\n📚 Documentació:")
        print("   - Client basat en: https://github.com/herrera-lu/meteocat-api-client")
        print("   - API Meteocat: https://apidocs.meteocat.gencat.cat/")
        
    except Exception as e:
        print(f"❌ Error durant l'execució: {e}")
        print("\nPossibles causes:")
        print("- API key incorrecta o expirada")
        print("- Problemes de connexió")
        print("- Límits d'API excedits")

def crear_grafic_demo():
    """Crea un gràfic de demostració"""
    
    # Dades de demostració
    dates = pd.date_range(start='2025-09-01', end='2025-09-21', freq='D')
    
    # Simulació d'índex micològic
    import numpy as np
    np.random.seed(42)
    
    indices = []
    for i in range(len(dates)):
        # Simulació basada en patrones estacionals
        base = 0.3 + 0.2 * np.sin(i * 0.3)  # Patró estacional
        noise = np.random.normal(0, 0.1)     # Soroll aleatori
        indice = max(0, min(1, base + noise))  # Limitar entre 0 i 1
        indices.append(indice)
    
    # Crear gràfic
    plt.figure(figsize=(12, 6))
    plt.plot(dates, indices, 'o-', color='#f59e0b', linewidth=2, markersize=6)
    plt.fill_between(dates, indices, alpha=0.3, color='#f59e0b')
    
    plt.title('🍄 Índex Micològic Catalunya - Demo (Setembre 2025)', 
              fontsize=16, fontweight='bold', color='#f59e0b')
    plt.xlabel('Data', fontsize=12)
    plt.ylabel('Índex Micològic (0-1)', fontsize=12)
    
    # Línies de referència
    plt.axhline(y=0.8, color='green', linestyle='--', alpha=0.7, label='Excel·lent')
    plt.axhline(y=0.6, color='orange', linestyle='--', alpha=0.7, label='Bo')
    plt.axhline(y=0.4, color='red', linestyle='--', alpha=0.7, label='Regular')
    
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    # Guardar gràfic
    output_path = os.path.join(os.path.dirname(__file__), 'grafic_demo.png')
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"📊 Gràfic guardat a: {output_path}")
    
    plt.show()

if __name__ == "__main__":
    # Executar demo
    mostrar_demo()
    
    # Crear gràfic de demostració
    print(f"\n🎨 Creant gràfic de demostració...")
    try:
        crear_grafic_demo()
    except ImportError:
        print("⚠️ Matplotlib no disponible per al gràfic")
        print("Instal·la amb: pip install matplotlib")
