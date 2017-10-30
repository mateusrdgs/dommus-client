import { Component, OnInit } from '@angular/core';

import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.styl']
})
export class TasksComponent implements OnInit {

   tasks

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this._socketIoService
        .emitMessage('tasks:Get', null, (tasks) => {
          console.log(tasks);
        });
  }

}
