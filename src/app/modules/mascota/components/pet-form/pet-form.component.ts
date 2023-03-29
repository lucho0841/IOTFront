import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pet} from "../../../../models/pets/pet";
import {PetService} from "../../../../services/pet/pet.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilAlert} from "../../../../util/util-alert";
import {Feeder} from "../../../../models/feeder/feeder";
import {FeederService} from "../../../../services/feeder/feeder.service";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  form!: FormGroup;
  feederList!: Feeder[];

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private dialogRef: MatDialogRef<any>,
    private feederService: FeederService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.feederService.getAllFeederList().then(answer => {
      this.feederList = answer;
      this.buildForm();
    });
  }

  save(): void {
    try {
      this.validateForm();
    } catch (error) {
      UtilAlert.error({title: error.message});
      return;
    }

    const pet: Pet = this.buildPet();
    if (pet.id > 0) this.update(pet);
    else this.create(pet);
  }

  private create(pet: Pet): void {
    this.petService.create(pet).then(answer => {
      this.sendPet(answer);
      UtilAlert.success({title: 'Creado exitoso'});
    });
  }

  private update(pet: Pet): void {
    console.log(pet);
    this.petService.update(pet).then(answer => {
      this.sendPet(answer);
      UtilAlert.success({title: 'Editado correctamente'});
    });
  }

  validateForm(): void {
    if (!this.form.valid) throw new Error('Formulario inválido');
    if (this.form.pristine) throw new Error('Aún no se detectaron cambios');
  }

  sendPet(pet: Pet): void {
    this.dialogRef.close(pet);
  }

  buildForm(): void {
    const pet = this.petService.getPet();
    this.form = this.formBuilder.group(pet ? {
      id: [pet.id, [Validators.required]],
      name: [pet.name, [Validators.required]],
      weight: [pet.weight, [Validators.required]],
      species: [pet.species, [Validators.required]],
      feederId: pet.feeder?.id
    } : {
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      species: ['', [Validators.required]],
      feederId: undefined
    });
  }

  private buildPet(): Pet {
    return {
      ...this.form.value,
      feeder: this.feederList.find(feeder => feeder.id === this.form.value.feederId)
    };
  }

}
