#!/usr/bin/env python3
"""
Script para finalizar procesos que bloquean XAMPP
Autor: Marc Rodríguez
"""

import subprocess
import sys
import os

def kill_processes_on_ports():
    """Finaliza procesos que usan los puertos 80, 443, 3306 (Apache, MySQL)"""
    
    ports_to_check = [80, 443, 3306, 8080]
    
    print("🔍 Buscando procesos que usan puertos de XAMPP...")
    
    for port in ports_to_check:
        try:
            # Buscar procesos en el puerto específico
            result = subprocess.run(
                f'netstat -ano | findstr :{port}',
                shell=True,
                capture_output=True,
                text=True
            )
            
            if result.stdout.strip():
                print(f"\n📡 Puerto {port} en uso:")
                lines = result.stdout.strip().split('\n')
                pids = set()
                
                for line in lines:
                    if 'LISTENING' in line:
                        parts = line.split()
                        if len(parts) >= 5:
                            pid = parts[-1]
                            pids.add(pid)
                            print(f"   PID: {pid}")
                
                # Finalizar procesos
                for pid in pids:
                    try:
                        subprocess.run(f'taskkill /F /PID {pid}', shell=True, check=True)
                        print(f"   ✅ Proceso {pid} finalizado")
                    except subprocess.CalledProcessError:
                        print(f"   ❌ No se pudo finalizar proceso {pid}")
                        
        except Exception as e:
            print(f"❌ Error verificando puerto {port}: {e}")

def kill_xampp_processes():
    """Finaliza procesos específicos de XAMPP"""
    
    xampp_processes = [
        'httpd.exe',      # Apache
        'mysqld.exe',     # MySQL
        'apache.exe',     # Apache alternativo
        'mysql.exe'       # MySQL cliente
    ]
    
    print("\n🔍 Buscando procesos de XAMPP...")
    
    for process in xampp_processes:
        try:
            result = subprocess.run(
                f'tasklist /FI "IMAGENAME eq {process}"',
                shell=True,
                capture_output=True,
                text=True
            )
            
            if process in result.stdout:
                print(f"📦 Encontrado: {process}")
                subprocess.run(f'taskkill /F /IM {process}', shell=True)
                print(f"   ✅ {process} finalizado")
            else:
                print(f"ℹ️  {process} no está ejecutándose")
                
        except Exception as e:
            print(f"❌ Error con {process}: {e}")

def check_xampp_status():
    """Verifica el estado de XAMPP"""
    
    print("\n📊 Estado actual de XAMPP:")
    
    # Verificar Apache
    try:
        result = subprocess.run(
            'netstat -an | findstr :80',
            shell=True,
            capture_output=True,
            text=True
        )
        
        if result.stdout.strip():
            print("🔴 Apache: Puerto 80 en uso")
        else:
            print("🟢 Apache: Puerto 80 libre")
            
    except Exception as e:
        print(f"❌ Error verificando Apache: {e}")
    
    # Verificar MySQL
    try:
        result = subprocess.run(
            'netstat -an | findstr :3306',
            shell=True,
            capture_output=True,
            text=True
        )
        
        if result.stdout.strip():
            print("🔴 MySQL: Puerto 3306 en uso")
        else:
            print("🟢 MySQL: Puerto 3306 libre")
            
    except Exception as e:
        print(f"❌ Error verificando MySQL: {e}")

def main():
    """Función principal"""
    
    print("🚀 Script de Reparación XAMPP - Marc Rodríguez")
    print("=" * 50)
    
    # Verificar estado inicial
    check_xampp_status()
    
    # Finalizar procesos problemáticos
    kill_processes_on_ports()
    kill_xampp_processes()
    
    print("\n" + "=" * 50)
    print("✅ Script completado!")
    print("\n📝 Próximos pasos:")
    print("1. Ejecuta XAMPP Control Panel como administrador")
    print("2. Inicia Apache y MySQL")
    print("3. Si sigue fallando, reinicia tu PC")
    print("\n🌐 URLs de acceso:")
    print("   • Local: http://localhost/portfolioPersonal")
    print("   • Red: http://192.168.1.134/portfolioPersonal")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Script interrumpido por el usuario")
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        sys.exit(1)
