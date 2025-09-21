#!/usr/bin/env python3
"""
Cliente para API Meteocat - Índice Micológico Catalunya
Basado en: https://github.com/herrera-lu/meteocat-api-client

@author Marc Rodríguez
@email m4rc.roma7@gmail.com
"""

import requests
import pandas as pd
from datetime import datetime, date
import os
from typing import Dict, List, Optional
import time

class MeteocatClient:
    """Client per accedir a l'API de Meteocat"""
    
    def __init__(self, api_key: str = None):
        """
        Inicialitza el client amb la API key
        
        Args:
            api_key: Clau API de Meteocat. Si no es proporciona, 
                    s'intenta llegir de la variable d'entorn METEOCAT_API_KEY
        """
        self.api_key = api_key or os.getenv('METEOCAT_API_KEY')
        if not self.api_key:
            raise ValueError("API key requerida. Configura METEOCAT_API_KEY o passa-la com a paràmetre")
        
        self.base_url = "https://api.meteo.cat/xema/v1"
        self.headers = {
            "x-api-key": self.api_key,
            "Accept": "application/json"
        }
        
        # Estacions d'interès per l'índex micològic
        self.estacions_interes = {
            'XO': 'Vic',  # Estació principal interior
            'XL': 'El Prat de Llobregat'  # Estació secundària costera
        }
        
        # Variables meteorològiques rellevants
        self.variables_micologicas = {
            'PPT': 'Precipitació (mm)',
            'TM': 'Temperatura mitjana (°C)',
            'TX': 'Temperatura màxima (°C)',
            'TN': 'Temperatura mínima (°C)',
            'HRM': 'Humitat relativa mitjana (%)'
        }

    def _make_request(self, endpoint: str, params: Dict = None) -> Dict:
        """
        Fa una petició a l'API de Meteocat
        
        Args:
            endpoint: Endpoint de l'API
            params: Paràmetres de la petició
            
        Returns:
            Resposta JSON de l'API
        """
        url = f"{self.base_url}/{endpoint}"
        
        try:
            response = requests.get(url, headers=self.headers, params=params, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error en petició a {url}: {e}")
            raise

    def obtenir_metadades_estacions(self) -> pd.DataFrame:
        """
        Obté les metadades de totes les estacions
        
        Returns:
            DataFrame amb informació de les estacions
        """
        data = self._make_request("estacions/metadades")
        return pd.DataFrame(data)

    def obtenir_dades_diaries(self, codi_estacio: str, any: int, mes: int, dia: int) -> pd.DataFrame:
        """
        Obté les dades diàries d'una estació per a una data específica
        
        Args:
            codi_estacio: Codi de l'estació (ex: 'XO', 'XL')
            any: Any
            mes: Mes
            dia: Dia
            
        Returns:
            DataFrame amb les dades diàries
        """
        endpoint = f"estacions/mesurades/{codi_estacio}/{any:04d}/{mes:02d}/{dia:02d}"
        data = self._make_request(endpoint)
        
        if 'variables' in data:
            return pd.DataFrame(data['variables'])
        return pd.DataFrame()

    def obtenir_dades_periodo(self, codi_estacio: str, data_inici: date, data_fi: date) -> pd.DataFrame:
        """
        Obté les dades d'un període específic
        
        Args:
            codi_estacio: Codi de l'estació
            data_inici: Data d'inici
            data_fi: Data de fi
            
        Returns:
            DataFrame amb totes les dades del període
        """
        totes_dades = []
        
        current_date = data_inici
        while current_date <= data_fi:
            try:
                dades_dia = self.obtenir_dades_diaries(
                    codi_estacio, 
                    current_date.year, 
                    current_date.month, 
                    current_date.day
                )
                
                if not dades_dia.empty:
                    dades_dia['data'] = current_date
                    totes_dades.append(dades_dia)
                
                # Petita pausa per no sobrecarregar l'API
                time.sleep(0.1)
                current_date = date(current_date.year, current_date.month, current_date.day + 1)
                
            except Exception as e:
                print(f"Error obtenint dades per {current_date}: {e}")
                current_date = date(current_date.year, current_date.month, current_date.day + 1)
                continue
        
        if totes_dades:
            return pd.concat(totes_dades, ignore_index=True)
        return pd.DataFrame()

    def calcular_indice_micologico(self, df: pd.DataFrame) -> Dict:
        """
        Calcula l'índex micològic basat en les dades meteorològiques
        
        Args:
            df: DataFrame amb dades meteorològiques
            
        Returns:
            Diccionari amb l'índex i factors
        """
        if df.empty:
            return {'indice': 0, 'factors': {}}
        
        # Cercar variables rellevants
        variables_trobades = {}
        for var, desc in self.variables_micologicas.items():
            var_data = df[df['codiVariable'].str.contains(var, na=False)]
            if not var_data.empty:
                variables_trobades[var] = var_data['valor'].mean()
        
        # Càlcul de l'índex (algorisme simplificat)
        indice = 0
        factors = {}
        
        # Factor precipitació (pes: 40%)
        if 'PPT' in variables_trobades:
            precipitacio_7d = variables_trobades['PPT'] * 7  # Aproximació
            factor_ppt = min(precipitacio_7d / 20.0, 1.0)  # 20mm/7d = "ple"
            indice += 0.4 * factor_ppt
            factors['precipitacio'] = factor_ppt
        
        # Factor temperatura (pes: 30%)
        if 'TM' in variables_trobades:
            temp_mitjana = variables_trobades['TM']
            if 8 <= temp_mitjana <= 20:  # Temperatura òptima
                factor_temp = 1.0
            elif temp_mitjana < 8:
                factor_temp = max(0, temp_mitjana / 8.0)
            else:
                factor_temp = max(0, (30 - temp_mitjana) / 10.0)
            
            indice += 0.3 * factor_temp
            factors['temperatura'] = factor_temp
        
        # Factor humitat (pes: 30%)
        if 'HRM' in variables_trobades:
            humitat = variables_trobades['HRM']
            factor_humitat = min(humitat / 70.0, 1.0) if humitat > 70 else 0
            indice += 0.3 * factor_humitat
            factors['humitat'] = factor_humitat
        
        return {
            'indice': round(indice, 2),
            'factors': factors,
            'variables': variables_trobades
        }

    def generar_informe_micologico(self, codi_estacio: str, dies_enrera: int = 14) -> Dict:
        """
        Genera un informe complet de l'índex micològic
        
        Args:
            codi_estacio: Codi de l'estació
            dies_enrera: Dies cap enrere per analitzar
            
        Returns:
            Diccionari amb l'informe complet
        """
        data_fi = date.today()
        data_inici = date(data_fi.year, data_fi.month, data_fi.day - dies_enrera)
        
        # Obtenir dades
        dades = self.obtenir_dades_periodo(codi_estacio, data_inici, data_fi)
        
        if dades.empty:
            return {
                'estacio': codi_estacio,
                'nom_estacio': self.estacions_interes.get(codi_estacio, 'Desconeguda'),
                'error': 'No s\'han pogut obtenir dades'
            }
        
        # Calcular índex
        indice_result = self.calcular_indice_micologico(dades)
        
        return {
            'estacio': codi_estacio,
            'nom_estacio': self.estacions_interes.get(codi_estacio, 'Desconeguda'),
            'data_inici': data_inici.strftime('%d/%m/%Y'),
            'data_fi': data_fi.strftime('%d/%m/%Y'),
            'indice_micologico': indice_result['indice'],
            'factors': indice_result['factors'],
            'variables': indice_result['variables'],
            'interpretacio': self._interpretar_indice(indice_result['indice']),
            'dades_disponibles': len(dades)
        }

    def _interpretar_indice(self, indice: float) -> str:
        """
        Interpreta l'índex micològic
        
        Args:
            indice: Valor de l'índex (0-1)
            
        Returns:
            Interpretació textual
        """
        if indice >= 0.8:
            return "🌟 Excel·lent - Condicions molt favorables per a la recol·lecció"
        elif indice >= 0.6:
            return "✅ Bo - Condicions favorables per a la recol·lecció"
        elif indice >= 0.4:
            return "⚠️ Regular - Condicions moderades, potser algunes setes"
        elif indice >= 0.2:
            return "❌ Dolent - Condicions poc favorables"
        else:
            return "🚫 Molt dolent - Condicions desfavorables per a la recol·lecció"

# Funció principal per a proves
if __name__ == "__main__":
    # Exemple d'ús
    try:
        client = MeteocatClient()
        
        print("🍄 Índex Micològic Catalunya")
        print("=" * 50)
        
        # Analitzar estació de Vic (XO)
        informe_vic = client.generar_informe_micologico('XO')
        
        print(f"Estació: {informe_vic['nom_estacio']} ({informe_vic['estacio']})")
        print(f"Període: {informe_vic['data_inici']} - {informe_vic['data_fi']}")
        print(f"Índex Micològic: {informe_vic['indice_micologico']}/1.0")
        print(f"Interpretació: {informe_vic['interpretacio']}")
        
        if 'factors' in informe_vic:
            print("\nFactors:")
            for factor, valor in informe_vic['factors'].items():
                print(f"  {factor}: {valor:.2f}")
        
    except Exception as e:
        print(f"Error: {e}")
        print("Assegura't d'haver configurat la variable METEOCAT_API_KEY")
