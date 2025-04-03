import { Injectable } from '@angular/core';
import { Client } from '../register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = 'CLIENTS';

  constructor(){ }

  save(client: Client){
    const storage = this.getStorage();
    storage.push(client);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  getStorage(): Client[] {
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
