import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Subject} from "../../model/subject";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SubjectsService} from "../../services/subjects.service";

import * as _ from "lodash";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, AfterViewInit{

  subjectData: Subject;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'curse', 'nota1','nota2','nota3','nota4', 'actions'];

  @ViewChild('subjectForm', {static: false})
  subjectForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;
  constructor(private subjectService: SubjectsService) {
    this.subjectData= {} as Subject;
    this.dataSource = new MatTableDataSource<any>();

  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.getAllSubjects();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllSubjects() {
    this.subjectService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Subject) {
    this.subjectData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.subjectForm.resetForm();
  }

  deleteItem(id: number) {
    this.subjectService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Subject) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addSubject() {
    this.subjectData.id = 0;
    this.subjectService.create(this.subjectData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateSubject() {
    this.subjectService.update(this.subjectData.id, this.subjectData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Subject) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.subjectForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateSubject();
      } else {
        console.log('about to add');
        this.addSubject();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}

