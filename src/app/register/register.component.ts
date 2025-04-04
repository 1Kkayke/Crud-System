import { Component, OnInit,inject } from '@angular/core';
import {FlexLayoutModule } from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Client } from './client';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { NgxMaskDirective,provideNgxMask,NgxMaskConfig} from 'ngx-mask'
@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,],
  
  providers:[provideNgxMask(),],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  implements OnInit{
  client: Client = Client.newClient();
  updating: boolean = false;

  constructor(private clientService: ClientService,
    private routerActivated : ActivatedRoute,
    private router : Router,
  ) {
  } 
  private _snackBar = inject(MatSnackBar);
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
    if(!this.updating){
      if(this.clientService.save(this.client)){
        this._snackBar.open('User Created', 'Close', {
          duration: 2000
        })
        this.client = Client.newClient();
      }else{
        this._snackBar.open('Fail in Formulary', 'Close', {
          duration: 2000
        })
      }
    }else{
      this.clientService.update(this.client);
      this._snackBar.open('User Updated', 'Close', {
        duration: 2000
      })
      this.router.navigate(['/consult'])
    }
    
  }
}
