/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
import type UsuarioLogin from "../models/UsuarioLogin";
// import { Perfil } from "../models/Perfil";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (url: string, dados: object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// export const login = async (url: string, dados: object, setDados: Function) => {
//     const resposta = await api.post(url, dados)
//     setDados(resposta.data)
// }

export const login = async (
  url: string,
  dados: object,
  setDados: (dados: UsuarioLogin) => void
): Promise<UsuarioLogin> => {
  const resposta = await api.post<UsuarioLogin>(url, dados);
  setDados(resposta.data);
  return resposta.data;
};

// export const login = async (
//   url: string,
//   dados: object,
//   setDados: (dados: UsuarioLogin) => void
// ): Promise<UsuarioLogin> => {
//   const resposta = await api.post<UsuarioLogin>(url, dados);
//   const usuarioRetornado = resposta.data;

//   // ✅ Verificação de segurança: garantir que perfil esteja presente
//   if (!usuarioRetornado.perfil) {
//     console.warn("Campo 'perfil' ausente na resposta. Aplicando valor padrão.");
//     usuarioRetornado.perfil = Perfil.CLIENTE; // ou trate como erro, se preferir
//   }

//   setDados(usuarioRetornado);
//   return usuarioRetornado;
// };

export const buscar = async (url: string, setDados: Function, header: object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: object, setDados: Function, header: object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: object, setDados: Function, header: object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: object) => {
    await api.delete(url, header)
}