import React from 'react';

interface DeletarProdutoProps {
    id: number;
    onConfirm: (id: number) => void;
    onCancel: () => void;
}

const DeletarProduto: React.FC<DeletarProdutoProps> = ({ id, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg">Tem certeza que deseja deletar este produto?</h2>
                <div className="mt-4">
                    <button onClick={() => onConfirm(id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Sim</button>
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Não</button>
                </div>
            </div>
        </div>
    );
};

export default DeletarProduto;
