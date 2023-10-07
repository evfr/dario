import sgMail from '@sendgrid/mail';
import {iEmail} from '../types/types';

class EmailService {
  constructor(){
    sgMail.setApiKey(process.env.SG_KEY ?? '');
  }
  public async sendEmail(msg: iEmail){
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
    });
  }
}

export default EmailService;