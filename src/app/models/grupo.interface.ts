import { GrupoInter } from './grupo.interface';

export interface GrupoInter {
    id?: string;
    nome: string;
    genero: string;
    tipo: string;
    localidade: string;
    uf: string;
    foto: string;
    integrantes: string;
    descricao: string;
    musicas: string;
    situacao: string;
    aprovacao: boolean;
}
