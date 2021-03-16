import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
