import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit, OnDestroy {
  lecturas: any[] = [];
  apiUrl: string = 'https://joyful-radiance-production.up.railway.app/lectura/obtenerLecturas';
  intervalId: any; // Variable para almacenar el ID del intervalo

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerLecturas();

    // Configurar un intervalo para actualizar las lecturas cada 5 segundos
    this.intervalId = setInterval(() => {
      this.obtenerLecturas();
    }, 5000);
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando se destruya el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  obtenerLecturas() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log(data);
        // Filtrar solo las lecturas con id 8
        this.lecturas = data.filter(lectura => lectura.id === 8);
      },
      (error) => {
        console.error('Error al obtener lecturas:', error);
      }
    );
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString();
  }
}