import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routas from './routes/index';  // ou o caminho correto para o arquivo de rotas

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar as rotas importadas
app.use('/', routas);
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servir rodando na porta ${PORT}`);
});