import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pet} from "../../../../models/pets/pet";
import {PetService} from "../../../../services/pet/pet.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilAlert} from "../../../../util/util-alert";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private petService: PetService, private dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  save(): void {
    try {
      this.validateForm();
    } catch (error) {
      UtilAlert.error({title: error.message});
      return;
    }

    const pet: Pet = this.formValue;
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
    this.form = this.formBuilder.group(this.petService.getPet() || {
      id: 0,
      name: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      species: ['', [Validators.required]],
      feeder: undefined
    });
  }

  get formValue(): Pet {
    return this.form.value;
  }


}
