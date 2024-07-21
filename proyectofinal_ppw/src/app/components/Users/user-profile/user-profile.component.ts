import { Component, inject, OnInit} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserInterface } from '../../Register/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  user: UserInterface = {
    uid:'',
    username:'',
    email:'',
    password:'',
    isAdmin:false
  };

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'] as UserInterface;
    }
  }

  ngOnInit() {}

  saveChanges() {
    this.authService.updateUser(this.user).subscribe(
      () => {
        console.log('Saving changes', this.user);
        this.router.navigate(['/user-list']);
      },
      (error) => {
        console.error('Error saving changes:', error);
      }
    );
  }
  cancel() {
    this.location.back();
  }

}
