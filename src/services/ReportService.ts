import DbService from './DbService';
import { Db } from 'mongodb';

class ReportService {
    private db: Db | undefined;

    public async report(): Promise<any> {
      this.db = await DbService.getDb();
      const [totalUsers, enrolledUsers] = await Promise.all([
        (this.db as Db).collection('contacts').countDocuments({}),
        (this.db as Db).collection('contacts').countDocuments({isEnrolled: true})
      ]);

      const enrollmentPercentage = parseFloat((enrolledUsers / totalUsers *100).toFixed(2));

      return {totalUsers, enrolledUsers, enrollmentPercentage};
    }
  }
  
  export default ReportService;