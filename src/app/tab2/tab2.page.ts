import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone:false
})
export class Tab2Page implements OnInit {
  lecturas: any[] = [];
  apiUrl: string = 'https://joyful-radiance-production.up.railway.app/lectura/obtenerLecturas';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerLecturas();
  }

  obtenerLecturas() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log(data);
        // Filtramos solo las lecturas de "Luvianos"
        this.lecturas = data.filter(lectura => lectura.lugarEstacion === "Luvianos");
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

