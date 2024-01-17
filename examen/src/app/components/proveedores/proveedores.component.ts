import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proveedor } from '../../models/proveedor';
import { ProveedoresService } from './../../services/proveedores.service';
import {CommonModule} from '@angular/common';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  public titulo: string;
  public proveedores: Proveedor[];
  public isAgregar: boolean;
  public nombre: string;
  public descripcion: string;
  
  constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private servicio: ProveedoresService
	){
		this.titulo = 'Adminsitración de proveedores';
    this.proveedores = [];
    this.isAgregar = false;
    this.nombre="";
    this.descripcion="";
	}

	ngOnInit() {
    this.nombre="Adrian Vazquez";
    this.descripcion="descripcion";
    this.isAgregar = false;
    this.servicio.obtenerProveedores().subscribe(data => {
      this.proveedores = data;
    });
    
  }

  borrarConfirm(proveedorID: number){proveedorID
    this.servicio.deleteProveedor(proveedorID).subscribe(
			data => {
        this.proveedores = [];
        this.ngOnInit();
				// if(data.mensaje == 'true'){
          
				// } else {
				// 	alert("Ocurrió un error al eliminar el proyecto");
				// }
				
			},	
			error => {
				console.log(<any>error);
			}
		);
  }
  
  change(){
    this.isAgregar = true;
  }

  agregar(){
    this.servicio.agregarProveedor(this.nombre, this.descripcion).subscribe(
			data => {
        this.proveedores = [];
        this.ngOnInit();
				// if(data.mensaje == 'true'){
          
				// } else {
				// 	alert("Ocurrió un error al eliminar el proyecto");
				// }
				
			},	
			error => {
				console.log(<any>error);
			}
		);
  }

}
