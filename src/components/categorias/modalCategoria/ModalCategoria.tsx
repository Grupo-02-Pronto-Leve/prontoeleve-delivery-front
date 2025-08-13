import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalCategoria.css';
import FormCategoria from '../formCategoria/FormCategoria';

function ModalCategoria() {
    return (
        <>
        <div className="flex justify-center mt-6">
            <Popup
                trigger={
                    <button 
                        className='bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-500 transition'>
                        Adicionar nova categoria saudável
                    </button>
                }
                modal
            >
                <FormCategoria />
            </Popup>
        </div>
        </>
    );
}

export default ModalCategoria;
