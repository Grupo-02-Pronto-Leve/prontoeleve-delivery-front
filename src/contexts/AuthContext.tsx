/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState } from "react"

import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"
import { Perfil } from "../models/Perfil"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<UsuarioLogin | null>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
        perfil: Perfil.CLIENTE
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin): Promise<UsuarioLogin | null> {
    setIsLoading(true);
    try {
        const usuarioRetornado = await login(`/usuarios/logar`, usuarioLogin, setUsuario);
        ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
        return usuarioRetornado;
    } catch (error) {
        ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
        return null;
    } finally {
        setIsLoading(false);
    }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: "",
            perfil: Perfil.CLIENTE
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}