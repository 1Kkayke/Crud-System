import { Component } from '@angular/core';
import {FlexLayoutModule } from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { Client } from './client';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  client: Client = Client.newClient();

  constructor(private clientService: ClientService) {
  }

  save(){
    if(this.clientService.save(this.client)){
      alert('User created')
    }else{
      alert('Fail in creation')
    }
  }
}
