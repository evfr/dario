import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { Db } from 'mongodb';
import DbService from './DbService';
import {iContact} from '../types/types';

const filePath: string = path.join(__dirname, '..', '..', 'data', 'contacts.csv');

class ContactsImportService {
  private db: Db | undefined;

  public async import() {
    try {
      this.db = await DbService.getDb();
      await (this.db as Db).collection('contacts').deleteMany({});
      const bulkOps: any[] = [];
      const batchSize: number = parseInt(process.env.CONTACTS_BATCH_SIZE ?? '50');

      const rl: readline.Interface = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });

      rl.on('line', async (line: string) => {
        const contactData: string[] = line.split(',');

        // Create a new contact document
        const contact: iContact = {
          name: contactData[0].trim(),
          email: contactData[1].trim(),
          phone: contactData[2].trim(),
          id: contactData[3].trim(),
          isEnrolled: false
        };

        bulkOps.push({
          insertOne: {
            document: contact,
          },
        });

        // If the batch size is reached, perform a bulk insert
        if (bulkOps.length === batchSize) {
          await (this.db as Db).collection('contacts').bulkWrite(bulkOps, { ordered: false });
          bulkOps.length = 0; // Clear the bulk operations array
        }
      });

      rl.on('close', async () => {
        // Insert any remaining documents in the bulk operations array
        if (bulkOps.length > 0) {
          await (this.db as Db).collection('contacts').bulkWrite(bulkOps, { ordered: false });
          console.log('Finished reading the file and performing bulk inserts');
        }
      });
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

export default ContactsImportService;
