import nodemailer from 'nodemailer';

const sendPdf = async (clientData: User, freelancerData: User, depositId: string) => {
  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env['EMAIL_USERNAME'], // generated ethereal user
      pass: process.env['EMAIL_PASSWORD'], // generated ethereal password
    },
  });
  console.log(clientData.email);
  console.log(freelancerData.email);
  try {
    let messageToClient = await transporter.sendMail({
      from: process.env['EMAIL_USERNAME'], // sender address
      to: clientData.email, // list of receivers
      subject: 'Invoice', // Subject line
      text: 'asdf', // plain text body
      html: '<p>Here is an invoice for work completed for you on OpenQ.</p>',
      attachments: [
        {
          filename: `invoice_${freelancerData.invoiceNumber}.pdf`,
          path: `./tmp/${depositId}.pdf`,
        },
      ], // html body
    });

    let messageToFreelancer = await transporter.sendMail({
      from: process.env['EMAIL_USERNAME'], // sender address
      to: freelancerData.email, // list of receivers
      subject: 'Invoice', // Subject line
      text: 'asdf', // plain text body
      html: '<p>Here is your invoice for work completed on OpenQ.</p>',
      attachments: [
        {
          filename: `invoice_${freelancerData.invoiceNumber}.pdf`,
          path: `./tmp/${depositId}.pdf`,
        },
      ], // html body
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messageToClient));
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messageToFreelancer));
  } catch (e) {
    console.log(e);
  }
};

export default sendPdf;
