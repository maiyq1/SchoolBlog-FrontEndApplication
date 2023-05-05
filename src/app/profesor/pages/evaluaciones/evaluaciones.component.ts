import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProfesorService} from "../../services/profesor.service";
import {Evaluacion} from "../../model/evaluacion";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from "lodash";

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit, AfterViewInit{
  evaluacionData: Evaluacion;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['curso', 'tipo', 'disponibilidad', 'fechaInicio', 'fechaFin'];

  @ViewChild('evaluacionForm', {static: false})
  evaluationForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private profesorService: ProfesorService) {
    this.evaluacionData = {} as Evaluacion;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllEvaluaciones();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllEvaluaciones() {
    this.profesorService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Evaluacion) {
    this.evaluacionData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.evaluationForm.resetForm();
  }

  deleteItem(id: number) {
    this.profesorService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Evaluacion) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addEvaluacion() {
    this.evaluacionData.id = 0;
    this.profesorService.create(this.evaluacionData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateEvaluacion() {
    this.profesorService.update(this.evaluacionData.id, this.evaluacionData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Evaluacion) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.evaluationForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateEvaluacion();
      } else {
        console.log('about to add');
        this.addEvaluacion();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
