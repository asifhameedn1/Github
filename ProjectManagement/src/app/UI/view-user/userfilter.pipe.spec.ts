import { UserfilterPipe } from './userfilter.pipe';
import { User } from 'src/app/Models/User';
const users: User[] = [
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
  },
  {
    EmployeeID: 3,
    LastName: 'TC',
    FirstName: 'Arun',
    UserID: 3
  }
];
describe('UserfilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserfilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('search task', () => {
    const pipe = new UserfilterPipe();
    const task = pipe.transform(users, 'Asif', undefined);
    const len = task.length;
    expect(len).toEqual(1);
  });

  it('sort task', () => {
    const pipe = new UserfilterPipe();
    const task = pipe.transform(users, undefined, 'FirstName');
    expect(task[0].UserID).toEqual(3);
  });
});
