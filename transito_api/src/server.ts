import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routas from './routes/index';  // ou o caminho correto para o arquivo de rotas
import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function testDatabaseConnection() {
    try {
      await prisma.$connect();
      console.log(chalk.green('Conectado ao banco de dados MySQL com sucesso.'));
    } catch (error) {
      console.error(chalk.red('Erro de conexão ao banco de dados:', error));
      // Aqui você pode adicionar um alerta, por exemplo, enviando um email ou logando em um serviço de monitoramento
    }
  }
  
  // Verificação da conexão ao iniciar o servidor
  testDatabaseConnection();

// Usar as rotas importadas
app.use('/', routas);
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servir rodando na porta ${PORT}`);
});