import { Component, OnInit } from '@angular/core';

import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile=null;
  addProductReactiveForm: FormGroup;
  passregex=/^(?=(?:.[0-9]))(?=(?:.[a-z]))(?=(?:.*[A-Z])).{6,}$/;
  categoryerror;
  descriptionerror;
  productNameerror;
  productPiceerror;
  quantityerror;
  categorys:any;
  manufacturererror:any;
  productCodeerror;
  constructor(private http: HttpClient,private profile: FormBuilder,private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.addProductReactiveForm = this.profile.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      description: [null, Validators.required], 
      category: [null, Validators.required], 
      quantity: ['',[Validators.required]],
      manufacturer: ['',[Validators.required]],
      productCode: ['',[Validators.required]],
    });
    try {
      await this.http.get("http://127.0.0.1:8000/category")
      .subscribe(res =>{
      this.categorys=res;
      console.log(res);
    });
    } catch (error) {
      
    }
  }
  onFileSelected(event)
  {
    this.selectedFile=<File>event.target.files[0];  }
  onUpload()
  {
    
  }
  get registerFormControl() {
    
    return this.addProductReactiveForm.controls;
  }
  handleReactiveFormSubmit()
  {
    this.productNameerror=this.addProductReactiveForm.controls.productName.errors;
    this.productPiceerror=this.addProductReactiveForm.controls.productPrice.errors;
    this.descriptionerror=this.addProductReactiveForm.controls.description.errors;
    this.quantityerror=this.addProductReactiveForm.controls.quantity.errors;
    this.categoryerror=this.addProductReactiveForm.controls.category.errors;
    this.manufacturererror=this.addProductReactiveForm.controls.manufacturer.errors;

    this.productCodeerror=this.addProductReactiveForm.controls.productCode.errors;

    if(this.productNameerror ==null 
      && this.productPiceerror==null 
      && this.descriptionerror==null 
      && this.categoryerror==null 
      && this.quantityerror==null
      && this.productCodeerror==null
      && this.manufacturererror==null)
    {
      const fd =new FormData;

      // fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('productPrice',this.addProductReactiveForm.controls.productPrice.value);
      fd.append('productdescription',this.addProductReactiveForm.controls.description.value);
      fd.append('manufacturer',this.addProductReactiveForm.controls.manufacturer.value);
      fd.append('productCode',this.addProductReactiveForm.controls.productCode.value);
      fd.append('quantity',this.addProductReactiveForm.controls.quantity.value);
      fd.append('categoryName',this.addProductReactiveForm.controls.category.value);
      fd.append('productName',this.addProductReactiveForm.controls.productName.value);
      this.http.post("http://127.0.0.1:8000/products",fd)
      .subscribe(res =>{
      console.log(res);
    });
      // this.router.navigate(['/home']);
    }
  }
}
