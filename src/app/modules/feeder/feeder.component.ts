import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Feeder} from "../../models/feeder/feeder";
import {MatDialog} from "@angular/material/dialog";
import {FeederService} from "../../services/feeder/feeder.service";
import {MatSort} from "@angular/material/sort";
import {UtilAlert} from "../../util/util-alert";
import {FeederFormComponent} from "./components/feeder-form/feeder-form.component";

@Component({
  selector: 'app-feeder',
  templateUrl: './feeder.component.html',
  styleUrls: ['./feeder.component.scss']
})
export class FeederComponent implements OnInit, AfterViewInit {
  feederList: Feeder[] = [];
  dataSource = new MatTableDataSource(this.feederList);
  displayedColumns: string[] = ['id', 'serial', 'name', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private feederService: FeederService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FeederFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.save(result);
    });
  }

  ngOnInit(): void {
    this.feederService.getAllFeederList().then(answer => {
      this.feederList = answer;
      this.updateDataList();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  save(feeder: Feeder): void {
    const index: number = this.feederList.findIndex(feederTmp => feederTmp.id === feeder.id);
    if (index !== -1) {
      this.feederList[index] = feeder;
    } else {
      this.feederList.push(feeder);
    }
    this.updateDataList();
  }

  addNewFeeder() {
    this.feederService.resetFeeder();
    this.openDialog();
  }

  updateFeeder(feeder: Feeder) {
    this.feederService.setFeeder(feeder);
    this.openDialog();
  }

  removeFeeder(feederToRemove: Feeder) {
    UtilAlert.warningConfirm({
      title: '🥶 Estas completamente segur@ de quitar este alimentador?',
      buttonText: 'Quitar'
    }).then(answer => {
      if (answer.isConfirmed) {
        this.feederService.delete(feederToRemove).then(deletedFeeder => {
          const index = this.feederList.findIndex(feeder => feeder.id === deletedFeeder.id);
          this.feederList.splice(index, 1);
          this.updateDataList();
          UtilAlert.success({title: 'Eliminado exitoso'});
        });
      }
    });
  }

  private updateDataList(): void {
    this.dataSource.data = this.feederList;
  }
}
