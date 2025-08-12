import type Tema from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    disponivel: boolean;
    foto: string;
    tema: Tema | null;
    usuario: Usuario | null;
}