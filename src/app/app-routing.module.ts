import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent }, //Cuando el usuario ponga la ruta vacia, va a retornar ese componente
  { path: 'add', component: AddEditProductComponent }, //Cuando el usuario ponga la ruta add, va a retornar ese componente
  { path: 'edit/:id', component: AddEditProductComponent },// :id, se pasa el valor
  // Siempre tiene que estar al ultimo, ya que se lee secuencial
  { path: '**', redirectTo: '', pathMatch: 'full' } // Cuando se digite cualquier otra cosa, se redidirge al '' 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
