import { Request, Response } from 'express';
import ContactsImportService from '../services/ContactsImportService';

class ContactsImportController {
  private contactsImportService: ContactsImportService;

  constructor() {
    this.contactsImportService = new ContactsImportService();
  }

  public import = async(req: Request, res: Response, next: any): Promise<void> => {
    try {
      await this.contactsImportService.import();
      res.status(200).json({ message: 'Import completed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ContactsImportController;