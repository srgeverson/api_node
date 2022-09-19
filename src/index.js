import Http from './core/http';

const PORT = process.env.PORT || 8080;
const PORT_HTTPS = process.env.PORT || 8081;
const HOST = process.env.SERVER_URL || 'localhost';

const http = new Http();

http.protocoloHttp().listen(PORT, () => {
    console.log(`O IP da aplicação é ${HOST}.`);
    console.log(`Aplicação está sendo executada na porta ${PORT}.`);
    console.log(`Documentação Swagger http://${HOST}:${PORT}/api-docs`);
});

http.protocoloHttps().listen(PORT_HTTPS, () => {
    console.log(`O IP da aplicação é ${HOST}.`);
    console.log(`Aplicação está sendo executada na porta ${PORT_HTTPS}.`);
    console.log(`Documentação Swagger https://${HOST}:${PORT_HTTPS}/api-docs`);
});