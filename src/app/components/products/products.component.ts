import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: any;
  productList: any;
  clicked = [];
  qtyminus: any;
  qtyplus: any;
  index: number;
  inputvalue: any;
  modifiedvalue: any;
  producCodetList: any;
  found = 0;
  AvailableQuantity: any;
  available = 0;
  constructor(private diplayedProduct: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    this.diplayedProduct.currentMessage.subscribe(result => {
      this.product = result;
      
      try {
        const fd = new FormData;
        fd.append('categoryName', this.product);
        this.http.post("http://127.0.0.1:8000/getproduct", fd)
          .subscribe(res => {
            this.productList = res;
            for (let index = 0; index < this.productList.length; index++) {
              this.clicked.push(0);
            }
          });
      } catch (error) {

      }
    });

  }
  addToCard(event, i) {



    this.clicked[i] = 1;
    this.index = i;
    // this.changeQuantity(i);
    setTimeout(() => {
      this.qtyminus = document.getElementsByClassName("qtyminus");
      this.qtyminus[0].addEventListener('click', function () {
        this.inputvalue = document.getElementsByClassName("qty");
        
        this.modifiedvalue = this.inputvalue[0].value;
        if (this.modifiedvalue > 1) {
          this.inputvalue[0].value = this.modifiedvalue - 1;
        }
      })
      this.qtyplus = document.getElementsByClassName("qtyplus");
      this.qtyplus[0].addEventListener('click', function () {
        //     // console.log(i);

        this.inputvalue = document.getElementsByClassName("qty");
        // console.log(this.inputvalue);
        this.modifiedvalue = parseInt(this.inputvalue[0].value);
        if (this.modifiedvalue > 0) {
          this.inputvalue[0].value = this.modifiedvalue + 1;
        }
      })
    }, 1000);

    // console.log(i);
  }
  // cart()
  // {
  //   if(this.clicked==0)
  //   {
  //     return true;
  //   }
  //   // console.log('sayed');

  // }
  getQuantity(event, i) {
    let productCode, branchId;
    this.inputvalue = document.getElementsByClassName("qty");
    let quantity = parseInt(this.inputvalue[0].value);
    if (event.target.parentNode.id != "") {
      [productCode, branchId] = event.target.parentNode.id.split(",");

    }
    else {
      [productCode, branchId] = event.target.id.split(",");
    }
    let userId = localStorage.getItem('userId');
    // console.log(quantity,productCode,branchId,userId);
    const fd = new FormData;
    fd.append('userId', userId);
    fd.append('productCode', productCode);
    fd.append('branchId', branchId);
    fd.append('productQuantity', quantity.toString());

    this.http.post("http://127.0.0.1:8000/api/cartList", fd)
      .subscribe(res => {
        this.producCodetList = res;
        for (let index = 0; index < this.producCodetList.length; index++) {
          if (this.producCodetList[index]['productCode'] == productCode) {
           
            this.found = 1;
          }

        }
        if (this.found == 0) {
          this.http.post("http://127.0.0.1:8000/getQuantity", fd)
            .subscribe(res => {
              this.AvailableQuantity = res;
              console.log(this.AvailableQuantity[0]['productQuantity']);
              if (this.AvailableQuantity[0]['productQuantity'] >= quantity) {
                this.available = 1;

                
              }
              console.log(this.available);
              
              if (this.available == 1) {
                this.http.post("http://127.0.0.1:8000/appToCard", fd)
                .subscribe(res => {
                  this.productList = res;
                  if (res['message'] == 'Success') {
                    alert('item added to card successfully');
                  }
                  this.clicked[i] = 0;
                });
              }
              else{
                let massege='this quantity is not available the available quantity is '+this.AvailableQuantity[0]['productQuantity'];
                alert(massege);
              }
             
            })


        }
        else {
          alert('this product already exist in your card');
        }
      })


  }
}
