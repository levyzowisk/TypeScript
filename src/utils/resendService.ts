import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fbd3cb3d022fd7",
        pass: "15c171a8043793"
    }
});

export const sendMail = (email: string, name: string, token: string, id: number) => {
    transport.sendMail({
        from: '85988919231levy@gmail.com',
        to: `${email}`,
        subject: 'Testando o envio de email',
        html: `
            <h1> Olá, ${name}! </h1>
            <p> Clique no link abaixo para configurar seu e-mail: </p>
            // Aqui na verdade terá uma rota da aplicação react que fará o manuseio disso.
            <a href="http://localhost:3000/api/verify?token=${token}&userId=${id}">Confirmar E-mail</a>
        `
    });
}   
