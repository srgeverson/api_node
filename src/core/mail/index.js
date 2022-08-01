import nodemailer from 'nodemailer';

const enviandoEmail = (message, transport) => {
    //Permite o envio de email com o TLS "Desabilitado"
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = process.env.NODE_TLS_REJECT_UNAUTHORIZED == 'false' ? 0 : 1;    

    return nodemailer.createTransport(transport).sendMail(message, (retornoDoEnvioErro) => retornoDoEnvioErro);
}

export const enviarEmail = async (mensagem, servico) => {
    let transport = {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
    switch (servico) {
        case 'Gmail':
            return await enviandoEmail(mensagem, { ...transport, secure: process.env.EMAIL_SSL });
        case 'Hotmail':
            return await enviandoEmail(mensagem, {
                ...transport,
                secure: process.env.EMAIL_SSL,
                secureConnection: false,
                tls: {
                    ciphers: 'SSLv3'
                }
            });
        case 'Zoho':
            return await enviandoEmail(mensagem, { ...transport, secure: process.env.EMAIL_SSL });
        default:
            return await enviandoEmail(mensagem, transport);
    }
}

export { enviarEmail }