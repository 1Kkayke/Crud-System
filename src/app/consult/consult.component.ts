import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { ClientService } from '../services/client.service';
import { Client } from '../register/client';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-consult',
  imports: [MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit{
  NameSearch: string = ' ';
  ListClients: Client[] = [];
  columnsTable: string[] = ['Id','Name','Cpf','DateOfBirth','Rg','Phone','Email','Actions']
  client: string = ' ';

  constructor(
    private service: ClientService,
  private router: Router){

  }

  ngOnInit(){
    this.ListClients = this.service.searchClient('');
  }

  search(){
    this.ListClients = this.service.searchClient(this.NameSearch);
  }

  preEdit(id: string){
    console.log('id recebido :',id)
    this.router.navigate(['/register'], { queryParams: {"id": id }})
  }

}
