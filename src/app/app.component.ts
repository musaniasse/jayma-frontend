import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LoginService} from './core/service/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chezaida-web';

  private router = inject(Router);
  private loginService = inject(LoginService);

  logoutSubscription: Subscription | null | undefined = null;

  logout() {
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
  navigateHome(){
    this.router.navigate(['home']);
  }
}
