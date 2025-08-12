import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if(usuario.token === '') {
      ToastAlerta("Opa, opa... Você precisa estar logado!", "erro")
      navigate('/')
    }
  }, [usuario.token])
  return (
    <div>
      <div>
        Perfil
        <p>Nome: {usuario.nome}</p>
        <p>Email: {usuario.usuario}</p>
      </div>
    </div>
  )
}

export default Perfil