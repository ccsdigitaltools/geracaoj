import { NoticiaInter } from './noticia.interface';

export interface NoticiaInter {
    id?: string;
    titulo: string;
    categoria: string;
    autor: string;
    descricao: string;
    foto: string;
    vencimento: Date;
    publicacao: Date;
    destaque: boolean;
    tipo: string;
    aprovacao: boolean;
}
