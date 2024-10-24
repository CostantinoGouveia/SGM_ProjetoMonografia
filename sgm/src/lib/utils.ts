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