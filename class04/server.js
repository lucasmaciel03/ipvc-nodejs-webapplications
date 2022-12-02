// Importar node packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { routes } from './routes/index.js';

//--REST SERVER--//
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = 'http://localhost:5500';

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// output dados de pedido HTTP - logger
app.use(morgan('short'));

// parse dados dos pedidos no content-type - application/json
app.use(express.json());
//  							 |
// ADICIONAR ESTA LINHA DE BAIXO V
app.use(express.urlencoded({ extended: true }));

//--ROUTES--// 												.
app.use('/api', routes);
// o caminho para as routes vai começar com:
// {host}/api
// o host no nosso contexto, é http://localhost:4242
// Logo, com esta separação, as routes vao estar em:
// http://localhost:4242/api .....

// correr server no url host:port definido em .env
app.listen(3000, 'localhost', () => {
  console.log('Server up and running at http://%s:%s', 'localhost', 3000);
});
