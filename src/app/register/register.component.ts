import { Component, OnInit,inject } from '@angular/core';
import {FlexLayoutModule } from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Client } from './client';
import { ClientService } from '../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { NgxMaskDirective,provideNgxMask,NgxMaskConfig} from 'ngx-mask'
import { ApiUfsService } from '../services/UFS/api-ufs.service';
import { Municipies, States } from './brasilapi.models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
    CommonModule],
  
  providers:[provideNgxMask(),],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  implements OnInit{
  client: Client = Client.newClient();
  updating: boolean = false;
  states : States[] = [];
  municipies : Municipies[] = []

  constructor(
    private clientService: ClientService,
    private routerActivated : ActivatedRoute,
    private router : Router,
    private brasilApiService: ApiUfsService,
  ){} 
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
  this.loadUfs();
 
}

  loadMunicipies(event: MatSelectChange){
    const ufSelected = event.value;
    this.brasilApiService.listMunicipies(ufSelected).subscribe({
    next: listaMunicipios => this.municipies = listaMunicipios,
    error: erro => console.log('ocorreu um erro: ', erro)
  })
}

  loadUfs(){
    //observable é um padrão que é sempre observado, e quando ocorre uma mudança, notifica o subscriber
    //subscribe é o padrão que sera notificado, recebera os dados da mudança
    this.brasilApiService.listUFS().subscribe({
      next: (states) => {
        this.states = states;
        console.log("lista estados", this.states);
      },
      error: erro => console.log('ocorreu erro', erro)
    })
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
