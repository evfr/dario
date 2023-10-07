import { Request, Response } from 'express';
import ReportService from '../services/ReportService';

class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  public report = async(req: Request, res: Response, next: any): Promise<void> => {
    try {
      const reportData = await this.reportService.report();
      res.status(200).json(reportData);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ReportController;