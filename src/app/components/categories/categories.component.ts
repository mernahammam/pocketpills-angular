import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data/data.service'; 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorys: any;
  constructor(private http: HttpClient,private setCategory: DataService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.http.get("http://127.0.0.1:8000/category")
      .subscribe(res =>{
      this.categorys=res;
      // console.log(res);
    });
    } catch (error) {
      
    }
  }
  product(event)
  {
    // console.log(event.target.value);
    this.setCategory.changeMessage(event.target.value);
  }

}
