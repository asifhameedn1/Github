import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../Models/Project';

@Pipe({
  name: 'projectfilter'
})
export class ProjectfilterPipe implements PipeTransform {

  transform(projects: Project[], project: string, projectSort: string): Project[] {
    let temp: Project[];
    if (projects && projects.length) {

      temp = projects;
      if (project !== undefined) {
        temp = projects.filter(items => {

          if (items.ProjectName.toLowerCase().indexOf(project.toLowerCase()) === -1 &&
            items.ManagerName.toLowerCase().indexOf(project.toLowerCase()) === -1
             && items.Priority.toString().toLowerCase().indexOf(project.toLowerCase()) === -1
          ) {
          return false;
        }

        return true;
      });
    }

    if (projectSort !== undefined) {
      temp = temp.sort((a, b) => {
        if (a[projectSort] < b[projectSort]) { return -1; }
        if (a[projectSort] > b[projectSort]) { return 1; }
        return 0;
      });
    }
  }
    return temp;
  }
}
