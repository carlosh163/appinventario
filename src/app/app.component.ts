import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demop';

  items: MenuItem[];
  visibleSidebar1;

  ngOnInit() {
    this.items = [{
        label: 'Usuario',
        items: [
            {label: 'Mi Perfil', icon: 'pi pi-fw pi-user-plus'},
            {label: 'Cerrar Sesión', icon: 'pi pi-fw pi-user-minus'}
        ]
    }];
}
}


