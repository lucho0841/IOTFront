import {Component, OnInit} from '@angular/core';
import {Pet} from "../../models/pets/pet";
import {MatDialog} from "@angular/material/dialog";
import {PetFormComponent} from "./components/pet-form/pet-form.component";
import {UtilAlert} from "../../util/util-alert";
import {PetService} from "../../services/pet/pet.service";

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {
  petList!: Pet[];

  constructor(private dialog: MatDialog, private petService: PetService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PetFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.save(result);
    });
  }

  ngOnInit(): void {
    this.petService.getAllPetList().then(answer => this.petList = answer);
  }

  save(pet: Pet): void {
    if (pet.id > 0) {
      this.petService.update(pet).then(answer => {
        const index = this.petList.findIndex(pet => pet.id === answer.id);
        this.petList[index] = answer;
        UtilAlert.success({title: 'Editado correctamente'});
      });
    } else {
      this.petService.create(pet).then(answer => {
        this.petList.push(answer);
        UtilAlert.success({title: 'Creado exitoso'});
      });
    }
  }

  setPet(pet: Pet): void {
    console.log(pet);
    this.petService.setPet(pet);
    this.openDialog();
  }

  addNewPet() {
    this.petService.resetPet();
    this.openDialog();
  }
}
