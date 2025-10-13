import type { Perfil } from "./Perfil";
import type Produto from "./Produto";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    perfil: Perfil;
    produto?: Produto[] | null;
}