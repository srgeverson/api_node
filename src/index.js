import { http } from './core/http';

const PORT = process.env.PORT || 8080;
const HOST = process.env.SERVER_URL || 'localhost';

http.listen(PORT, () => {
    console.log(`O IP da aplicação é ${HOST}.`);
    console.log(`Aplicação está sendo executada na porta ${PORT}.`);
    console.log(`Documentação Swagger http://${HOST}:${PORT}/api-docs`);
});