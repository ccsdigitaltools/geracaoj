import { HomeNoticiaInter } from './home-noticia.interface';

export interface HomeNoticiaInter {
    id?: string;
    titulo: string;
    categoria: string;
    autor: string;
    descricao: string;
    foto: string;
    vencimento: Date;
    publicacao: Date;
    destaque: boolean;
    aprovacao: boolean;
    tipo: string;
}
