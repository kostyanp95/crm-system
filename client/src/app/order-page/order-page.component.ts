import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
