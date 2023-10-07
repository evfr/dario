import { Request, Response } from 'express';
import UserService from '../services/UserService';
import EmailService from '../services/EmailService';
import EligibleDevicesTemplate from '../services/EligibleDevicesTemplateService';
import {iEmail} from '../types/types';

class UserController {
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.userService = new UserService();
    this.emailService =  new EmailService();
  }

  public validateUserData =  async(req: Request, res: Response, next: any): Promise<void> => {
    try {
      const { name, phone, email, id } = req.body;
      if (!name || !phone || !email || !id) {
        res.status(400).json({ message: 'Bad request. missing field' });
        return;
      }

      const phonePattern = /^(?:\+\d{1,3})?\d{10}(?:$|-\d{1,4}$)/;
      if (!phonePattern.test(phone)) {
        res.status(400).json({ message: 'Bad request. Phone number is incorrect' });
        return;
      };

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        res.status(400).json({ message: 'Bad request. Email is incorrect' });
        return;
      };

      if (!/^\d{9}$/.test(id)) {
        res.status(400).json({ message: 'Bad request. Id is incorrect' });
        return;
      }

      next();      
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  public getUserDevices =  async(req: Request, res: Response): Promise<void> => {
    try {
      const { name, phone, email, id } = req.body;
      
      const dbContact = await this.userService.isEligible({ name, phone, email, id });

      if (dbContact) {
        const html = EligibleDevicesTemplate.getHTML({ name, phone, email, id });

        if (!dbContact.isEnrolled) {
          const msg: iEmail = {
            to: email,
            from: 'evfisher@gmail.com',
            subject: 'Your Dario Health Eligible Devices',
            html,
          };
          await this.emailService.sendEmail(msg);
          await this.userService.setEnrolled({ name, phone, email, id });
        }

        res.status(200).json({eligibleDevices: html});
      } else {
        res.status(400).json({ message: 'User is not eligible. Please contact your employer.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default UserController;