import React from 'react';

interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

interface CardProdutoProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (id: number) => void;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto, onEdit, onDelete }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p className="text-green-500">R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => onEdit(produto)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
            <button onClick={() => onDelete(produto.id)} className="bg-red-500 text-white px-2 py-1 rounded">Deletar</button>
        </div>
    );
};

export default CardProduto;
