import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  lecturas: any[] = [];
  apiUrl: string = 'https://joyful-radiance-production.up.railway.app/lectura/obtenerLecturas';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerLecturas();
  }

  obtenerLecturas() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.lecturas = data;
        console.log(this.lecturas);
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
