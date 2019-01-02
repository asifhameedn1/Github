import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { UserService } from '../../Service/user.service';
import { Router } from '@angular/router';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  users: User[];
  sortvar: string;
  constructor(private _userService: UserService, private _router: Router) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this._userService.getUser().
      subscribe((items) => { this.users = items; });
  }

  deleteUser(Id: number) {
    this._userService.deleteUser(Id).subscribe((obj) => {
      console.log(obj);
      this._router.navigate(['/adduser']);
      // if you need to scroll back to top, here is the right place

    });
    // this._router.navigate(['/adduser']);
  }

  sortUsers(field: string) {
    this.sortvar = field;
  }
}
