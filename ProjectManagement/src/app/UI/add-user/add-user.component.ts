import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../Models/User';
import { UserService } from '../../Service/user.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  user: User;
  id: number;
  button: string;
  navigationSubscription;
  constructor(private _userSerive: UserService, private _router: Router, private _activatedRoutes: ActivatedRoute) {
    this.user = new User();
    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // this.user = new User();
    this.button = 'Add';
    this._activatedRoutes.params.subscribe(params => {
      this.id = params['id'];
    });
    // console.log(this.id);
    if (this.id !== undefined) {
      this.button = 'Update';
      this._userSerive.getUserById(this.id).
        subscribe(obj => {
          this.user = obj;
          console.log(this.user);
        });
    }

    // Set default values and re-fetch any data you need.
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

  }

  submitUser() {
    this._userSerive.postUser(this.user).subscribe(obj => {
      this.user = new User();
      this._router.navigate(['/adduser']);
    });
  }

  reset() {
    this.user = new User();
  }
}
