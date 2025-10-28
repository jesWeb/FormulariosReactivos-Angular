import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register', component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'register'
      }
    ]
  }
]

export default authRoutes
