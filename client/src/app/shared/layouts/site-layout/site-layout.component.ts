import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MaterializeService } from "../../services/materialize.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floatingButton') floatingButton

  listLinks = [
    {
      url: '/overview',
      name: 'Обзор'
    },
    {
      url: '/analytics',
      name: 'Аналитика'
    },
    {
      url: '/history',
      name: 'История'
    },
    {
      url: '/order',
      name: 'Заказ'
    },
    {
      url: '/categories',
      name: 'Ассортимент'
    }
  ]

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    MaterializeService.initFloatButton(this.floatingButton)
  }

  logout(event: Event): void {
    event.preventDefault()
    this.authService.logOut()
    this.router.navigate(['/login'])
  }
}
