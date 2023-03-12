import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http:HttpClient) { }

  task(data:any): Observable<any>{
    return this._http.post(' http://localhost:3000/task',data);
  }

  showTask(): Observable<any>{
    return this._http.get(' http://localhost:3000/task');
  }

  deleteTask(){
    
  }
}
