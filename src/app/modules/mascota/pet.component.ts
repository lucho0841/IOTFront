import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Pet} from "../../models/pets/pet";
import {MatDialog} from "@angular/material/dialog";
import {PetFormComponent} from "./components/pet-form/pet-form.component";
import {UtilAlert} from "../../util/util-alert";
import {PetService} from "../../services/pet/pet.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-mascota',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit, AfterViewInit {
  petList: Pet[] = [];
  dataSource = new MatTableDataSource(this.petList);
  displayedColumns: string[] = ['id', 'name', 'weight', 'species', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private petService: PetService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PetFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.save(result);
    });
  }

  ngOnInit(): void {
    this.petService.getAllPetList().then(answer => {
      this.petList = answer;
      this.updateDataList();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  save(pet: Pet): void {
    const index = this.petList.findIndex(petTmp => petTmp.id === pet.id);
    if (index !== -1) {
      this.petList[index] = pet;
    } else {
      this.petList.push(pet);
    }
    this.updateDataList();
  }

  updatePet(pet: Pet): void {
    this.petService.setPet(pet);
    this.openDialog();
  }

  addNewPet() {
    this.petService.resetPet();
    this.openDialog();
  }

  removePet(petToRemove: Pet) {
    UtilAlert.warningConfirm({
      title: '🥶 Estas completamente segur@ de quitar esta mascota?',
      buttonText: 'Quitar'
    }).then(answer => {
      if (answer.isConfirmed) {
        this.petService.delete(petToRemove).then(deletedPet => {
          const index = this.petList.findIndex(pet => pet.id === deletedPet.id);
          this.petList.splice(index, 1);
          this.updateDataList();
          UtilAlert.success({title: 'Eliminado exitoso'});
        });
      }
    });
  }

  private updateDataList(): void {
    this.dataSource.data = this.petList;
  }

}
