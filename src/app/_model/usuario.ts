import { Personal } from './personal';
import { Rol } from './rol';

export class Usuario{
    idUsuario: number;
    personal: Personal;
    username: string;
    password: string;
    enabled: boolean;

    roles:Rol[];
}