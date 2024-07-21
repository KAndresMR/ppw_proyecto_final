import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BookInterface } from '../../Books/book.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BauthService } from '../../../servicesBook/bauth.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  book: BookInterface = {
    uid:'',
    title: '',
    author: '',
    genre: '',
    publicationYear: ''
  };

  constructor(
    private router: Router,
    private location: Location,
    private bauthService: BauthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.book = navigation.extras.state['book'] as BookInterface;
    }
  }

  ngOnInit() {}

  saveChanges() {
    this.bauthService.updateBook(this.book).subscribe(
      () => {
        console.log('Saving changes', this.book);
        this.router.navigate(['/book-list']);
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