import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if(usuario.token === '') {
      alert('Precisa estar logado!')
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