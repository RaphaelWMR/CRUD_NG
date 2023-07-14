import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],//Primer parametro, valor predefinido, si le pongo algo, se autocompleta el form
        description: ['', Validators.required], // required: no empty
        price: [null, Validators.required],// si en un campo quiero ple mas de un validator
        stock: [null, Validators.required]//los pongo en un array
      }
    )
  }

  ngOnInit(): void {
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
    this.loading = true;
    this._productService.saveProduct(product).subscribe(() => {
      this.loading = false;
      this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado');
      this.router.navigate(['/']);
    });
  }


}
