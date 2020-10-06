import { HomeEventoInter } from './home-evento.interface';

export interface HomeEventoInter {
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
