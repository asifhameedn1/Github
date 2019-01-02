import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../../Service/task.service';
import { MockTask } from '../../Service/mocktaskservice';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { MockUser } from '../../Service/mockuserservice';
import { ProjectService } from '../../Service/project.service';
import { MockProject } from '../../Service/mockprojectservice';
import { By } from '@angular/platform-browser';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [{ provide: TaskService, useClass: MockTask },
      { provide: UserService, useClass: MockUser },
      { provide: ProjectService, useClass: MockProject }
      ],
      declarations: [AddTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all dropdown', () => {
    component.ngOnInit();
    expect(component.Parents.length).toBeGreaterThan(0);
    expect(component.Users.length).toBeGreaterThan(0);
    expect(component.Projects.length).toBeGreaterThan(0);
  });

  it('should submit Task', () => {
    component.submitTask();
    expect(component.message).toBe('inserted successfully!');
  });

  it('should open Project Dialog', () => {
    component.openProjectDialog();
    expect(component.display).toBe('block');
    expect(component.displayProject).toBe('block');
  });

  it('should close Project Dialog', () => {
    component.closeProjectDialog();
    expect(component.display).toBe('none');
    expect(component.displayProject).toBe('none');
  });

  it('should open Parent Dialog', () => {
    component.openParentDialog();
    expect(component.display).toBe('block');
    expect(component.displayParent).toBe('block');
  });

  it('should close Parent Dialog', () => {
    component.closeParentDialog();
    expect(component.display).toBe('none');
    expect(component.displayParent).toBe('none');
  });

  it('should open User Dialog', () => {
    component.openUserDialog();
    expect(component.display).toBe('block');
    expect(component.displayUser).toBe('block');
  });

  it('should close User Dialog', () => {
    component.closeProjectDialog();
    expect(component.display).toBe('none');
    expect(component.displayUser).toBe('none');
  });

  it('select User', () => {
    spyOn(component, 'selectUserHandler').and.callThrough();
    const selecteduser = fixture.debugElement.query(By.css('#User'));
    selecteduser.nativeElement.value = '1';
    selecteduser.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectUserHandler).toHaveBeenCalled();
    expect(component.task.UserName).not.toBeNull();
  });

  it('select Project', () => {
    spyOn(component, 'selectProjectHandler').and.callThrough();
    const selectedProject = fixture.debugElement.query(By.css('#Project'));
    selectedProject.nativeElement.value = '1';
    selectedProject.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectProjectHandler).toHaveBeenCalled();
    expect(component.task.ProjectName).not.toBeNull();
  });

  it('select Parent', () => {
    spyOn(component, 'selectParentHandler').and.callThrough();
    const selectedParent = fixture.debugElement.query(By.css('#Parent'));
    selectedParent.nativeElement.value = '1';
    selectedParent.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectParentHandler).toHaveBeenCalled();
    expect(component.task.ParentName).not.toBeNull();
  });

  it('reset', () => {
    component.reset();
    expect(component.task.ParentName).toBe(undefined);
  });
});
