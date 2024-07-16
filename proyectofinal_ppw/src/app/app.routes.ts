import { Routes } from '@angular/router';

import { LoginComponent } from './components/Login/login.component';
import { RegisterComponent } from './components/Register/register.component';

// Books
import { AddBookComponent } from './components/Books/add-book/add-book.component';
import { BookDetailsComponent } from './components/Books/book-details/book-details.component';
import { BookListComponent } from './components/Books/book-list/book-list.component';
import { EditBookComponent } from './components/Books/edit-book/edit-book.component';


//Dashboard
import { UserDashboardComponent } from './components/Dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/Dashboard/admin-dashboard/admin-dashboard.component';

//Users
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { UserProfileComponent } from './components/Users/user-profile/user-profile.component';



export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'add-book', component: AddBookComponent },
    { path: 'book-details', component: BookDetailsComponent },
    { path: 'book-list', component: BookListComponent },
    { path: 'edit-book', component: EditBookComponent },

    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
  
    { path: 'user-list', component: UserListComponent },
    { path: 'user-profile', component: UserProfileComponent },

];
