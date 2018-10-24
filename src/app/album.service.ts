import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  result: any;
  constructor(private http: HttpClient) { }

  addAlbum(name, price) {
    const uri = 'http://localhost:4000/albums/add';
    const obj = {
      name: name,
      price: price
    };
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }

  getAlbums() {
    const uri = 'http://localhost:4000/albums';
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }));
  }

  editAlbum(id) {
    const uri = 'http://localhost:4000/albums/edit/' + id;
    return this
      .http
      .get(uri)
      .pipe(map(res => {
        return res;
      }));
  }

  updateAlbum(nid, title, artist, artist_alphabetical, genre, decade, year, description, created, updated, id) {
    const uri = 'http://localhost:4000/albums/update/' + id;

    const obj = {
      id: nid,
      title: title,
      artist: artist,
      artist_alphabetical: artist_alphabetical,
      genre: genre,
      decade: decade,
      year: year,
      description: description,
      created: created,
      updated: updated,
    };
    this.http.post(uri, obj).subscribe(res => console.log('Album updated.'));
  }

  deleteAlbum(id) {
    const uri = 'http://localhost:4000/albums/delete/' + id;

    return this.http.get(uri).pipe(map(res => {return res;}));
  }
}
