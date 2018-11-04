import { AlbumService } from '../album.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatTable, MatTableDataSource, MatPaginator} from '@angular/material';
import { Album } from '../Album';

import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[] = ['title', 'artist', 'genre', 'year'];

  albums = this.albumService.getAlbums();

  albumsArray: Album[];

  dataSource = new MatTableDataSource<Album>(this.albumsArray);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private albumService: AlbumService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    const myObserver = {
      next: album => {
        this.albumsArray = album;
        this.dataSource.data = album;
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.albums.subscribe(myObserver);
  }

  deleteAlbum(id) {
    this.albumService.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}