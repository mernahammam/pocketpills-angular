import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Object;

  constructor(private http: HttpClient) { }

    async ngOnInit(): Promise<void> {
      try {
      
     await this.http.get("https://pocket-pills.herokuapp.com/api/customer/orders").subscribe(res=>{
       this.orders=res;
     });

   

    } catch (error) {
      
    }
  }

  deleteInvoice(invNo) {
    console.log(invNo);
    
    this.http
    .delete('https://pocket-pills.herokuapp.com/api/customer/orders/' + invNo)
    .subscribe((res) => {
      // this.products = res;
      });
  }

}
