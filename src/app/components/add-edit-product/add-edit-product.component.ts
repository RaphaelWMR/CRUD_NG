import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = "Agregar ";
  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],//Primer parametro, valor predefinido, si le pongo algo, se autocompleta el form
        description: ['', Validators.required], // required: no empty
        price: [null, Validators.required],// si en un campo quiero ple mas de un validator
        stock: [null, Validators.required]//los pongo en un array
      }
    )
    this.id = Number(aRouter.snapshot.paramMap.get('id'));//se obteiene el id del link, cuando es editar
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //Editar
      this.operacion = "Editar ";
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      });
    })
  }



  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
    this.loading = true;
    if (this.id !== 0) {
      //es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
        this.router.navigate(['/']);
      });
    } else {
      //es agregar
      this._productService.saveProduct(product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado');
        this.router.navigate(['/']);
      });
    }


  }


}
