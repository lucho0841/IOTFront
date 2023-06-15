import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilAlert} from "../../../../util/util-alert";
import {FeederService} from "../../../../services/feeder/feeder.service";
import {Feeder} from "../../../../models/feeder/feeder";

@Component({
  selector: 'app-feeder-form',
  templateUrl: './feeder-form.component.html',
  styleUrls: ['./feeder-form.component.scss']
})
export class FeederFormComponent implements OnInit {

  form!: FormGroup;
  disable!: boolean;

  constructor(private formBuilder: FormBuilder, private feederService: FeederService, private dialogRef: MatDialogRef<any>) {
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

    const feeder: Feeder = this.formValue;
    if (feeder.id > 0) this.update(feeder);
    else this.create(feeder);
  }

  private create(feeder: Feeder): void {
    this.feederService.create(feeder).then(answer => {
      this.sendFeeder(answer);
      UtilAlert.success({title: 'Creado exitoso'});
    });
  }

  private update(feeder: Feeder): void {
    this.feederService.update(feeder).then(answer => {
      this.sendFeeder(answer);
      UtilAlert.success({title: 'Editado correctamente'});
    });
  }

  validateForm(): void {
    if (!this.form.valid) throw new Error('Formulario inválido');
    if (this.form.pristine) throw new Error('Aún no se detectaron cambios');
  }

  sendFeeder(feeder: Feeder): void {
    this.dialogRef.close(feeder);
  }

  buildForm(): void {
    this.form = this.formBuilder.group(this.feederService.getFeeder() || {
      id: 0,
      serial: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
    if (this.feederService.getFeeder()) {
      this.disable = true;
    }
  }

  get formValue(): Feeder {
    return this.form.value;
  }

}
