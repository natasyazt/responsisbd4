import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  // ... (kode createLoan dan getLoans sebelumnya tetap ada)

  async getTopBorrowers(req, res) {
    try {
      const topBorrowers = await LoanModel.getTopBorrowers();
      res.status(200).json({
        message: "Berhasil mengambil data Top 3 Peminjam",
        data: topBorrowers
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
