import { Component } from '@angular/core';
import {FlexLayoutModule } from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'

@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,MatCardModule,FormsModule,MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
