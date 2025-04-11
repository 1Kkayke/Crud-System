import { Injectable } from '@angular/core';
import { Client } from '../../register/client';

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

  update(client: Client){
    const storage = this.getStorage();
    storage.forEach(c =>{
      if(c.id === client.id){
        Object.assign(c,client);
      }
    })
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }
  
  deleteUser(client: Client): Boolean{
    const storage = this.getStorage();
    
    const NewList = storage.filter(c =>c.id !== client.id)
    
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(NewList));

    return NewList.length < storage.length;
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
