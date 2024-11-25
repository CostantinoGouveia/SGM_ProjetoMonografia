// src/routes/index.ts
import { NextFunction, Request, Response, Router } from 'express';
import { getAlertasRoubo, getAlertaRouboById, createAlertaRoubo, updateAlertaRoubo, deleteAlertaRoubo } from '../controllers/AlertarouboController';
import { getAutomobilistas, getAutomobilistaById, createAutomobilista, updateAutomobilista, deleteAutomobilista } from '../controllers/AutomobilistaController';
import { getBis, getBiById, createBi, updateBi, deleteBi } from '../controllers/BiController';
import { getCartasConducao, getCartaConducaoById, createCartaConducao, updateCartaConducao, deleteCartaConducao } from '../controllers/CartaconducaoController';
import { getCategoriasCarta, getCategoriaCartaById, createCategoriaCarta, updateCategoriaCarta, deleteCategoriaCarta } from '../controllers/CategoriacartaController';
import { getContactos, getContactoById, createContacto, updateContacto, deleteContacto } from '../controllers/ContactoController';
import { getEnderecos, getEnderecoById, createEndereco, updateEndereco, deleteEndereco } from '../controllers/EnderecoController';
import { getFicheiros, getFicheiroById, createFicheiro, updateFicheiro, deleteFicheiro } from '../controllers/FicheiroController';
import { getFuncionarios, getFuncionarioById, createFuncionario, updateFuncionario, deleteFuncionario } from '../controllers/FuncionarioController';
import { getInfracoes, getInfracaoById, createInfracao, updateInfracao, deleteInfracao } from '../controllers/InfracaoController';
import { getLivretes, getLivreteById, createLivrete, updateLivrete, deleteLivrete } from '../controllers/LivreteController';
import { getMarcas, getMarcaById, createMarca, updateMarca, deleteMarca } from '../controllers/MarcaController';
import { getMultas, getMultaById, createMulta, updateMulta, deleteMulta, verificarMultas } from '../controllers/MultaController';
import { getMunicipios, getMunicipioById, createMunicipio, updateMunicipio, deleteMunicipio } from '../controllers/MunicipioController';
import { getPagamentosMulta, getPagamentoMultaById, createPagamentoMulta, updatePagamentoMulta, deletePagamentoMulta, getPagamentosMultaReferencia, multaAtulizado } from '../controllers/PagamentoMultaController';
import { getPaises, getPaisById, createPais, updatePais, deletePais } from '../controllers/PaisController';
import { getPessoas, getPessoaById, createPessoa, updatePessoa, deletePessoa } from '../controllers/PessoaController';
import { getProvincias, getProvinciaById, createProvincia, updateProvincia, deleteProvincia } from '../controllers/ProvinciaController';
import { getServicosViatura, getServicoViaturaById, createServicoViatura, updateServicoViatura, deleteServicoViatura } from '../controllers/SerivicoviaturaController';
import { getTiposInfracao, getTipoInfracaoById, createTipoInfracao, updateTipoInfracao, deleteTipoInfracao } from '../controllers/TipoinfracaoController';
import { getTiposRoubo, getTipoRouboById, createTipoRoubo, updateTipoRoubo, deleteTipoRoubo } from '../controllers/TiporouboController';
import { getTitulosPropriedade, getTituloPropriedadeById, createTituloPropriedade, updateTituloPropriedade, deleteTituloPropriedade } from '../controllers/TitulopropriedadeController';
import { getViaturas, getViaturaById, createViatura, updateViatura, deleteViatura } from '../controllers/ViaturaController';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, getUsuarioByPessoaId } from '../controllers/UsuarioController';
import { login, login_automobilista, verifyToken } from '../controllers/AutenticacaoController';
import {
    createNotificacaoMulta,
    getNotificacoesMulta,
    getNotificacaoMultaById,
    updateNotificacaoMulta,
    deleteNotificacaoMulta,
    getNotificacaoMultaAutomo,
  } from "../controllers/NotificacaomultaController";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from "../controllers/AutenticacaoController";
import { createReclamacao, deleteReclamacao, getReclamacaoById, getReclamacoes, updateReclamacao } from '../controllers/ReclamacaoController';
import { createNotificacaoReclamacao, deleteNotificacaoReclamacao, getNotificacaoReclamacaoById, getNotificacaoReclamacaoMulta, getNotificacoesReclamacao, updateNotificacaoReclamacao } from '../controllers/NotificacaoreclamacaoController';
import { createNotificacao, deleteNotificacao, getNotificacaoById, getNotificacoes, updateNotificacao } from '../controllers/NotificacaoalertaController';
import { createNotificacoesFuncionario, deleteNotificacaoFuncionario, getNotificacoesFuncionario, updateNotificacaoFuncionario } from '../controllers/NotificacaoalertafuncionarioController';
const router = Router();

export function tokenValidate(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token)
        return res.status(401).send({ error: "Token is required" })

    token = token.split(" ")[1]
    try {
        const decoder = jwt.verify(token, db().JWT_KEY)
        // req.id = (decoder as data).id
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({ error: "Token is expired" })
        }
        return res.status(401).send({ error: "Token is invalid" })
    }
}


//Rota autenticacao
router.get('/verifyToken', verifyToken);
router.post('/login', login);
router.post('/loginA', login_automobilista);

// Rotas para Usuarios
router.get('/usuarios',  tokenValidate, getUsuarios);
router.get('/usuario/:id', tokenValidate, getUsuarioById);
router.get('/usuarioPessoa/:id', tokenValidate, getUsuarioByPessoaId);
router.post('/usuario',  tokenValidate, createUsuario);
router.put('/usuario/:id', tokenValidate, updateUsuario);
router.delete('/usuario/:id', tokenValidate, deleteUsuario);


// Rotas para Alertaroubo
router.get('/alertaroubos',  tokenValidate, getAlertasRoubo);
router.get('/alertaroubo/:id',  tokenValidate, getAlertaRouboById);
router.post('/alertaroubo',  tokenValidate, createAlertaRoubo);
router.put('/alertaroubo/:id',  tokenValidate, updateAlertaRoubo);
router.delete('/alertaroubo/:id',  tokenValidate, deleteAlertaRoubo);

// Rotas para notificacoes de alertas
router.get("/notificacoesalertas", tokenValidate, getNotificacoes); // Obter todas as notificações de alertas
router.get("/notificacaoalerta/:id", tokenValidate, getNotificacaoById); // Obter notificação de alerta por ID
router.post("/notificacaoalerta", tokenValidate, createNotificacao); // Criar notificação de alerta
router.put("/notificacaoalerta/:id", tokenValidate, updateNotificacao); // Atualizar notificação de alerta
router.delete("/notificacaoalerta/:id", tokenValidate, deleteNotificacao); // Excluir notificação de alerta

// Rotas para notificacoes de alertas por funcionario
router.get("/notificacoesalertasfuncionarios/:id", tokenValidate, getNotificacoesFuncionario); // Obter todas as notificações de alertas para funcionários
router.post("/notificacaoalertafuncionario", tokenValidate, createNotificacoesFuncionario); // Criar notificação de alerta para funcionário
router.put("/notificacaoalertafuncionario/:id", tokenValidate, updateNotificacaoFuncionario); // Atualizar notificação de alerta para funcionário
router.delete("/notificacaoalertafuncionario/:id", tokenValidate, deleteNotificacaoFuncionario); // Excluir notificação de alerta para funcionário


// Rotas para notificacao de multa
router.get("/notificacoes",tokenValidate, getNotificacoesMulta); // Obter todas as notificações
router.get("/notificacao/:id",tokenValidate, getNotificacaoMultaById); // Obter notificação por ID
router.get("/notificacaoAutomo/:id",tokenValidate, getNotificacaoMultaAutomo); // Obter notificação por ID
router.post("/notificacao",tokenValidate, createNotificacaoMulta); // Criar notificação
router.put("/notificacao/:id",tokenValidate, updateNotificacaoMulta); // Atualizar notificação
router.delete("/notificacao/:id",tokenValidate, deleteNotificacaoMulta); // Excluir notificação
// rotas notificao de reclamacao
router.get("/notificacoesRecl",tokenValidate, getNotificacoesReclamacao); // Obter todas as notificações
router.get("/notificacaoRecl/:id",tokenValidate, getNotificacaoReclamacaoById); // Obter notificação por ID
router.get("/notificacaoReclamacao/:id",tokenValidate, getNotificacaoReclamacaoMulta); // Obter notificação por ID
router.post("/notificacaoRecl",tokenValidate, createNotificacaoReclamacao); // Criar notificação
router.put("/notificacaoRecl/:id",tokenValidate, updateNotificacaoReclamacao); // Atualizar notificação
router.delete("/notificacaoRecl/:id",tokenValidate, deleteNotificacaoReclamacao); // Excluir notificação

// Rotas para reclamcao
router.get('/reclamacoes',  tokenValidate, getReclamacoes);
router.get('/reclamacao/:id',  tokenValidate, getReclamacaoById);
router.post('/reclamacao',  tokenValidate, createReclamacao);
router.put('/reclamacao/:id',  tokenValidate, updateReclamacao);
router.delete('/reclamacao/:id',  tokenValidate, deleteReclamacao);

// Rotas para Automobilista
router.get('/automobilistas', tokenValidate, getAutomobilistas);
router.get('/automobilista/:id', tokenValidate, getAutomobilistaById);
router.post('/automobilista', tokenValidate, createAutomobilista);
router.put('/automobilista/:id', tokenValidate, updateAutomobilista);
router.delete('/automobilista/:id', tokenValidate, deleteAutomobilista);

// Rotas para Bi
router.get('/bis', tokenValidate, getBis);
router.get('/bi/:id', tokenValidate, getBiById);
router.post('/bi', tokenValidate, createBi);
router.put('/bi/:id', tokenValidate, updateBi);
router.delete('/bi/:id', tokenValidate, deleteBi);

// Rotas para Carta de Conducao
router.get('/cartasconducao', tokenValidate, getCartasConducao);
router.get('/cartaconducao/:id', tokenValidate, getCartaConducaoById);
router.post('/cartaconducao', tokenValidate, createCartaConducao);
router.put('/cartaconducao/:id', tokenValidate, updateCartaConducao);
router.delete('/cartaconducao/:id', tokenValidate, deleteCartaConducao);

// Rotas para Categoria de Carta
router.get('/categoriascarta', tokenValidate, getCategoriasCarta);
router.get('/categoriacarta/:id', tokenValidate, getCategoriaCartaById);
router.post('/categoriacarta', tokenValidate, createCategoriaCarta);
router.put('/categoriacarta/:id', tokenValidate, updateCategoriaCarta);
router.delete('/categoriacarta/:id', tokenValidate, deleteCategoriaCarta);

// Rotas para Contacto
router.get('/contactos', tokenValidate, getContactos);
router.get('/contacto/:id', tokenValidate, getContactoById);
router.post('/contacto', tokenValidate, createContacto);
router.put('/contacto/:id', tokenValidate, updateContacto);
router.delete('/contacto/:id', tokenValidate, deleteContacto);

// Rotas para Endereco
router.get('/enderecos', tokenValidate, getEnderecos);
router.get('/endereco/:id', tokenValidate, getEnderecoById);
router.post('/endereco', tokenValidate, createEndereco);
router.put('/endereco/:id', tokenValidate, updateEndereco);
router.delete('/endereco/:id', tokenValidate, deleteEndereco);

// Rotas para Ficheiro
router.get('/ficheiros', tokenValidate, getFicheiros);
router.get('/ficheiro/:id', tokenValidate, getFicheiroById);
router.post('/ficheiro', tokenValidate, createFicheiro);
router.put('/ficheiro/:id', tokenValidate, updateFicheiro);
router.delete('/ficheiro/:id', tokenValidate, deleteFicheiro);

// Rotas para Funcionario
router.get('/funcionarios', tokenValidate, getFuncionarios);
router.get('/funcionario/:id', tokenValidate, getFuncionarioById);
router.post('/funcionario', tokenValidate, createFuncionario);
router.put('/funcionario/:id', tokenValidate, updateFuncionario);
router.delete('/funcionario/:id', tokenValidate, deleteFuncionario);

// Rotas para Infracao
router.get('/infracoes', tokenValidate, getInfracoes);
router.get('/infracao/:id', tokenValidate, getInfracaoById);
router.post('/infracao', tokenValidate, createInfracao);
router.put('/infracao/:id', tokenValidate, updateInfracao);
router.delete('/infracao/:id', tokenValidate, deleteInfracao);

// Rotas para Livrete
router.get('/livretes', tokenValidate, getLivretes);
router.get('/livrete/:id', tokenValidate, getLivreteById);
router.post('/livrete', tokenValidate, createLivrete);
router.put('/livrete/:id', tokenValidate, updateLivrete);
router.delete('/livrete/:id', tokenValidate, deleteLivrete);

// Rotas para Marca
router.get('/marcas', tokenValidate, getMarcas);
router.get('/marca/:id', tokenValidate, getMarcaById);
router.post('/marca', tokenValidate, createMarca);
router.put('/marca/:id', tokenValidate, updateMarca);
router.delete('/marca/:id', tokenValidate, deleteMarca);

// Rotas para Multa
router.get('/multas', tokenValidate, getMultas);
router.get('/multa/:id', tokenValidate, getMultaById);
router.post('/multa', tokenValidate, createMulta);
router.put('/multa/:id', tokenValidate, updateMulta);
router.delete('/multa/:id', tokenValidate, deleteMulta);
router.post('/verificar-multas', verificarMultas);

// Rotas para Municipio
router.get('/municipios', tokenValidate, getMunicipios);
router.get('/municipio/:id', tokenValidate, getMunicipioById);
router.post('/municipio', tokenValidate, createMunicipio);
router.put('/municipio/:id', tokenValidate, updateMunicipio);
router.delete('/municipio/:id', tokenValidate, deleteMunicipio);

// Rotas para Pagamento de Multa
router.get('/pagamentosmulta', tokenValidate, getPagamentosMulta);
router.get('/pagamentomulta/:id', tokenValidate, getPagamentoMultaById);
router.post('/pagamentomulta', tokenValidate, createPagamentoMulta);
router.put('/pagamentomulta/:id', tokenValidate, updatePagamentoMulta);
router.delete('/pagamentomulta/:id', tokenValidate, deletePagamentoMulta);
router.post('/pagamentos/confirmar', getPagamentosMultaReferencia);
router.put('/pagamentos/atualizar', multaAtulizado);


// Rotas para Pais
router.get('/paises', tokenValidate, getPaises);
router.get('/pais/:id', tokenValidate, getPaisById);
router.post('/pais', tokenValidate, createPais);
router.put('/pais/:id', tokenValidate, updatePais);
router.delete('/pais/:id', tokenValidate, deletePais);

// Rotas para Pessoa
router.get('/pessoas', tokenValidate, getPessoas);
router.get('/pessoa/:id', tokenValidate, getPessoaById);
router.post('/pessoa', tokenValidate, createPessoa);
router.put('/pessoa/:id', tokenValidate, updatePessoa);
router.delete('/pessoa/:id', tokenValidate, deletePessoa);

// Rotas para Provincia
router.get('/provincias', tokenValidate, getProvincias);
router.get('/provincia/:id', tokenValidate, getProvinciaById);
router.post('/provincia', tokenValidate, createProvincia);
router.put('/provincia/:id', tokenValidate, updateProvincia);
router.delete('/provincia/:id', tokenValidate, deleteProvincia);

// Rotas para Servico de Viatura
router.get('/servicosviatura', tokenValidate, getServicosViatura);
router.get('/servicoviatura/:id', tokenValidate, getServicoViaturaById);
router.post('/servicoviatura', tokenValidate, createServicoViatura);
router.put('/servicoviatura/:id', tokenValidate, updateServicoViatura);
router.delete('/servicoviatura/:id', tokenValidate, deleteServicoViatura);

// Rotas para Tipo de Infracao
router.get('/tiposinfracao', tokenValidate, getTiposInfracao);
router.get('/tipoinfracao/:id', tokenValidate, getTipoInfracaoById);
router.post('/tipoinfracao', tokenValidate, createTipoInfracao);
router.put('/tipoinfracao/:id', tokenValidate, updateTipoInfracao);
router.delete('/tipoinfracao/:id', tokenValidate, deleteTipoInfracao);

// Rotas para Tipo de Roubo
router.get('/tiposroubo', tokenValidate, getTiposRoubo);
router.get('/tiporoubo/:id', tokenValidate, getTipoRouboById);
router.post('/tiporoubo', tokenValidate, createTipoRoubo);
router.put('/tiporoubo/:id', tokenValidate, updateTipoRoubo);
router.delete('/tiporoubo/:id', tokenValidate, deleteTipoRoubo);

// Rotas para Titulo de Propriedade
router.get('/titulospropriedade', tokenValidate, getTitulosPropriedade);
router.get('/titulopropriedade/:id', tokenValidate, getTituloPropriedadeById);
router.post('/titulopropriedade', tokenValidate, createTituloPropriedade);
router.put('/titulopropriedade/:id', tokenValidate, updateTituloPropriedade);
router.delete('/titulopropriedade/:id', tokenValidate, deleteTituloPropriedade);

// Rotas para Viatura
router.get('/viaturas', tokenValidate, getViaturas);
router.get('/viatura/:id', tokenValidate, getViaturaById);
router.post('/viatura', tokenValidate, createViatura);
router.put('/viatura/:id', tokenValidate, updateViatura);
router.delete('/viatura/:id', tokenValidate, deleteViatura);


export default router;
