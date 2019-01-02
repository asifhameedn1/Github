import { TaskfilterPipe } from './taskfilter.pipe';
import { Task } from '../../Models/Task';

const tasks: Task[] = [{
  ID: 1, ProjectName: '', UserName: '', ProjectID: 2, SetParent: true,
  TaskName: 'TestData', ParentID: 0,
  Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
},
{
  ID: 2, ProjectName: '', UserName: '', ProjectID: 1, SetParent: true,
  TaskName: 'Methods', ParentID: 1,
  Priority: 11, ParentName: '', StartDate: new Date(2015, 9, 22), EndDate: new Date(2018, 9, 22), Status: 'true'
}];

describe('TaskfilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskfilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('search task', () => {
    const pipe = new TaskfilterPipe();
    const task = pipe.transform(tasks, 'Methods', undefined);
    const len = task.length;
    expect(len).toEqual(1);
  });

  it('sort task', () => {
    const pipe = new TaskfilterPipe();
    const task = pipe.transform(tasks, undefined, 'TaskName');
    expect(task[0].ID).toEqual(2);
  });
});
