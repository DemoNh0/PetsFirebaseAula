import { Component } from '@angular/core';

import { DataService, Pet } from '../services/data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  pets: Pet[] = [];
  cuidadores: Cuidador[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.dataService.getPets().subscribe(res => {
      this.pets = res;
    });
        this.dataService.getCuidador().subscribe(res => {
      this.cuidador = res;
    });
  }


//Pet

  addPet() {
    this.router.navigateByUrl('/page-detail');
  }

  editPet(item: Pet) {
    this.router.navigateByUrl(`/page-detail/${pet.id}`);
  }

    async deletePet(id: string) {
    const alert = await this.alertController.create({
      header: 'Confimar exclusão',
      message: 'Tem erteza que deseja excluir este Pet?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deletePet(id);
          },
        },
      ],
    });
    await alert.present();
  }


//Cuidador

    addCuidador() {
    this.router.navigateByUrl('/cuidador-page');
  }

  edititem(item: Pet) {
    this.router.navigateByUrl(`/cuidador-page/${cuidador.id}`);
  }

  async deleteCuidador(id: string) {
    const alert = await this.alertController.create({
      header: 'Confimar exclusão',
      message: 'Tem erteza que deseja excluir este Cuidador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deleteCuidador(id);
          },
        },
      ],
    });
    await alert.present();
  }

}
