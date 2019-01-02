import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../Models/Task';
import { Router } from '@angular/router';
import { ParentTasks } from '../../Models/ParentTasks';
import { TaskService } from '../../Service/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  taskData: Task[];
  Parents: ParentTasks[];
  temp = [];
  project: string;
  searchTask: string;
  parentName: string;
  parentID: number;
  parent: ParentTasks;
  taskName: string;
  constructor(private _taskservice: TaskService, private _router: Router, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    // this._router.navigate(['/viewtask']);
    this.parentID = 0;
    this.parentName = '';
    this.parent = new ParentTasks();
    // this.getParents();
    this._taskservice.getTasks()
      .subscribe((Items) => {
        this.tasks = Items;
        // this.taskData = this.tasks;
        // console.log(this.tasks);
      });
  }

  // getParents() {
  //   this._taskservice.getParents().subscribe(parents => {
  //     this.Parents = parents;
  //   });
  // }

  endTask(Id: number) {
    // let removeIndex: number;
    // removeIndex = 0;
    // this.tasks.forEach(item => {
    //   if (item.ID !== Id) {
    //     removeIndex++;
    //   }
    // });
    const endTask = this.tasks.find(x => x.ID === Id);
    endTask.Status = 'Complete';

    this._taskservice.postTask(endTask).subscribe((obj) => {
      this._router.navigate(['/viewtask']);
      // console.log('EndTask');
    });
  }

  onSortChange(sortVar: any) {
    this.taskName = sortVar;
  }
  // sortProduct<T>(propName: keyof Task, order: 'ASC' | 'DESC'): Task[] {
  //   this.taskData.sort((a, b) => {
  //     if (a[propName] < b[propName]) { return -1; }
  //     if (a[propName] > b[propName]) { return 1; }
  //     return 0;
  //   });
  //   return this.tasks;
  // }
  // parentChange(value: any) {
  //   console.log( value);

  //   this.parent = this.Parents.filter(p => p.parentID === Number(value))[0];
  //   console.log(this.parent);
  //   console.log(this.parent.parentName);
  // }
}
