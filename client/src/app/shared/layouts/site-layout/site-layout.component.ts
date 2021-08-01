import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterializeInstance, MaterializeService } from '../../services/materialize.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floatingButton') floatingButton: ElementRef
  @ViewChild('sidenav') sidenavRef: ElementRef
  sidenav: MaterializeInstance

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
      url: '/clients',
      name: 'Клиенты'
    },
    {
      url: '/history',
      name: 'Заказы'
    },
    {
      url: '/order',
      name: 'Новый заказ'
    },
    {
      url: '/categories',
      name: 'Категории товаров и услуг'
    }
  ]

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    MaterializeService.initFloatButton(this.floatingButton)
    this.sidenav = MaterializeService.initSidenav(this.sidenavRef)
  }

  logout(event: Event): void {
    event.preventDefault()
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

  openSidenav(): void {
    this.sidenav.open()
  }

  closeSidenav(): void {
    this.sidenav.close()
  }
}
