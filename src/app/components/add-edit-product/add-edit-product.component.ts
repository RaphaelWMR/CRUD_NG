import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.form.value.name);

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
  }

}
