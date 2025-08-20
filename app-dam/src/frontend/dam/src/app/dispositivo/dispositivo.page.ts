import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel,
  IonButton 
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService, Dispositivo } from '../services/dispositivo.service';
import { ElectrovalvulaService, Electrovalvula } from '../services/electrovalvula.service';
import { MedicionService, Medicion } from '../services/medicion.service';
import { LogRiegoService, LogRiego } from '../services/log-riego.service';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})


export class DispositivoPage implements OnInit {
  dispositivo?: Dispositivo;
  electrovalvula?: Electrovalvula;
  ultimaMedicion?: Medicion;
  logsRiego: LogRiego[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService,
    private electrovalvulaService: ElectrovalvulaService,
    private medicionService: MedicionService,
    private logRiegoService: LogRiegoService



  ) {}


  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('dispositivoId'));
    if (!id) return;
    try {
        this.dispositivo = await this.dispositivoService.getDispositivo(id);
        console.log('Dispositivo:', this.dispositivo);
 
        if (this.dispositivo?.electrovalvulaId) {
            const electroId = Number(this.dispositivo.electrovalvulaId);
          
         this.electrovalvula = await this.electrovalvulaService.getElectrovalvula(electroId);
         console.log('Electrovalvula:', this.electrovalvula);

        //Obtener última medición
        this.ultimaMedicion = await this.medicionService.getUltimaMedicion(id);
        console.log('Última medición:', this.ultimaMedicion);
        //obtengo el log_riego
        this.logsRiego = await this.logRiegoService.getLogs(electroId);
        console.log('Logs de riego:', this.logsRiego);
        }
      } catch (error) {
        console.error('Error al obtener el dispositivo:', error);
      }
    }
   
  //Abro electroválvula
  async abrirValvula() {
    if (!this.electrovalvula) return;

    try {
      const actualizado = await this.logRiegoService.updateApertura(
        this.logsRiego[this.logsRiego.length - 1].logRiegoId, this.electrovalvula.electrovalvulaId, // log
        1
      );
      console.log('Válvula abierta:', actualizado);
      this.logsRiego.push(actualizado); // agregar al historial
    } catch (err) {
      console.error('Error al abrir válvula:', err);
    }
  }

  //Cerrar electroválvula
  async cerrarValvula() {
    if (!this.electrovalvula) return;

    try {
      const actualizado = await this.logRiegoService.updateApertura(
        this.logsRiego[this.logsRiego.length - 1].logRiegoId,this.electrovalvula.electrovalvulaId, // último log
        0
      );
      console.log('Válvula cerrada:', actualizado);
      this.logsRiego.push(actualizado); // agregar al historial
    } catch (err) {
      console.error('Error al cerrar válvula:', err);
    }
  }


  }
