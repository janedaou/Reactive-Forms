import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrl: './name-editor.component.scss'
})
export class NameEditorComponent {
  name = new FormControl('');
  updateName() {
    this.name.setValue('Jane');
  }

}
