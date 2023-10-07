import {iContact} from '../types/types';
import DbService from './DbService';
import { Db, Collection, WithId, Document } from 'mongodb';

class UserService {
    private db: Db | undefined;
  
    public async isEligible(checkContact: iContact): Promise<iContact | null> {
      this.db = await DbService.getDb();

      const dbContact: WithId<Document> | null = await (this.db as Db).collection('contacts').findOne(checkContact);
      
      if (dbContact) {
        const contact: iContact = {
          id: dbContact.id,
          name: dbContact.name,
          email: dbContact.email,
          phone: dbContact.phone,
          isEnrolled: dbContact.isEnrolled
        };

        return contact;
      }
      return null;
    }


    public async setEnrolled(contact: iContact): Promise<void> {
      this.db = await DbService.getDb();
      await (this.db as Db).collection('contacts').findOneAndUpdate(contact, {$set: {isEnrolled: true}});
    }
  }
  
  export default UserService;