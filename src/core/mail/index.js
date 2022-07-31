import nodemailer from 'nodemailer';
import { StatusCode } from 'status-code-enum';
import { ErrorHandler } from '../helpers/error';

const enviandoEmail = async (message, transport) => {
    await nodemailer.createTransport(transport).sendMail(message, (retornoDoEnvio) => {
        if (retornoDoEnvio)
            return new ErrorHandler(StatusCode.ServerErrorInternal, 'Erro durante o envio do email.');
    });
}

export const enviarEmail = (mensagem, servico = null || '') => {
    let transport = {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
    switch (servico) {
        case 'gmail':
            return enviandoEmail(mensagem, { ...transport, service: servico });
        default:
            return enviandoEmail(mensagem, transport);
    }
}

export { enviarEmail }