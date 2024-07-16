import { Component ,OnInit,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, withFetch} from '@angular/common/http';//API Fecth
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'proyectofinal_ppw';
  authService = inject(AuthService)

  currentRoute: string='';//Cambio currentRoute: string;

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {//cambio this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          uid:user.uid,
          email:user.email!,
          username: user.displayName!,
          isAdmin: user.isAnonymous,
        });

      }else{
        this.authService.currentUserSig.set(null);
      }
    });
}

  logout(): void {
    console.log('logout');
  }

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isAuthRoute(): boolean {
    return this.currentRoute === '/login' || 
    this.currentRoute === '/register' || 
    this.currentRoute === '/admin-dashboard' ||
    this.currentRoute === '/user-dashboard' ||
    this.currentRoute === '/add-book' ||
    this.currentRoute === '/book-details' ||
    this.currentRoute === '/book-list' || 
    this.currentRoute === '/edit-book' ||
    this.currentRoute === '/user-list' ||
    this.currentRoute === '/user-profile' 
    ;
  }
}
