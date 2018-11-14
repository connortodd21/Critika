import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService],
})

export class CategoriesComponent implements OnInit {
  allCategories: Category[];
  categoriesForFilter: Object;
  renderComponent: string = "";
  categoryNames: String[];

  constructor(public subService:CategoriesService) { 
    this.categoryNames = [];
    this.allCategories = [];
    this.categoriesForFilter = [];
  }

  renderFileReport() {
    this.renderComponent = "file-report";
  }

  ngOnInit() {
    this.subService.getAllCategories().then((categories) => {
      //categories is an array of all categories
      this.categoriesForFilter = categories;
      let i:number;
      for(let x in categories){
        var name = categories[x].categoryName
        this.categoryNames[i] = name
      }
    })
  }

  getSubmissionsInCategory(category){
    console.log(category)
    this.subService.getAllSubmissionsInCategory(category).then((subs) => {
      console.log(subs)
    })
  }

  createCategory(){

  }


}
