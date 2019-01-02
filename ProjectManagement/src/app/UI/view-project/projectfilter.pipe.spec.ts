import { ProjectfilterPipe } from './projectfilter.pipe';
import { Project } from '../../Models/Project';

const projects: Project[] =
  [{
    ProjectName: 'Zurich',
    NoOfTasks: 2,
    Status: 'string;',
    StartDate: new Date(2018, 12, 30),
    EndDate: new Date(2019, 12, 30),
    Priority: 6,
    SetDate: true,
    ManagerID: 3,
    ManagerName: 'JK',
    ProjectID: 5
  },
  {
    ProjectName: 'RCIS',
    NoOfTasks: 2,
    Status: 'string;',
    StartDate: new Date(2018, 12, 30),
    EndDate: new Date(2019, 12, 30),
    Priority: 8,
    SetDate: true,
    ManagerID: 4,
    ManagerName: 'Mujeebu',
    ProjectID: 7
  }];

describe('ProjectfilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectfilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('search task', () => {
    const pipe = new ProjectfilterPipe();
    const task = pipe.transform(projects, 'Mujeebu', undefined);
    const len = task.length;
    expect(len).toEqual(1);
  });

  it('sort task', () => {
    const pipe = new ProjectfilterPipe();
    const task = pipe.transform(projects, undefined, 'ProjectName');
    expect(task[0].ManagerID).toEqual(4);
  });
});
