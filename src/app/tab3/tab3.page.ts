import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:false
})
export class Tab3Page implements OnInit {
  lecturas: any[] = [];
  apiUrl: string = 'https://joyful-radiance-production.up.railway.app/lectura/obtenerLecturas';
  intervalId: any;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerLecturas();

       // Configurar un intervalo para actualizar las lecturas cada 5 segundos
       this.intervalId = setInterval(() => {
        this.obtenerLecturas();
      }, 5000);
  }

  obtenerLecturas() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        // Filtramos las lecturas cuyo lugar NO sea "Luvianos"
        console.log(data);
        this.lecturas = data.filter(lectura => lectura.lugarEstacion == "San Miguel Ixtapan" && lectura.id == 10);
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
