import { Component } from '@angular/core';

import { DataService, Item } from '../services/data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  items: Item[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.dataService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  addItem() {
    this.router.navigateByUrl('/page-detail');
  }

  edititem(item: Item) {
    this.router.navigateByUrl(`/page-detail/${item.id}`);
  }

  async deleteItem(id: string) {
    const alert = await this.alertController.create({
      header: 'Confimar exclusão',
      message: 'Tem erteza que deseja excluir este item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deleteItem(id);
          },
        },
      ],
    });
    await alert.present();
  }

}
