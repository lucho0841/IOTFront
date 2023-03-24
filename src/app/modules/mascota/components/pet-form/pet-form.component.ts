import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Pet} from "../../../../models/pets/pet";
import {PetService} from "../../../../services/pet/pet.service";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private petService: PetService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group(this.petService.getPet() || {
      id: 0,
      name: '',
      weight: '',
      species: '',
      feeder: undefined
    });
  }

  get formValue(): Pet {
    return this.form.value;
  }


}
