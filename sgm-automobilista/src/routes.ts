"use client"

import { Multa } from "./entities/Multa";
import { Alertaroubo } from "./entities/Alertaroubo";
import { Automobilista } from "./entities/Automobilista";
import { Bi } from "./entities/Bi";
import { Viatura } from "./entities/Viatura";
import { Cartaconducao } from "./entities/Cartaconducao";
import { Categoriacarta } from "./entities/Categoriacarta";
import { Contacto } from "./entities/Contacto";
import { Endereco } from "./entities/Endereco";
import { Ficheiro } from "./entities/Ficheiro";
import { Funcionario } from "./entities/Funcionario";
import { Infracao } from "./entities/Infracao";
import { Livrete } from "./entities/Livrete";
import { Marca } from "./entities/Marca";
import { Municipio } from "./entities/Municipio";
import { Pais } from "./entities/Pais";
import { Pessoa } from "./entities/Pessoa";
import { Provincia } from "./entities/Provincia";
import { Serivicoviatura } from "./entities/Serivicoviatura";
import { Tipoinfracao } from "./entities/Tipoinfracao";
import { Tiporoubo } from "./entities/Tiporoubo";
import { Titulopropriedade } from "./entities/Titulopropriedade";
import { Pagamentomulta } from "./entities/Pagamentomulta";

export const BASE_URL = "http://localhost:3000";
export const APP_NAME = "SGM";
export const IMAGE_URL = "https://www.enanza.ao/storage/corporate/";
 
export const login = async (email:string, password:string) => {
  const response = await fetch(`${BASE_URL}/loginA`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bi: email, password: password }),
  });
  return await response.json();
};
 
export const saveLocalStorageToken = (token:string) => {
  window.localStorage.setItem(`${APP_NAME}_`, token);
};

export const saveLocalStorageUser = (user:string) => {
  window.localStorage.setItem(`${APP_NAME}_USER`, user);
};

 

// Função para obter todos os usuários
export const GET_USUARIOS = async () => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para obter um usuário por ID
export const GET_USUARIO_BY_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para obter um usuário por ID
export const GET_USUARIO_BY_PESSOA_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuarioPessoa/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para criar um novo usuário
export const POST_USUARIO = async (data:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// Função para atualizar um usuário existente
export const PUT_USUARIO = async (dados:{id:string, data:any}) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuario/${dados.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(dados.data),
  });
  return await response.json();
};

// Função para deletar um usuário
export const DELETE_USUARIO = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/usuario/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Funções correspondentes para Alertaroubo
export const GET_ALERTAS_ROUBO = async () => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/alertaroubos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};



export const GET_ALERTA_ROUBO_BY_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/alertaroubo/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para criar um novo alerta de roubo
export const POST_ALERTA_ROUBO = async (data: Alertaroubo) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/alertaroubo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const PUT_ALERTA_ROUBO = async (id:string, data:any) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/alertaroubo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const DELETE_ALERTA_ROUBO = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/alertaroubo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Funções correspondentes para notificacoes
export const GET_NOTIFICACAO_MULTAS = async () => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacoes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

export const GET_NOTIFICACAO_AUTOMO_BY_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacaoAutomo/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

export const GET_NOTIFICACAO_MULTA_BY_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacao/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para criar um novo alerta de roubo
export const POST_NOTIFICACAO_MULTA = async (data: any) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const PUT_NOTIFICACAO_MULTA = async (dados :{id:string, data:any}) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacao/${dados.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(dados.data),
  });
  return await response.json();
};

export const DELETE_NOTIFICACAO_MULTA = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/notificacao/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Funções correspondentes para Alertaroubo
export const GET_RECLAMACOES = async () => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/reclamacoes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};


export const GET_RECLAMACAO_BY_ID = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/reclamacao/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para criar uma nova reclamacao
export const POST_RECLAMACAO = async (data: Alertaroubo) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/reclamacao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const PUT_RECLAMACAO = async (id:string, data:any) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/reclamcao/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const DELETE_RECLAMACAO = async (id:string) => {
  const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
  const response = await fetch(`${BASE_URL}/reclamacao/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};

// Função para obter todas as viaturas
export const GET_VIATURAS = async () => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/viaturas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return await response.json();
  };
  
  // Função para obter uma viatura por ID
  export const GET_VIATURA_BY_ID = async (id:string) => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/viatura/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return await response.json();
  };
  
  // Função para criar uma nova viatura
  export const POST_VIATURA = async (data: Viatura) => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/viatura`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  
  // Função para atualizar uma viatura existente
  export const PUT_VIATURA = async (id:string, data:Viatura) => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/viatura/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  
  // Função para deletar uma viatura
  export const DELETE_VIATURA = async (id:string) => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/viatura/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return await response.json();
  };

  export const GET_MULTAS = async () => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/multas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return await response.json();
  };

  export const VERIFY_MULTAS = async () => {
    const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
    const response = await fetch(`${BASE_URL}/verificar-multas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return await response.json();
  };
  
     // Função para criar uma nova viatura
     export const GET_MULTA_BY_ID = async (id:string) => {
       const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
       const response = await fetch(`${BASE_URL}/multa/${id}`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${AUTH_TOKEN}`,
         },
       });
       return await response.json();
     };

     export const POST_MULTA = async (data: any) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/multa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };

    export const PUT_MULTA = async (id:string, data:Multa) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/multa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_MULTA = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/multa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_BIS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/bis`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_BI_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/bi/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_BI = async (data: Bi) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/bi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_BI = async (id:string, data: Bi) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/bi/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_BI= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/bi/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_AUTOMOBILISTAS = async () : Promise<Automobilista[] | []> => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/automobilistas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json() as Automobilista[];
    };
    
    // Função para obter uma viatura por ID
    export const GET_AUTOMOBILISTA_BY_ID = async (id:string | undefined |  string[]) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/automobilista/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_AUTOMOBILISTA = async (data: Automobilista) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/automobilista`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_AUTOMOBILISTA = async (id:string, data: Automobilista) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/automobilista/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_AUTOMOBILISTA = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/automobilista/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_CARTASCONDUCAO = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/cartasconducao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_CARTACONDUCAO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/cartaconducao/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_CARTACONDUCAO = async (data: Cartaconducao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/cartaconducao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_CARTACONDUCAO = async (id:string, data: Cartaconducao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/cartaconducao/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_CARTACONDUCAO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/cartaconducao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_CATEGORIASCARTA = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/categoriascarta`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_CATEGORIACARTA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/categoriacarta/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_CATEGORIACARTA = async (data: Categoriacarta) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/categoriacarta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_CATEGORIACARTA = async (id:string, data: Categoriacarta) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/categoriacarta/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_CATEGORIACARTA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/categoriacarta/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  
    export const GET_CONTACTOS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/contactos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_CONTACTO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/contacto/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_CONTACTO = async (data: Contacto) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/contacto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_CONTACTO= async (id:string, data: Contacto) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/contacto/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_CONTACTO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/contacto/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_ENDERECO = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/enderecos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_ENDERECO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/endereco/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_ENDERECO = async (data: Endereco) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/endereco`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_ENDERECO = async (id:string, data: Endereco) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/endereco/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_ENDERECO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/endereco/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_FICHEIROS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/ficheiros`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_FICHEIRO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/ficheiro/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_FICHEIRO = async (data: Ficheiro) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/ficheiro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_FICHEIRO = async (id:string, data: Ficheiro) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/ficheiro/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_FICHEIRO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/ficheiro/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_FUNCIONARIOS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/funcionarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_FUNCIONARIO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/funcionario/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_FUNCIONARIO = async (data: Funcionario) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/funcionario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_FUNCIONARIO = async (id:string, data: Funcionario) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/funcionario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_FUNCIONARIO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/funcionario/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_INFRACOES = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/infracoes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_INFRACAO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/infracao/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_INFRACAO = async (data: Infracao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/infracao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_INFRACAO = async (id:string, data: Infracao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/infracao/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_INFRACAO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/infracao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_LIVRETES = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/livretes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_LIVRETE_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/livrete/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_LIVRETE = async (data: Livrete) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/livrete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_LIVRETE = async (id:string, data: Livrete) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/livrete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_LIVRETE= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/livrete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_MARCAS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/marcas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_MARCA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/marca/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_MARCA = async (data: Marca) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/marca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_MARCA = async (id:string, data: Marca) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/marca/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_MARCA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/marcas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_MUNICIPIOS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/municipios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_MUNICIPIO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/municipio/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_MUNICIPIO = async (data: Municipio) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/municipio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_MUNICIPIO = async (id:string, data: Municipio) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/municipio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_MUNICIPIO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/municipio/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };

    export const GET_PAGAMENTOSMULTA = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pagamentosmulta`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_PAGAMENTOMULTA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pagamentomulta/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_PAGAMENTOMULTA = async (data: Pagamentomulta) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pagamentomulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_PAGAMENTOMULTA = async (id:string, data: Pagamentomulta) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pagamentomulta/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_PAGAMENTOMULTA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pagamentomulta/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };


    export const GET_PAISES = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/paises`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_PAIS_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pais/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_PAIS = async (data: Pais) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pais`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_PAIS = async (id:string, data: Marca) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pais/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_PAIS= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pais/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_PESSOAS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pessoas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_PESSOA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pessoa/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_PESSOA = async (data: Pessoa) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pessoa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_PESSOA = async (id:string, data: Pessoa) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pessoa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_PESSOA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/pessoa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_PROVINCIAS = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/provincias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_PROVINCIA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/provincia/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_PROVINCIA = async (data: Provincia) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/provincia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_PROVINCIA = async (id:string, data: Provincia) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/provincia/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_PROVINCIA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/provincia/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_SERVICOSVIATURA = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/servicosviatura`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_SERVICOVIATURA_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/servicoviatura/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_SERVICOVIATURA = async (data: Serivicoviatura) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/servicoviatura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_SERVICOVIATURA = async (id:string, data: Serivicoviatura) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/servicoviatura/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_SERVICOVIATURA= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/servicoviatura/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_TIPOSINFRACAO = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiposinfracao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_TIPOINFRACAO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tipoinfracao/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_TIPOINFRACAO = async (data: Tipoinfracao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tipoinfracao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_TIPOINFRACAO = async (id:string, data: Tipoinfracao) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tipoinfracao/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_TIPOINFRACAO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tipoinfracao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_TIPOSROUBO = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiposroubo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_TIPOROUBO_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiporoubo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_TIPOROUBO = async (data: Tiporoubo) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiporoubo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_TIPOROUBO = async (id:string, data: Tiporoubo) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiporoubo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_TIPOROUBO= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/tiporoubo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  

    export const GET_TITULOSPROPRIEDADE = async () => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/titulospropriedade`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para obter uma viatura por ID
    export const GET_TITULOPROPRIEDADE_BY_ID = async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/titulopropriedade/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
    
    // Função para criar uma nova viatura
    export const POST_TITULOPROPRIEDADE = async (data: Titulopropriedade) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/titulopropriedade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para atualizar uma viatura existente
    export const PUT_TITULOPROPRIEDADE = async (id:string, data: Titulopropriedade) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/titulopropriedade/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    
    // Função para deletar uma viatura
    export const DELETE_TITULOPROPRIEDADE= async (id:string) => {
      const AUTH_TOKEN = window.localStorage.getItem(`${APP_NAME}_`);
      const response = await fetch(`${BASE_URL}/titulopropriedade/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return await response.json();
    };
  
