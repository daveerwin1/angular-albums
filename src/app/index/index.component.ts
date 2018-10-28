import { AlbumService } from '../album.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  albums: any;

  constructor(private http: HttpClient, private service: AlbumService) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.service.getAlbums().subscribe(res => {
      this.albums = this.alphabetizeAlbums(res);
    });
  }

  alphabetizeAlbums(object) {
    object.sort((a, b) => a.artist_alphabetical.localeCompare(b.artist_alphabetical))
    return object;
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
