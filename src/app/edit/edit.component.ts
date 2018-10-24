import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  album: any;
  angForm: FormGroup;
  pageTitle = 'Edit Album';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AlbumService,
    private fb: FormBuilder) {
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
      updated: ['', Validators.required],
    });
  }

  updateAlbum(
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
    this.route.params.subscribe(params => {
      this.service.updateAlbum(id, title, artist, artist_alphabetical, genre, decade, year, description, created, updated, params['id']);
      this.router.navigate(['index']);
    });
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.album = this.service.editAlbum(params['id']).subscribe(res => {
        this.album = res;
      });
    });
  }
}
