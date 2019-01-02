import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../Models/User';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(users: User[], user: string, userSort: string): User[] {
    let temp: User[];
    if (users && users.length) {

      temp = users;
      if (user !== undefined) {
        temp = users.filter(items => {

          if (items.FirstName.toLowerCase().indexOf(user.toLowerCase()) === -1 &&
            items.LastName.toLowerCase().indexOf(user.toLowerCase()) === -1 &&
            items.EmployeeID.toString().toLowerCase().indexOf(user.toLowerCase()) === -1) {
            return false;
          }

          return true;
        });
      }

      if (userSort !== undefined) {
        temp = temp.sort((a, b) => {
          if (a[userSort] < b[userSort]) { return -1; }
          if (a[userSort] > b[userSort]) { return 1; }
          return 0;
        });
      }
    }
    return temp;
  }
}
