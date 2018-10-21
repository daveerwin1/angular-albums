import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  title = 'Add Album';
  angForm: FormGroup;

  constructor(
    private albumservice: AlbumService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }
  addAlbum(name, price) {
      this.albumservice.addAlbum(name, price);
  }
  ngOnInit() {
  }

}
