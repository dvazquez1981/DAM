import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonFooter
} from '@ionic/angular/standalone';
import { MedicionService, Medicion } from '../services/medicion.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonFooter
  ]
})
export class MedicionPage implements OnInit, OnDestroy {

  mediciones: Medicion[] = [];
  intervaloMediciones?: any; // referencia para poder limpiar
  valvulaAbierta?: boolean;   // estado de la válvula recibido desde la navegación

  constructor(
    private route: ActivatedRoute,
    private medicionService: MedicionService,
    private router: Router
  ) {}

  ngOnInit() {
    // Leer query params
    this.route.queryParams.subscribe(params => {
      this.valvulaAbierta = params['valvulaAbierta'] === 'true' || params['valvulaAbierta'] === '1';
      console.log('Válvula abierta?', this.valvulaAbierta);
    });

    this.cargarMediciones(); // carga inicial
    if(this.valvulaAbierta)
         this.iniciarActualizacionMediciones(5000); // refresco cada 5 segundos
 
  }

  ngOnDestroy() {
    this.detenerActualizacionMediciones(); // limpiar interval
  }

  // Cargar mediciones desde el servicio
  async cargarMediciones() {
    const id = Number(this.route.snapshot.paramMap.get('dispositivoId'));
    if (!id) return;

    try {
      const datos = await this.medicionService.getMediciones(id);
      // ordenar de más reciente a más antiguo
      this.mediciones = datos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      console.log('Mediciones cargadas:', this.mediciones);
    } catch (error) {
      console.error('Error al cargar mediciones:', error);
    }
  }

  // Iniciar actualización periódica
  iniciarActualizacionMediciones(intervaloMs: number = 5000) {
    if (this.intervaloMediciones) return; // evitar múltiples intervalos
    this.intervaloMediciones = setInterval(() => this.cargarMediciones(), intervaloMs);
  }

  // Detener actualización
  detenerActualizacionMediciones() {
    if (this.intervaloMediciones) {
      clearInterval(this.intervaloMediciones);
      this.intervaloMediciones = undefined;
    }
  }
}
