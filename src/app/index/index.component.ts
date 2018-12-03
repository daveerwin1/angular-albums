import { AlbumService } from '../album.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {MatSelect, MatTableDataSource, MatPaginator} from '@angular/material';
import { Album } from '../album';
import { Genre } from '../album';

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
  selectedGenre: string = '';
  selectedDecade: string = '';
  searchFilterValue: string = '';
  searchValue: String = '';
  totalResults: Number;
  filteredData: Album[];
  albumsObserver: Observer<Album[]>;

  constructor(private http: HttpClient, private albumService: AlbumService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.albumsObserver = {
      next: album => {
        this.albumsArray = album;
        this.dataSource.data = album;
        this.filteredData = album;
        this.genres = this.getFilterList("genre", true);
        this.decades = this.getFilterList("decade", false);
        this.totalResults = album.length;
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.albums.subscribe(this.albumsObserver);
  }

  applyFilter(filterValue?: string) {

    // w/o this the filters retrun nothing unless on first page
    this.dataSource.paginator.pageIndex = 0;

    // Reset dataSource
    this.dataSource.data = this.albumsArray;

    if (filterValue || filterValue === '') {
      this.searchFilterValue = filterValue.trim().toLowerCase();
    }

    this.dataSource.filter = this.searchFilterValue;

    this.dataSource.data = this.dataSource.filteredData;
    
    this.filterByGenre();
    this.filterByDecade();

    //console.log(this.dataSource);

    this.totalResults = this.dataSource.data.length;
  }

  filterByGenre() {
    if (this.selectedGenre) {
      this.dataSource.data = this.dataSource.data.filter(album => album.genre.includes(this.selectedGenre));
    }
  }

  filterByDecade() {
    if (this.selectedDecade) {
      this.dataSource.data = this.dataSource.data.filter(album => album.decade === this.selectedDecade);
    }
  }

  resetFilters() {
    // Reset dataSource
    this.dataSource.filter = '';
    this.dataSource.data = this.albumsArray;
    this.searchValue = '';
    this.selectedDecade = '';
    this.selectedGenre = '';
    this.totalResults = this.dataSource.data.length;
  }

  getFilterList(property, sortAsc: boolean): any[] {
    let unique = [];
    
    this.albumsArray.forEach(function(element) {

      let str = element[property];
      let result = str.split(",");
    
      result.forEach(function(element) {
        let str2 = element.trim();
        
        if (str2 !== '' && !unique.includes(str2)) {
          unique.push(str2);
        }
      });
    });
    unique.sort();

    if (!sortAsc) {
      unique.reverse();
    }
    
    return unique;
  }

  deleteAlbum(id) {
    this.albumService.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
