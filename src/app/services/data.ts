import { Injectable } from '@angular/core';

//
import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@angular/fire/firestore'
import { Observable } from 'rxjs';

//
export interface Pet {
  id?: string;
  name: string;
  species: string;
  race: string;
  age: string;
  obs: string;
  createdAt?: number;
}

export interface Cuidador {
  id?: string;
  name: string;
  phone: string;
  experience: number;
  specialties: string;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {
  }

  //
  getPets(): Observable<Pet[]> {
    //
    const petsCollectionRef = collection(this.firestore, 'pets');
    //
    const q = query(petsCollectionRef, orderBy('createdAt', 'desc'));
    //
    return collectionData(q, { idField: 'id' }) as Observable<Pet[]>;
  }

  //
  getPet(id: string): Observable<Pet | undefined> {
    //
    const petDocRef = doc(this.firestore, `pets/${id}`);
    //
    return docData(petDocRef, { idField: 'id' }) as Observable<Pet | undefined>;
  }

  //
  addPet(pets: Pet) {
    const petsCollectionRef = collection(this.firestore, 'pets');
    //
    return addDoc(petsCollectionRef, { ...pets, createdAt: Date.now() });
  }

  //
  updatePet(pets: Pet) {
    //
    const petDocRef = doc(this.firestore, `pets/${pets.id}`);
    //
    return updateDoc(petDocRef, { name: pets.name, species: pets.species, race: pets.race, age: pets.age, obs: pets.obs });
  }

  //
  deletePet(id: string) {
    //
    const petDocRef = doc(this.firestore, `pets/${id}`);
    //
    return deleteDoc(petDocRef);
  }


// Cuidador

  getCuidadores(): Observable<Cuidador[]> {
    //
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    //
    const q = query(cuidadoresCollectionRef, orderBy('createdAt', 'desc'));
    //
    return collectionData(q, { idField: 'id' }) as Observable<Cuidador[]>;
  }

  //
  getCuidador(id: string): Observable<Cuidador | undefined> {
    //
    const cuidadoresCollectionRef = doc(this.firestore, `cuidadores/${id}`);
    //
    return docData(cuidadoresCollectionRef, { idField: 'id' }) as Observable<Cuidador | undefined>;
  }

  //
  addCuidador(cuidador: Cuidador) {
    const itemsCollectionRef = collection(this.firestore, 'cuidadores');
    //
    return addDoc(itemsCollectionRef, { ...cuidador, createdAt: Date.now() });
  }

  //
  updateCuidador(cuidador: Cuidador) {
    //
    const cuidadorDocRef = doc(this.firestore, `items/${cuidador.id}`);
    //
    return updateDoc(cuidadorDocRef, { name: cuidador.name, phone: cuidador.phone, experience: cuidador.experience, specialties: cuidador.specialties });
  }

  //
  deleteCuidador(id: string) {
    //
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    //
    return deleteDoc(cuidadorDocRef);
  }

}

