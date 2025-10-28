import { Routes } from "@angular/router";
import { BasicComponent } from "./pages/basic/basic.component";
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from "./pages/switches/switches-page/switches-page.component";

export const reactiveRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        component: BasicComponent
      },
      {
        path: 'dynamic',
        title: 'Dinamico',
        component: DynamicPageComponent
      },
      {
        path: 'swithces',
        title: 'switches',
        component: SwitchesPageComponent
      },
      {
        path:'**',
        redirectTo:'basic'
      }
    ]



  }
]

