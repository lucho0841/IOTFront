import {Injectable} from '@angular/core';
import {Pet} from "../../models/pets/pet";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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
    return this.http.get<Pet[]>(`${environment.baseUrl}/api/pet`).toPromise();
  }

  create(pet: Pet): Promise<Pet> {
    return this.http.post<Pet>(`${environment.baseUrl}/api/pet`, pet).toPromise();
  }

  update(pet: Pet): Promise<Pet> {
    return this.http.put<Pet>(`${environment.baseUrl}/api/pet`, pet).toPromise();
  }

  delete(pet: Pet): Promise<Pet> {
    return this.http.delete<Pet>(`${environment.baseUrl}/api/pet/${pet.id}`).toPromise();
  }

}
