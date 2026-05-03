import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
      { path: 'students', loadComponent: () => import('./pages/students-list/students-list.component').then((m) => m.StudentsListComponent) },
      { path: 'students/:id/classmates/:subjectId', loadComponent: () => import('./pages/classmates/classmates.component').then((m) => m.ClassmatesComponent) },
      { path: 'students/:id', loadComponent: () => import('./pages/student-detail/student-detail.component').then((m) => m.StudentDetailComponent) },
      { path: 'subjects', loadComponent: () => import('./pages/subjects-catalog/subjects-catalog.component').then((m) => m.SubjectsCatalogComponent) }
    ]
  }
];
