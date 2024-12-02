import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PROVINCES = [
  {
    id: 1,
    name: "Benguela",
  },
  {
    id: 2,
    name: "Bengo",
  },
  {
    id: 3,
    name: "Bie",
  },
  {
    id: 4,
    name: "Cabinda",
  },
  {
    id: 5,
    name: "Cuanza norte",
  },
  {
    id: 6,
    name: "Cuanza Sul",
  },
  {
    id: 7,
    name: "Huambo",
  },
  {
    id: 8,
    name: "Huila",
  }, {
    id: 9,
    name: "Moxico",
  },
  {
    id: 10,
    name: "Namibe",
  }, {
    id: 11,
    name: "Luanda",
  }, {
    id: 12,
    name: "Lunda Norte",
  },
  {
    id: 13,
    name: "Luanda Sul",
  }, {
    id: 14,
    name: "Zaire",
  }, {
    id: 15,
    name: "Uige",
  }, {
    id: 16,
    name: "Cuando Cubango",
  }, {
    id: 17,
    name: "Malange",
  }, {
    id: 18,
    name: "Cunene",
  },
]

export const MUNICIPIOS = [
  {
    id: 1,
    name: "Viana",
  }, {
    id: 2,
    name: "Luanda",
  }, {
    id: 3,
    name: "Icole Bengo",
  }, {
    id: 4,
    name: "Cacuaco",
  }, {
    id: 5,
    name: "Cazenga",
  }, {
    id: 6,
    name: "Samba",
  }, {
    id: 7,
    name: "Talatona",
  },
]

export const CATE = [
  {
    id: 1,
    name: "Amador"
  },
  {
    id: 2,
    name: "Profissional"
  },
  {
    id: 3,
    name: "Pesado"
  }
]

export const COLORS = [
  { id: 1, name: "Abóbora" },
  { id: 2, name: "Açafrão" },
  { id: 3, name: "Amarelo" },
  { id: 4, name: "Âmbar" },
  { id: 5, name: "Ameixa" },
  { id: 6, name: "Amêndoa" },
  { id: 7, name: "Ametista" },
  { id: 8, name: "Anil" },
  { id: 9, name: "Azul" },
  { id: 10, name: "Bege" },
  { id: 11, name: "Bordô" },
  { id: 12, name: "Branco" },
  { id: 13, name: "Bronze" },
  { id: 14, name: "Cáqui" },
  { id: 15, name: "Caramelo" },
  { id: 16, name: "Carmesim" },
  { id: 17, name: "Carmim" },
  { id: 18, name: "Castanho" },
  { id: 19, name: "Cereja" },
  { id: 20, name: "Chocolate" },
  { id: 21, name: "Ciano" },
  { id: 22, name: "Cinza" },
  { id: 23, name: "Cinzento" },
  { id: 24, name: "Cobre" },
  { id: 25, name: "Coral" },
  { id: 26, name: "Creme" },
  { id: 27, name: "Damasco" },
  { id: 28, name: "Dourado" },
  { id: 29, name: "Escarlate" },
  { id: 30, name: "Esmeralda" },
  { id: 31, name: "Ferrugem" },
  { id: 32, name: "Fúcsia" },
  { id: 33, name: "Gelo" },
  { id: 34, name: "Grená" },
  { id: 35, name: "Gris" },
  { id: 36, name: "Índigo" },
  { id: 37, name: "Jade" },
  { id: 38, name: "Jambo" },
  { id: 39, name: "Laranja" },
  { id: 40, name: "Lavanda" },
  { id: 41, name: "Lilás" },
  { id: 42, name: "Limão" },
  { id: 43, name: "Loiro" },
  { id: 44, name: "Magenta" },
  { id: 45, name: "Malva" },
  { id: 46, name: "Marfim" },
  { id: 47, name: "Marrom" },
  { id: 48, name: "Mostarda" },
  { id: 49, name: "Negro" },
  { id: 50, name: "Ocre" },
  { id: 51, name: "Oliva" },
  { id: 52, name: "Ouro" },
  { id: 53, name: "Pêssego" },
  { id: 54, name: "Prata" },
  { id: 55, name: "Preto" },
  { id: 56, name: "Púrpura" },
  { id: 57, name: "Rosa" },
  { id: 58, name: "Roxo" },
  { id: 59, name: "Rubro" },
  { id: 60, name: "Salmão" },
  { id: 61, name: "Sépia" },
  { id: 62, name: "Terracota" },
  { id: 63, name: "Tijolo" },
  { id: 64, name: "Turquesa" },
  { id: 65, name: "Uva" },
  { id: 66, name: "Verde" },
  { id: 67, name: "Vermelho" },
  { id: 68, name: "Vinho" },
  { id: 69, name: "Violeta" },
  { id: 70, name: "Amarelo-avermelhado" },
  { id: 71, name: "Amarelo-canário" },
  { id: 72, name: "Amarelo-cinzento" },
  { id: 73, name: "Amarelo-enxofre" },
  { id: 74, name: "Amarelo-esverdeado" },
  { id: 75, name: "Amarelo-fosco" },
  { id: 76, name: "Amarelo-gualdo" },
  { id: 77, name: "Amarelo-limão" },
  { id: 78, name: "Amarelo-ocre" },
  { id: 79, name: "Amarelo-ouro" },
  { id: 80, name: "Amarelo-palha" },
  { id: 81, name: "Amarelo-torrado" },
  { id: 82, name: "Azul-ardósia" },
  { id: 83, name: "Azul-celeste" },
  { id: 84, name: "Azul-cobalto" },
  { id: 85, name: "Azul-ferrete" },
  { id: 86, name: "Azul-marinho" },
  { id: 87, name: "Azul-pavão" },
  { id: 88, name: "Azul-petróleo" },
  { id: 89, name: "Azul-piscina" },
  { id: 90, name: "Azul-turquesa" },
  { id: 91, name: "Azul-violeta" },
  { id: 92, name: "Branco-sujo" },
  { id: 93, name: "Castanho-avermelhado" },
  { id: 94, name: "Cinza-ardósia" },
  { id: 95, name: "Cinzento-azulado" },
  { id: 96, name: "Cinzento-pérola" },
  { id: 97, name: "Rosa-bebê" },
  { id: 98, name: "Rosa-choque" },
  { id: 99, name: "Verde-abacate" },
  { id: 100, name: "Verde-água" },
  { id: 101, name: "Verde-alface" },
  { id: 102, name: "Verde-amarelo" },
  { id: 103, name: "Verde-azul" },
  { id: 104, name: "Verde-bandeira" },
  { id: 105, name: "Verde-bronze" },
  { id: 106, name: "Verde-cinza" },
  { id: 107, name: "Verde-esmeralda" },
  { id: 108, name: "Verde-garrafa" },
  { id: 109, name: "Verde-mar" },
  { id: 110, name: "Verde-militar" },
  { id: 111, name: "Verde-musgo" },
  { id: 112, name: "Verde-oliva" },
  { id: 113, name: "Vermelho-alaranjado" },
  { id: 114, name: "Vermelho-cereja" },
  { id: 115, name: "Vermelho-púrpura" },
  { id: 116, name: "Vermelho-tostado" },
  { id: 117, name: "Amarelo-claro" },
  { id: 118, name: "Amarelo-escuro" },
  { id: 119, name: "Azul-claro" },
  { id: 120, name: "Azul-escuro" },
  { id: 121, name: "Castanho-claro" },
  { id: 122, name: "Castanho-escuro" },
  { id: 123, name: "Cinza-claro" },
  { id: 124, name: "Cinza-escuro" },
  { id: 125, name: "Laranja-claro" },
  { id: 126, name: "Laranja-escuro" },
  { id: 127, name: "Marrom-claro" },
  { id: 128, name: "Marrom-escuro" }
]