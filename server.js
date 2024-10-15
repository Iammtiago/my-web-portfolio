const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "anonymusss279@gmail.com",
        pass: "efpy phah isum zzlz",
    },
});


// Habilitar CORS
app.use(cors());
app.use(express.json());


// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta raíz y "src"
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));
app.use(express.static(path.join(__dirname)));

// Ruta de ejemplo que redirige a otra URL en la misma aplicación
app.get('/old-route', (req, res) => {
    res.redirect('/new-route');
});

// Nueva ruta a la que se redirige
app.get('/new-route', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/api/sendmail', (req, res) => {
//     res.json({message: "ok"})
// });

app.post("/api/send-mail", async (req, res) => {

    try {
        const { mail, name, message } = req.body
        console.log("desde el backend", mail);

        // let msg = {
        //     from: 'Domoluz <anonymusss279@gmail.com>', // sender address
        //     to: "tiagoddd279@gmail.com, santiagoAndres79@outlook.es", // list of receivers
        //     subject: "New Contact!", // Subject line
        //     text: `The Email is: ${email}` // plain text body
        // }

        let numberPhone = '+584247414048';

        let msg = {
            from: 'Santiago Corredor <anonymusss279@gmail.com>', // sender address
            to: 'tiagoddd279@gmail.com, santiagoAndres79@outlook.es',
            subject: `¡Nuevo contacto por el portfolio!`, // Subject line
            text: `nombre: ${name}.
            email: ${mail}
            mensaje: ${message}`
        }

//         let msg = {
//             from: 'Santiago Corredor <anonymusss279@gmail.com>', // sender address
//             to: email,
//             subject: `¡Gracias por contactarme!`, // Subject line
//             text: `Me gustaría conocer más sobre su contacto y cómo podria ayudarlo.
// Puede contactarnos via whatsApp a traves del numero '${numberPhone}' para programar una pronta reunion.
// Espero tener la oportunidad de colaborar con usted.`
//         }

        let info = await transporter.sendMail(msg);

        console.log("Message sent: ", info.messageId);

        // res.status(200).send('data enviada al correo tiagoddd279@gmail.com desde anonymusss279@gmail.com como Domoluz. Email:', email)
        res.status(200).json({
            message: "Send Email",
            status: true,
            data: `data enviada al correo ${mail} desde anonymusss279@gmail.com.`,
            mail
        })

    } catch (error) {
        console.log(error);
    }


});

app.get('/kbrn', (req, res) => {
    res.status(200).send("what's up, nigga!?")
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;