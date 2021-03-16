import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CategoriesService } from "../shared/services/categories.service";
import { Category } from "../shared/models/category.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Array<Category>>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
