import Popup from 'reactjs-popup';
import FormProduto from '../formProduto/FormProduto';

import 'reactjs-popup/dist/index.css';
import './ModalProduto.css';

function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-emerald'>
                        Novo Produto
                    </button>
                }
                modal
            >
                <FormProduto />
            </Popup>
        </>
    );
}

export default ModalProduto;
