import React from 'react';
import CardProduto from './../cardProduto/CardProduto';

interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

interface ListaProdutoProps {
    produtos: Produto[];
    onEdit: (produto: Produto) => void;
    onDelete: (id: number) => void;
}

const ListaProduto: React.FC<ListaProdutoProps> = ({ produtos, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map(produto => (
                <CardProduto key={produto.id} produto={produto} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default ListaProduto;
