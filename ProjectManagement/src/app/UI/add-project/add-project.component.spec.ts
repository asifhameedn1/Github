import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../../Service/project.service';
import { MockProject } from '../../Service/mockprojectservice';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-view-project', template: '' })
class ViewProjectComponent { }

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [AddProjectComponent, ViewProjectComponent],
      providers: [{ provide: ProjectService, useClass: MockProject }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    component.ngOnInit();
    component.initialiseInvites();
    console.log(component.button);

    expect(component.button).toBe('Submit');
  });

  it('Set display as block', () => {
    component.openModalDialog();
    expect(component.display).toBe('block');
  });

  it('Set display as none', () => {
    component.closeModalDialog();
    expect(component.display).toBe('none');
  });

  it('Select Manager', () => {
    spyOn(component, 'selectUserHandler').and.callThrough();
    const selecteduser = fixture.debugElement.query(By.css('#Parent'));
    selecteduser.nativeElement.value = '1';
    selecteduser.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectUserHandler).toHaveBeenCalled();
    expect(component.project.ManagerName).not.toBeNull();
  });

  it('Save Project', () => {
    component.addProject();
    expect(component.project.ProjectID).toEqual(undefined);
  });

  it('Reset Project', () => {
    component.reset();
    expect(component.project.ProjectID).toEqual(undefined);
  });
});
