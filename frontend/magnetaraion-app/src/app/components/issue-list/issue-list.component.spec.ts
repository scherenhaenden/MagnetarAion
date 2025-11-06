import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { IssueListComponent } from './issue-list.component';
import { ApiService } from '../../services/api.service';
import { Issue } from '../../models/issue.model';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let apiService: ApiService;

  const mockIssues: Issue[] = [
    { id: 1, title: 'Issue 1', description: '', status: 'Open', priority: 'High', project_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, title: 'Issue 2', description: '', status: 'In Progress', priority: 'Medium', project_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IssueListComponent,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'get').and.returnValue(of(mockIssues));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch issues on initialization', () => {
    expect(apiService.get).toHaveBeenCalledWith('/issues/', component.filterForm.value);
    expect(component.issues.length).toBe(2);
  });

  it('should call fetchIssues when onFilter is called', () => {
    spyOn(component, 'fetchIssues');
    component.onFilter();
    expect(component.fetchIssues).toHaveBeenCalled();
  });

  it('should pass filter values to the api service', () => {
    component.filterForm.setValue({
      project_id: '1',
      assignee_id: '1',
      status: 'Open',
      priority: 'High'
    });
    component.onFilter();
    expect(apiService.get).toHaveBeenCalledWith('/issues/', component.filterForm.value);
  });
});
