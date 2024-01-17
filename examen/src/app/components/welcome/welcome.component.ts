import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeService } from './../../services/welcome.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  providers: [WelcomeService]
})
export class WelcomeComponent implements OnInit  {
  candidato: any = "";
  version: any = "";

  constructor(private servicio: WelcomeService,
              private router: Router) { }

  ngOnInit() {
    this.servicio.obtenerCandidato().subscribe(data => {
      this.candidato = data.candidato;
    });

    this.servicio.obtenerVersion().subscribe(data => {
      this.version = data.version;
    });
  }

  continuar() {
    this.router.navigate(['/proveedores']);
  }
}
