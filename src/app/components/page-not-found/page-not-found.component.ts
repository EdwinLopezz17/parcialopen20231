import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  rutaNoEncontrada: string;

  constructor(private _router: Router) {
    this.rutaNoEncontrada = this._router.url;
  }

  retornarAHome() {
    this._router.navigate(['/home']);
  }
}
