import { PromoInter } from './promo.interface';

export interface PromoInter {
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
