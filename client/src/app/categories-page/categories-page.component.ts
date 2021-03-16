import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CategoriesService } from "../shared/services/categories.service";
import { Category } from "../shared/models/category.model";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit {

  loading: boolean = false
  private categories: Array<Category> = []

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.fetch()
      .subscribe(cat => {
        this.loading = false
        this.categories = cat
        console.log(cat)
      })
  }

}
