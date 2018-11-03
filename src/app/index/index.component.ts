import { AlbumService } from '../album.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatTable} from '@angular/material';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  albums: any;


  displayedColumns: string[] = ['title', 'artist', 'genre', 'year'];
  dataSource: any;

  constructor(private http: HttpClient, private albumService: AlbumService) {}

  ngOnInit() {
    this.getAlbums();
    this.dataSource = this.albums;
    
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe(res => {
      this.albums = this.sortAlbums(res);
    });
  }

  sortAlbums(object) {
    
    // Alphabetical sort.
    object.sort(
      function(a, b) {
        if(a.artist_alphabetical === b.artist_alphabetical) {
          return a.year - b.year;
        }
        else {
          return a.artist_alphabetical.localeCompare(b.artist_alphabetical);
        }
      }
    );

    //console.log(object);

    // Sort by year in alphabetical.
   

    return object;
  }

  deleteAlbum(id) {
    this.albumService.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
