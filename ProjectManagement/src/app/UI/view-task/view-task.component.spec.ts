import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { TaskfilterPipe } from './taskfilter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../Service/task.service';
import { MockTask } from '../../Service/mocktaskservice';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ViewTaskComponent, TaskfilterPipe],
      providers: [{ provide: TaskService, useClass: MockTask }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all tasks', () => {
    component.ngOnInit();
    expect(component.tasks.length).toEqual(2);
  });

  it('should END tasks', () => {
    component.endTask(1);
    expect(component.tasks.length).toEqual(2);
  });

  it('should SET SORT column ', () => {
    component.onSortChange('Status');
    expect(component.taskName).toEqual('Status');
  });
});
