import { v4 as uuidv4 } from 'uuid';

export class Client {
    id!: string;
    name!: string;
    cpf!: string;
    rg!: string;
    birthDate!: string;
    email?: string;
    phone?: string;

    static newClient() {
        let client = new Client();
        
        client.id = uuidv4();
        
        return client;
    }

}