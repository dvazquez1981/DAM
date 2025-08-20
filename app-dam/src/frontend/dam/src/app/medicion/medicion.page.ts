import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
} from '@ionic/angular/standalone'; // <-- asegúrate de incluirlos todos
import { Router } from '@angular/router';
import { MedicionService, Medicion} from '../services/medicion.service';


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
export class MedicionPage implements OnInit {
    mediciones: any[] = []; // inicializamos vacío



  constructor( private route: ActivatedRoute,
    private  medicionService:  MedicionService, private router: Router) {}

  async ngOnInit() {

     
    const id = Number(this.route.snapshot.paramMap.get('dispositivoId'));
    if (!id) return;
    try {
      this.mediciones = await this.medicionService.getMediciones(id);
      console.log('Mediciones:', this.mediciones);
      
    }
    catch (error) {
    console.error('Error al cargar dispositivos:', error);
    }
  }

  }



