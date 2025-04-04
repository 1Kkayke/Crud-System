import { Component, OnInit } from '@angular/core';
import {FlexLayoutModule } from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { Client } from './client';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
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
export class RegisterComponent  implements OnInit{
  client: Client = Client.newClient();
  updating: boolean = false;

  constructor(private clientService: ClientService,
    private routerActivated : ActivatedRoute
  ) {
  } 

  ngOnInit(): void {
    this.routerActivated.queryParamMap.subscribe((queryParamMaped: any) => {
      const params = queryParamMaped['params'];
      const id = params['id'];
      if(id){
        this.updating = true;
        this.client = this.clientService.searchClientById(id) || Client.newClient();
      }
    });
  }

  save(){
    if(this.clientService.save(this.client)){
      alert('User created')
      this.client = Client.newClient();
    }else{
      alert('Fail in creation')
    }
  }
}
