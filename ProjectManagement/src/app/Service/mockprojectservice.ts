
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectService } from './project.service';
import { Project } from '../Models/Project';
import { User } from '../Models/User';

export class MockProject extends ProjectService {
    constructor() {
        super(null);
    }

    getProjectById(Id: number): Observable<Project> {
        // const p = new Project();
        const project: Observable<Project> = of({
            ProjectName: 'asd',
            NoOfTasks: 2,
            Status: 'string;',
            StartDate: new Date(2018, 12, 30),
            EndDate: new Date(2019, 12, 30),
            Priority: 6,
            SetDate: true,
            ManagerID: 3,
            ManagerName: 'string',
            ProjectID: 5
        });
        return project;
    }

    getProjects(): Observable<Project[]> {
        const project: Observable<Project[]> = of([{
            ProjectName: 'asd',
            NoOfTasks: 2,
            Status: 'string;',
            StartDate: new Date(2018, 12, 30),
            EndDate: new Date(2019, 12, 30),
            Priority: 6,
            SetDate: true,
            ManagerID: 3,
            ManagerName: 'string',
            ProjectID: 5
        }]);
        return project;
    }

    getUser(): Observable<User[]> {
        const users: Observable<User[]> = of([{
            EmployeeID: 1,
            LastName: 'string',
            FirstName: 'string',
            UserID: 1
        }]);

        return users;
    }

    postProject(project: Project): Observable<any> {
        const project1: Observable<any> = of({
            ProjectName: 'asd',
            NoOfTasks: 2,
            Status: 'string;',
            StartDate: new Date(2018, 12, 30),
            EndDate: new Date(2019, 12, 30),
            Priority: 6,
            SetDate: true,
            ManagerID: 3,
            ManagerName: 'string',
            ProjectID: 5
        });
        return project1;
    }
}
