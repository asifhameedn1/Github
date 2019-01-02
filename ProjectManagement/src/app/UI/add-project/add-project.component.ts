import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Service/project.service';
import { User } from '../../Models/User';
import { Project } from '../../Models/Project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnDestroy {
  button = 'Submit';
  project: Project;
  display = 'none';
  user: User[];
  managerName: string;
  managerID: number;
  navigationSubscription;
  id: number;
  constructor(private _projectService: ProjectService, private _router: Router, private _activatedRoutes: ActivatedRoute) {
    this.project = new Project();
    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.project = new Project();
    this._projectService.getUser()
      .subscribe(data => {
        this.user = data;
      });
    this._activatedRoutes.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.button = 'Add';
      this._projectService.getProjectById(this.id).
        subscribe(obj => {
          this.project = obj;
          if (this.project.StartDate !== undefined) {
            this.project.SetDate = true;
          }
        });
    }
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  ngOnInit() {
    // this.project = new Project();
    // this._projectService.getUser()
    //   .subscribe(data => {
    //     this.user = data;
    //   });
    // this._activatedRoutes.params.subscribe(params => {
    //   this.id = params['id'];
    // });

    // if (this.id !== undefined) {
    //   this.button = 'Add';
    //   this._projectService.getProjectById(this.id).
    //     subscribe(obj => {
    //       this.project = obj;
    //       if (this.project.StartDate !== undefined) {
    //         this.project.SetDate = true;
    //       }
    //     });
    // }
  }

  openModalDialog() {
    this.display = 'block'; // Set block css
  }

  closeModalDialog() {
    this.display = 'none'; // set none css after close dialog
  }

  selectUserHandler(event: any) {
    this.project.ManagerName = event.target.options[event.target.selectedIndex].text;
    this.project.ManagerID = event.target.options[event.target.selectedIndex].value;
  }

  addProject() {
    this._projectService.postProject(this.project)
      .subscribe((obj) => {
        // console.log(obj);
        this.project = new Project();
        this._router.navigate(['/addproject']);
      });
  }

  reset() {
    this.project = new Project();
  }

}
