import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Array<Category>>;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }

}
