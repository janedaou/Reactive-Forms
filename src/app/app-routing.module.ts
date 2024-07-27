import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { NameEditorComponent } from './name-editor/name-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile-editor', pathMatch: 'full' },
  { path: 'profile-editor', component: ProfileEditorComponent},
  { path: 'name-editor', component: NameEditorComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}