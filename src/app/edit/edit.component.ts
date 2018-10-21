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
  title = 'Edit Album';
  constructor(private route: ActivatedRoute, private router: Router, private service: AlbumService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  updateAlbum(name, price) {
    this.route.params.subscribe(params => {
      this.service.updateAlbum(name, price, params['id']);
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
