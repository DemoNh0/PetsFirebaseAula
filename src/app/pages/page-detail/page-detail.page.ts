import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Pet } from 'src/app/services/data';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
  standalone: false,
})
export class PageDetailPage implements OnInit {

  //
  //
  pet: Pet = {
    name: '',
    species: '',
    race:'',
    age:'',
    obs:'',
  };
  //
  petId: string | null = null;
  //
  isNewPet = true;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router,
    private loadingController: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');
    //
    if (this.petId) {
      //
      this.isNewPet = false;
      //
      this.loadpet();
    }
  }
  async loadpet() {
    //
    const loading = await this.loadingController.create({
      message: 'Carregando pet...'
    });
    //
    await loading.present();
    //
    //
    this.dataService.getPet(this.petId!).subscribe(res => {
      //
      loading.dismiss();
      //
      if(res) {
        //
        this.pet = res;
      } else {
        //
        this.presentToast('Pet não encontrado!', 'danger');
        //
        this.router.navigateByUrl('/home');
      }
    }, err => { //
      //
      loading.dismiss();
      //
      this.presentToast('Erro ao carregar pet.', 'danger');
      //
      this.router.navigateByUrl('/home');
    });
  }
  async savePet() {
    //
    const loading = await this.loadingController.create({
      message: 'Salvando pet...'
    });
    //
    await loading.present();

    //
    if (this.isNewPet) {
      //
      this.dataService.addPet(this.pet).then(() => {
        //
        loading.dismiss();
        //
        this.presentToast('pet adicionado com sucesso!', 'success');
        //
        this.router.navigateByUrl('/home');
      }, err => {//
        //
        loading.dismiss();
        //
        this.presentToast('Erro ao adicionar pet.', 'danger');
      });
    } else { //
      //
      this.dataService.updatePet(this.pet).then(() => {
        //
        loading.dismiss();
        //
        this.presentToast('pet atualizado com sucesso!', 'success');
        //
        this.router.navigateByUrl('/home');
      }, err => { //
        //
        loading.dismiss();
        //
        this.presentToast('Erro ao atualizar pet.', 'danger');
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
