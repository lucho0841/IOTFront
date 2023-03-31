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
    // return of(this.buildDefaultList()).toPromise();
    return this.http.get<Pet[]>(`${environment.baseUrl}/pet`).toPromise();
  }

  create(pet: Pet): Promise<Pet> {
    // pet.id = 10;
    // return of(pet).toPromise();
    return this.http.post<Pet>(`${environment.baseUrl}/pet`, pet).toPromise();
  }

  update(pet: Pet): Promise<Pet> {
    // return of(pet).toPromise();
    return this.http.post<Pet>(`${environment.baseUrl}/pet`, pet).toPromise();
  }

  delete(pet: Pet): Promise<Pet> {
    // return of(pet).toPromise();
    return this.http.delete<Pet>(`${environment.baseUrl}/pet/${pet.id}`).toPromise();
  }

  buildDefaultList(): Pet[] {
    const petList = [];
    for (let i = 1; i < 10; i++) {
      petList.push({
        id: i,
        name: `name${i}`,
        weight: i*1000,
        species: `species${i}`,
        feeder: undefined
      });
    }
    return petList;
  }

}
