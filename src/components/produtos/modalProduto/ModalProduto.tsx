import React from 'react';

interface ModalProdutoProps {
    produto?: { nome: string; preco: number; descricao: string };
    onClose: () => void;
}

const ModalProduto: React.FC<ModalProdutoProps> = ({ produto, onClose }) => {
    if (!produto) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold">{produto.nome}</h2>
                <p>{produto.descricao}</p>
                <p className="text-green-500">R$ {produto.preco.toFixed(2)}</p>
                <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Fechar</button>
            </div>
        </div>
    );
};

export default ModalProduto;
