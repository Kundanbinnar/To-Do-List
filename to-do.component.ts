import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../service/to-do.service'; // ✅ Ensure correct import path
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todoForm: FormGroup;
  tasks: any[] = [];
  editingTaskId: number | null = null;

  constructor(private fb: FormBuilder, private todoService: TodoService, private cdr: ChangeDetectorRef) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      date: [''],
      status: ['Pending']
    });
  }

  ngOnInit() {
    this.getTasks(); // ✅ Fetch all tasks on component load
  }

  // ✅ Add or Update Task
  onSubmit() {
    if (this.todoForm.valid) {
      if (this.editingTaskId !== null) {
        this.todoService.updateTask(this.editingTaskId, this.todoForm.value).subscribe(() => {
          this.getTasks(); // ✅ Refresh tasks immediately
          this.todoForm.reset({ status: 'Pending' });
          this.editingTaskId = null;
        });
      } else {
        this.todoService.addTask(this.todoForm.value).subscribe(() => {
          this.getTasks(); // ✅ Refresh tasks immediately
          this.todoForm.reset({ status: 'Pending' });
        });
      }
    }
  }
  





getTasks() {
  this.todoService.getTasks().subscribe((tasks: any[]) => {
    this.tasks = tasks;
    this.cdr.detectChanges(); // ✅ Forces UI to update
  });
}

  

  // ✅ Delete Task
  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  // ✅ Edit Task
  editTask(task: any) {
    this.editingTaskId = task.id;
    this.todoForm.patchValue(task);
  }
}
