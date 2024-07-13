import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

location = inject(Location)

  cancel() {
    this.location.back();
  }
}
