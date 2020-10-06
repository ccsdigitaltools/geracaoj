import { EventoInter } from './evento.interface';

export interface EventoInter {
    id?: string;
    nome: string;
    data: Date;
    tema: string;
    descricao: string;
    endereco: string;
    foto: string;
    uf: string;
    tipo: string;
    destaque: boolean;
    aprovacao: boolean;
}
