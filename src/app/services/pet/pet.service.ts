import {Injectable} from '@angular/core';
import {Pet} from "../../models/pets/pet";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pet: Pet | undefined;

  constructor(private http: HttpClient) {
  }

  getPet(): Pet | undefined {
    return this.pet;
  }

  setPet(pet: Pet): void {
    this.pet = pet;
  }

  resetPet(): void {
    this.pet = undefined;
  }

  getAllPetList(): Promise<Pet[]> {
    return of(this.buildDefaultList()).toPromise();
    return this.http.get<Pet[]>(`${environment.baseUrl}/pet/all`).toPromise();
  }

  create(pet: Pet): Promise<Pet> {
    pet.id = 1;
    return of(pet).toPromise();
    return this.http.post<Pet>(`${environment.baseUrl}/pet/create`, pet).toPromise();
  }

  update(pet: Pet): Promise<Pet> {
    return of(pet).toPromise();
    return this.http.post<Pet>(`${environment.baseUrl}/pet/update`, pet).toPromise();
  }

  buildDefaultPet(): Pet {
    return {
      id: 1,
      name: 'Lucas',
      weight: '8kg',
      species: 'Perro',
      feeder: undefined
    };
  }

  buildDefaultList(): Pet[] {
    const petList = [];
    for (let i = 0; i < 10; i++) {
      petList.push({
        id: i+1,
        name: `name${i}`,
        weight: `weight${i}`,
        species: `species${i}`,
        feeder: undefined
      });
    }
    return petList;
  }

}
