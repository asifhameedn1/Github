import { Component, OnInit } from '@angular/core';
import { ParentTasks } from '../../Models/ParentTasks';
import { Task } from '../../Models/Task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../Service/task.service';
import { PARENT } from '@angular/core/src/render3/interfaces/view';
import { UserService } from '../../Service/user.service';
import { ProjectService } from '../../Service/project.service';
import { User } from '../../Models/User';
import { Project } from '../../Models/Project';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  displayProject = 'none';
  display = 'none';
  displayUser = 'none';
  button = 'Submit';
  Parents: ParentTasks[];
  Users: User[];
  Projects: Project[];
  ID: number;
  message: string;
  task: Task;
  displayParent = 'none';

  constructor(private _taskService: TaskService, private _route: ActivatedRoute,
    private _userService: UserService, private _projectService: ProjectService) {
    this.task = new Task();
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this.ID = params['id'];
    });
    this._taskService.getParents().subscribe(parents => {
      this.Parents = parents;
      // console.log(parents);
    });
    this._userService.getUser().subscribe(items => {
      this.Users = items;
      // console.log(items);
    });

    this._projectService.getProjects().subscribe(item => {
      this.Projects = item;
      // console.log(item);
    });
    if (this.ID !== undefined) {
      this.button = 'Update';
      this._taskService.getTaskById(this.ID).subscribe(
        (items) => {
          this.task = items;
          // console.log(this.task.ID);
        });
    }
    // this.getParents();
  }

  // getParents() {
  //   this.Parents = this._taskService.getParents();
  // }

  submitTask() {
    if (this.task.SetParent) {
      const newParent = new ParentTasks();
      newParent.parentName = this.task.TaskName;
      this._taskService.postParent(newParent).subscribe(
        obj => { }
      );
    } else {
      if (this.task.StartDate > this.task.EndDate) {
        this.message = 'Start Date is greater than End Date';
        console.log(this.message);
      } else {
        console.log(this.task.ID);
        if (this.task.ID !== undefined) {
          this.task.Status = 'Not Started';
          this._taskService.putTask(this.task).subscribe(item => {
            this.task = item;
            this.message = 'updated successfully!';
          });
        } else {
          this._taskService.postTask(this.task).subscribe(item => {
            this.task = item;
            this.message = 'inserted successfully!';
          });
        }
        // alert(this.TaskName + ' ' + this.Priority + this.ParentID + 'Str' + this.StartDate + 'End' + this.EndDate);
      }
    }
  }

  openProjectDialog() {
    this.display = 'block';
    this.displayProject = 'block';
  }

  closeProjectDialog() {
    this.display = 'none';
    this.displayProject = 'none';
  }

  openParentDialog() {
    this.display = 'block';
    this.displayParent = 'block';
  }

  closeParentDialog() {
    this.display = 'none';
    this.displayParent = 'none';
  }

  openUserDialog() {
    this.display = 'block';
    this.displayUser = 'block';
  }

  closeUserDialog() {
    this.display = 'none';
    this.displayUser = 'none';
  }

  selectUserHandler(event: any) {
    this.task.UserName = event.target.options[event.target.selectedIndex].text;
  }

  selectParentHandler(event: any) {
    this.task.ParentName = event.target.options[event.target.selectedIndex].text;
  }

  selectProjectHandler(event: any) {
    this.task.ProjectName = event.target.options[event.target.selectedIndex].text;
  }

  reset() {
    this.task = new Task();
  }
}
