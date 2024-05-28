import { Component, inject} from '@angular/core';
import { User } from 'firebase/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  firebaseService = inject(AuthService);

  constructor() {}

  form = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])

  })

  ngOnInit() {

  }

  async submit() {
    console.log(this.form.value)
    return
    if (this.form.valid) {
      this.firebaseService.signIn(this.form.value as User)
        .then(resp => {
          console.log(' ___ ',resp)
        })
    }

  }


}
