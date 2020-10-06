import { HomePromoInter } from './home-promo.interface';

export interface HomePromoInter {
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
