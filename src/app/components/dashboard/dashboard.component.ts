import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {isEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public projects?: Project[];
  public editProject: Project;
  public delProject: Project;
  project: Project = {
    name: '',
    description: '',
    status: ''
  };
  submitted = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAll();
  }
  public getAll(): void {
    setTimeout(() => {
      this.projectService.getAll()
        .subscribe(
          data => {
            this.projects = data;
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    }, 1000);
  }
  public addProject(): void {
    const data = {
      name: this.project.name,
      description: this.project.description
    };
    document.getElementById('add-project-form').click();
    this.projectService.addProject(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    window.location.reload();
  }
  public updateProject(project: Project): void {
    this.projectService.updateProject(project)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    this.getAll();
  }
  public deleteProject(projectId: number): void{
    this.projectService.deleteProject(projectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAll();
      },
        error => {
        console.log(error);
      }
    );
    this.getAll();
    window.location.reload();
    window.location.reload();
  }
  public searchProjects(key: string): void{
    const results: Project[] = [];
    for (const project of this.projects) {
      if (project.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          project.description.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(project);
      }
    }
    this.projects = results;
    if (!key || results.length === 0) {
      this.getAll();
    }
  }
  public onOpenModal(project: Project, mode: string): void{
    const container = document.getElementById('main-dashboard-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addProjectModal');
    }
    if (mode === 'edit'){
      this.editProject = project;
      button.setAttribute('data-target', '#editProjectModal');
    }
    if (mode === 'delete'){
      this.delProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    }
    container.appendChild(button);
    button.click();
  }
  public closeProject(projectId: number): void{
    this.projectService.closeProject(projectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAll();
      },
      error => {
        console.log(error);
      }
    );
    this.getAll();
    window.location.reload();
    window.location.reload();
  }
}
