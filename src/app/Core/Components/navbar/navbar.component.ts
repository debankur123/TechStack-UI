
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    {
      label: 'Admin Section',
      icon: 'pi pi-user',
      items: [{ label: 'Categories', icon: 'pi pi-folder-open', routerLink: '/admin/categories' }],
    },
  ];

  constructor() {}

  ngOnInit() {
    
  }

  
}
