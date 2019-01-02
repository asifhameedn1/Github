import { TaskService } from './task.service';
import { of } from 'rxjs';
import { ParentTasks } from '../Models/ParentTasks';
import { Task } from '../Models/Task';
import { Observable } from 'rxjs/internal/Observable';

export class MockTask extends TaskService {
    // constructor(private http: HttpClient) {
    // }

    constructor() {
        super(null);
    }
    getParents(): Observable<ParentTasks[]> {
        const parent: ParentTasks[] = [
            { ParentID: 1, parentName: 'Method2' },
            { ParentID: 2, parentName: 'Method1' }
        ];

        const parents: Observable<ParentTasks[]> = of(parent);

        return parents;
    }

    getTasks(): Observable<Task[]> {
        const tasks: Task[] = [ {
            ID: 1, ProjectName: '', UserName: '', ProjectID: 2, SetParent: true,
            TaskName: 'TestData', ParentID: 0,
            Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
        },
        {
            ID: 2, ProjectName: '', UserName: '', ProjectID: 1, SetParent: true,
            TaskName: 'Methods', ParentID: 1,
            Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
        }];
        const task: Observable<Task[]> = of(tasks);

        return task;
    }

    getTaskById(Id: number): Observable<Task> {
        const t = new Task();
        t.EndDate = new Date(2018, 9, 22);
        t.ID = 1, t.TaskName = 'TestData', t.ParentID = 0;
        t.Priority = 11, t.ParentName = '', t.StartDate = new Date(2015, 9, 22), t.Status = 'Not Started';
        const task: Observable<Task> = of(t);
        return task;
    }

    postTask(task: Task): Observable<Task> {
        const t = new Task();
        t.EndDate = new Date(2018, 9, 22);
        t.ID = 1, t.TaskName = 'TestData', t.ParentID = 0;
        t.Priority = 11, t.ParentName = '', t.StartDate = new Date(2015, 9, 22), t.Status = 'Not Started';
        const tasks: Observable<Task> = of(t);
        return tasks;
    }

    putTask(task: Task): Observable<Task> {
        const t = new Task();
        t.EndDate = new Date(2018, 9, 22);
        t.ID = 1, t.TaskName = 'TestData', t.ParentID = 0;
        t.Priority = 11, t.ParentName = '', t.StartDate = new Date(2015, 9, 22), t.Status = 'Not Started';
        const tasks: Observable<Task> = of(t);
        return tasks;
    }

    deleteTask(id: number): Observable<Task> {
        let tasks: Task[] = [
            {
                ID: 1, ProjectName: '', UserName: '', ProjectID: 2, SetParent: true,
                TaskName: 'TestData', ParentID: 0,
                Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
            },
            {
                ID: 2, ProjectName: '', UserName: '', ProjectID: 1, SetParent: true,
                TaskName: 'Methods', ParentID: 1,
                Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
            }];
        tasks = Object.assign([], tasks).filter(item => item.id !== id);
        return of(tasks[0]);
    }
}
