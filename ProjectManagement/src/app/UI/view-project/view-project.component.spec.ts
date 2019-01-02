import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponent } from './view-project.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectfilterPipe } from './projectfilter.pipe';
import { ProjectService } from '../../Service/project.service';
import { MockProject } from '../../Service/mockprojectservice';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Router } from '@angular/router';
import { Project } from '../../Models/Project';

// class MockRouter {
//   navigate(url: string) { return url; }
// }

describe('ViewProjectComponent', () => {
  let routerMock: any;
  let routerSpy: any;
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  beforeEach(async(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ViewProjectComponent, ProjectfilterPipe],
      providers: [{ provide: ProjectService, useClass: MockProject },
      { provide: Router, useValue: routerMock }]
    })
      .compileComponents()
      .then(() => {
        routerSpy = TestBed.get(Router);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all project', () => {
    component.ngOnInit();
    expect(component.projects.length).toBe(1);
  });

  it('should set sort column', () => {
    component.sortProject('LastName');
    expect(component.sortvar).toBe('LastName');
  });

  it('should set sort column', () => {
    component.sortProject('LastName');
    expect(component.sortvar).toBe('LastName');
  });

  it('should call with the ID for addproject', () => {// inject([Router], (router: Router) => {

    component.editProject(5);
    fixture.whenStable()
      .then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/addproject/5']));
  });

  it('should call with the ID of suspendProject', () => {
    const gridService = fixture.debugElement.injector.get(ProjectService);
    expect(gridService.postProject).toBeTruthy();
    component.editProject(5);

    fixture.whenStable()
      .then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/addproject/5']));
  });
});
