import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import{ FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ITask } from '../task/task.module';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{

  todoForm !: FormGroup;
  task : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex! : any;
  isEditEnabled : boolean = false;


  constructor(private fb : FormBuilder, private _taskService :TaskService){}
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      description : ['',Validators.required]
    });
    this.showTask();
  }

  showTask(){
    this._taskService.showTask().subscribe({
      next: (res) => {
        console.log(res);
        this.task = (res);
      },
      error: console.log
    })
  }

  addTask(){
    this.task.push({
      description:this.todoForm.value.description,
      done:false
    })

    if(this.todoForm.valid){
      console.log(this.todoForm.valid)
      this._taskService.task(this.todoForm.value).subscribe({
        next:(val:any) => {
          alert('Task Added Successfully')
        },
        error:(err:any) => {
          console.log;
        }
      })
    }

     this.todoForm.reset();
  }

  onedit(item:ITask, i :number){
    console.log(item);
    this.todoForm.controls['description'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.task[this.updateIndex].description = this.todoForm.value.description;
    this.task[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i : number){
    this.task.splice(i,1)
  }

  deleteInprogressTask(i : number){
    this.inprogress.splice(i,1)
  }

  deleteDoneTask(i : number){
    this.done.splice(i,1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
