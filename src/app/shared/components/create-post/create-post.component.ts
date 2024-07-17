import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopupData } from '../../interfaces/post-create.interface';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @Input() visible: boolean = false;
  @Output() cerrarPopup = new EventEmitter<PopupData>();
  popupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.popupForm = this.formBuilder.group({
      titulo: [''],
      descripcion: ['']
    });
  }

  cerrar(): void {
    this.cerrarPopup.emit(this.popupForm.value);
  }
}
