import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { Produto } from 'src/app/shared/models/produto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  pageTitle = "Cadastro de produto";
  loading = false;
  submitted = false;
  submitError = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( parameters => {
      // Verificando se a rota foi chamada com o parâmetro id
      // Havendo um id na rota, trata-se de uma edição
      if (parameters['id']) {
        this.pageTitle = "Atualização de produto";

        let product = this.loadProductData(parameters['id']);

        this.productForm = this.formBuilder.group({
          productname: [product, Validators.required],
          productsaleprice: ['', Validators.required]
        }); 
      }
      else{
        // Não havendo id na rota, trata-se de uma inclusão
        this.productForm = this.formBuilder.group({
          productname: ['', Validators.required],
          productsaleprice: ['', Validators.required]
        });        
      }
    });


  }

  get productData() { return this.productForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    
    this.productService.create(this.productFactory())
    .pipe(first())
    .subscribe(
      data => {
        this.loading = false
        Swal.fire('Sucesso','Produto cadastrado com sucesso', 'success')
      }, 
      error => {
        this.loading = false;
        this.submitError = true
      });
  }

  loadProductData(id: string){
    this.productService.read(id)
    .pipe(first())
    .subscribe(
      data => {
        return data;
      }, 
      error => {
        this.loading = false;
        this.submitError = true
      });
  }

  private productFactory(): Produto{
    let product = new Produto;

    product.Nome = this.productData.productname.value;
    product.ValorVenda = parseFloat(this.productData.productsaleprice.value);

    return product;
  }
}
