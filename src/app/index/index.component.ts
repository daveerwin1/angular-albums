import { AlbumService } from '../album.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {MatTable, MatTableDataSource, MatPaginator} from '@angular/material';
import { Album } from '../Album';
import { Genre } from '../Album';

import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[] = ['title', 'artist', 'genre', 'year'];
  albums: Observable<Album[]> = this.albumService.getAlbums();
  albumsArray: Album[];
  dataSource = new MatTableDataSource<Album>(this.albumsArray);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  genres: any[];
  decades: any[];
  selectedGenre: string;
  selectedDecade: string;

  albumsObserver: Observer<Album[]>;

  constructor(private http: HttpClient, private albumService: AlbumService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.albumsObserver = {
      next: album => {
        this.albumsArray = album;
        this.dataSource.data = album;
        this.genres = this.getFilterList("genre");
        this.decades = this.getFilterList("decade");
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.albums.subscribe(this.albumsObserver);
  }

  getFilterList(property): any[] {
    let unique = [];
    
    this.albumsArray.forEach(function(element) {

      let str = element[property];
      let result = str.split(",");
    
      result.forEach(function(element) {
        let str2 = element.trim();
        
        if (!unique.includes(str2)) {
          unique.push(str2);
        }
      });
    });
    return unique;
  }

  filterByGenre() {
    this.albumsArray = this.albumsArray.filter(album => album.genre.includes(this.selectedGenre));
    this.dataSource.data = this.albumsArray;
  }

  filterByDecade() {
    this.albumsArray = this.albumsArray.filter(album => album.decade.includes(this.selectedDecade))
    this.dataSource.data = this.albumsArray;
  }

  deleteAlbum(id) {
    this.albumService.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}