import { Injectable } from '@angular/core';
import { Client } from '../register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = 'CLIENTS';

  constructor(){ }

  save(client: Client): boolean{
    const storage = this.getStorage();
    storage.push(client);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
    return true;

    return false;
  }

  searchClient(NameSearch: string): Client[] {
    
    const clients = this.getStorage();
    
    if(!NameSearch){
      return clients;
    }
    
    const lowerCaseSearch = NameSearch.toLowerCase();
    
    return clients.filter(client => 
      client.name?.toLowerCase().includes(lowerCaseSearch)
    );
  }

  searchClientById(id: string): Client | undefined{
    const clients = this.getStorage();
    return clients.find(client => client.id === id)

  }
  
  private getStorage(): Client[] {
    const __clientsRepository = localStorage.getItem(ClientService.REPO_CLIENTS);
    
    if (__clientsRepository){
      const __clients: Client[] = JSON.parse(__clientsRepository);
      return __clients
    }

    const __clients: Client[] = [];
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(__clients));
    return __clients;
  }
}
