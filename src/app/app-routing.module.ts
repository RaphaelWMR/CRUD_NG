import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent }, //Cuando el usuario ponga la ruta vacia, va a retornar ese componente
  { path: 'add', component: AddEditProductComponent }, //Cuando el usuario ponga la ruta add, va a retornar ese componente
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
