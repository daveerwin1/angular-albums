import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  album: any;
  title = 'Add Album';
  angForm: FormGroup;
  pageTitle = 'Add Album';

  constructor(
    private albumservice: AlbumService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      artist: ['', Validators.required],
      artist_alphabetical: ['', Validators.required],
      genre: ['', Validators.required],
      decade: ['', Validators.required],
      year: ['', Validators.required],
      description: [''],
      created: ['', Validators.required],
      updated: ['', Validators.required]
   });
  }
  addAlbum(
    id,
    title,
    artist,
    artist_alphabetical,
    genre,
    decade,
    year,
    description,
    created,
    updated) {
      this.albumservice.addAlbum(id, title, artist, artist_alphabetical, genre, decade, year, description, created, updated);
  }
  ngOnInit() {
  }

}
