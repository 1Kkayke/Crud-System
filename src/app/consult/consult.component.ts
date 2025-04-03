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


@Component({
  selector: 'app-consult',
  imports: [MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent implements OnInit{

  ListClients: Client[] = [];
  
  constructor(
    private service: ClientService
  ){

  }

  ngOnInit(){
    this.ListClients = this.service.searchClient('');
  }


}
