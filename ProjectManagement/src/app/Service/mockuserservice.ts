import { of } from 'rxjs';
import { Task } from '../Models/Task';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';
import { User } from '../Models/User';

export class MockUser extends UserService {
    // constructor(private http: HttpClient) {
    // }

    constructor() {
        super(null);
    }
    getUser(): Observable<User[]> {
        const users: Observable<User[]> = of(
            [
                {
                    EmployeeID: 1,
                    LastName: 'Hameed',
                    FirstName: 'Asif',
                    UserID: 1
                },
                {
                    EmployeeID: 2,
                    LastName: 'Jose',
                    FirstName: 'Binil',
                    UserID: 2
                }
            ]);
        return users;
    }

    getUserById(Id: number): Observable<User> {
        const users: Observable<User> = of(
            {
                EmployeeID: 1,
                LastName: 'Hameed',
                FirstName: 'Asif',
                UserID: 1
            }
        );
        return users;
    }

    postUser(user: User): Observable<any> {
        // console.log(user);
        const user1: User = new User();
        user1.EmployeeID = 1;
        user1.FirstName = 'asdas';
        user1.LastName = 'asdfasd';
        user1.UserID = 1;
        const users: Observable<User> = of(user1
            // {
            //     EmployeeID: 1,
            //     LastName: 'Hameed',
            //     FirstName: 'Asif',
            //     UserID: 1
            // }
        );
        return users;
    }

    deleteUser(Id: number): Observable<any> {
        const users: Observable<User> = of(
            {
                EmployeeID: 1,
                LastName: 'Hameed',
                FirstName: 'Asif',
                UserID: 1
            }
        );
        return users;
    }
}
