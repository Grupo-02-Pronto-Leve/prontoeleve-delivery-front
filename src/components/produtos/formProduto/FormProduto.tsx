import React, { useState } from 'react';

interface Produto {
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
}

interface FormProdutoProps {
    produto?: Produto;
    onSubmit: (produto: Produto) => void;
}

const FormProduto: React.FC<FormProdutoProps> = ({ produto, onSubmit }) => {
    const [nome, setNome] = useState(produto?.nome || '');
    const [preco, setPreco] = useState(produto?.preco || 0);
    const [descricao, setDescricao] = useState(produto?.descricao || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: produto?.id, nome, preco, descricao });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do Produto"
                className="border p-2 mb-2 w-full"
                required
            />
            <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
                placeholder="Preço"
                className="border p-2 mb-2 w-full"
                required
            />
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
                className="border p-2 mb-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
        </form>
    );
};

export default FormProduto;
