import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomerListComponent} from "./pages/customer-list/customer-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bbvaweb';
}
