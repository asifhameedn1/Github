import { Component, OnInit } from '@angular/core';
import { Project } from '../../Models/Project';
import { ProjectService } from '../../Service/project.service';
import { Router } from '@angular/router';
import { wrapListenerWithDirtyAndDefault } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  projects: Project[];
  sortvar: string;
  constructor(private _projectService: ProjectService, private _router: Router) { }

  ngOnInit() {
    // this.projects = [{
    //   ProjectName: 'IIHT', NoOfTasks: 5, StartDate: new Date(2018, 7, 26), SetDate: false, ManagerID: 1,
    //   ManagerName: 'Mujeeb', EndDate: new Date(2019, 12, 31), Priority: 1, Status: 'In Progress'
    // }];
    this._projectService.getProjects()
      .subscribe(data => {
        this.projects = data;
        // console.log(this.projects);
      });
  }

  editProject(id: number) {
    window.scroll(0, 0);
    this._router.navigate(['/addproject/' + id]);
  }

  suspendProject(id: number) {
    let project: Project;
    project = new Project();
    project = this.projects.find(x => x.ProjectID === id);
    project.Status = 'Suspend';
    this._projectService.postProject(project).subscribe();
    window.scroll(0, 0);
    this._router.navigate(['/addproject']);
  }

  sortProject(field: string) {
    this.sortvar = field;
  }
}
