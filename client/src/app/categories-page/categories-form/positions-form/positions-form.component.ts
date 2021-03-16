import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionsFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
