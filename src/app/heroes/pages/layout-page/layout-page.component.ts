import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listar', icon:'list', url:'./list'},
    { label: 'Nuevo', icon:'add', url:'./new'},
    { label: 'Busqueda', icon:'search', url:'./search'}
  ]
}
