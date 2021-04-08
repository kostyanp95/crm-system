import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
