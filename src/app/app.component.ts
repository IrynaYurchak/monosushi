import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent],  // Додано RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Виправлено styleUrls
})
export class AppComponent {
  title = 'monosushi';
}
