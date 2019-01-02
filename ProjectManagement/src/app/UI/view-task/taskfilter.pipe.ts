import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Models/Task';

@Pipe({
  name: 'taskfilter'
})
export class TaskfilterPipe implements PipeTransform {

  transform(tasks: Task[], project: string, taskName: string): Task[] {
    let temp: Task[];
    if (tasks && tasks.length) {

      temp = tasks;
      if (project !== undefined) {
        temp = tasks.filter(items => {

          if (project && (items.TaskName.toLowerCase().indexOf(project.toLowerCase()) === -1)) {
            return false;
          }

          return true;
        });
      }

      if (taskName !== undefined) {
        temp = temp.sort((a, b) => {
          if (a[taskName] < b[taskName]) { return -1; }
          if (a[taskName] > b[taskName]) { return 1; }
          return 0;
        });
      }
    }

    return temp;
  }
}


