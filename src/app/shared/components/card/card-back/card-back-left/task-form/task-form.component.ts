import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.styl']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this._formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
  }

}
