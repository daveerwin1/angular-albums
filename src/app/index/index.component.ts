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
      this.albums = this.sortAlbums(res);
    });
  }

  sortAlbums(object) {
    
    // Alphabetical sort.
    let object1 = object.sort((a, b) => a.artist_alphabetical.localeCompare(b.artist_alphabetical))

    // Sort by year in alphabetical.
    let object2 = object1.sort((a, b) => {
      a.artist_alphabetical.localeCompare(b.artist_alphabetical)
      
      if(a.artist_alphabetical === b.artist_alphabetical) {
        return a.year >= b.year ? 1 : -1;
      }
    })

    return object2;
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
