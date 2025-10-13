export const Perfil = {
  EMPRESA: "EMPRESA",
  CLIENTE: "CLIENTE",
} as const;

export type Perfil = typeof Perfil[keyof typeof Perfil];
