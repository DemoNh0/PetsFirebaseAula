import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Cuidador } from 'src/app/services/data';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuidador-page',
  templateUrl: './cuidador-page.page.html',
  styleUrls: ['./cuidador-page.page.scss'],
})
export class CuidadorPagePage implements OnInit {

  //
  //
  cuidador: Cuidador = {
    name: '',
    species: '',
    race:'',
    age:'',
    obs:'',
  };
  //
  cuidador: string | null = null;
  //
  isNewCuidador = true;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router,
    private loadingController: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
    this.cuidador = this.route.snapshot.paramMap.get('id');
    //
    if (this.cuidador) {
      //
      this.isNewCuidador = false;
      //
      this.loadCuidador();
    }
  }
  async loadCuidador() {
    //
    const loading = await this.loadingController.create({
      message: 'Carregando Cuidador...'
    });
    //
    await loading.present();
    //
    //
    this.dataService.getCuidador(this.cuidador!).subscribe(res => {
      //
      loading.dismiss();
      //
      if(res) {
        //
        this.cuidador = res;
      } else {
        //
        this.presentToast('Cuidador não encontrado!', 'danger');
        //
        this.router.navigateByUrl('/home');
      }
    }, err => { //
      //
      loading.dismiss();
      //
      this.presentToast('Erro ao carregar Cuidador.', 'danger');
      //
      this.router.navigateByUrl('/home');
    });
  }
  async saveCuidador() {
    //
    const loading = await this.loadingController.create({
      message: 'Salvando Cuidador...'
    });
    //
    await loading.present();

    //
    if (this.isNewcuidador) {
      //
      this.dataService.addCuidador(this.cuidador).then(() => {
        //
        loading.dismiss();
        //
        this.presentToast('Cuidador adicionado com sucesso!', 'success');
        //
        this.router.navigateByUrl('/home');
      }, err => {//
        //
        loading.dismiss();
        //
        this.presentToast('Erro ao adicionar Cuidador.', 'danger');
      });
    } else { //
      //
      this.dataService.updateCuidador(this.Cuidador).then(() => {
        //
        loading.dismiss();
        //
        this.presentToast('Cuidador atualizado com sucesso!', 'success');
        //
        this.router.navigateByUrl('/home');
      }, err => { //
        //
        loading.dismiss();
        //
        this.presentToast('Erro ao atualizar Cuidador.', 'danger');
      });
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    //
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    //
    toast.present();
  }
}

