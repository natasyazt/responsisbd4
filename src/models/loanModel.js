import { pool } from '../config/db.js';

export const LoanModel = {
  // ... (kode createLoan dan getAllLoans sebelumnya tetap ada)

  async getTopBorrowers() {
    const query = `
      WITH BorrowCounts AS (
        SELECT 
          member_id, 
          COUNT(id) as total_loans, 
          MAX(due_date) as last_loan_date 
        FROM loans
        GROUP BY member_id
      ),
      BookFrequencies AS (
        SELECT 
          member_id, 
          book_id, 
          COUNT(*) as borrow_count,
          ROW_NUMBER() OVER(PARTITION BY member_id ORDER BY COUNT(*) DESC) as rn
        FROM loans
        GROUP BY member_id, book_id
      )
      SELECT 
        m.id,
        m.full_name,
        m.email,
        m.member_type,
        CAST(bc.total_loans AS INTEGER) as total_loans,
        b.title AS favorite_book,
        bc.last_loan_date AS last_loan
      FROM members m
      JOIN BorrowCounts bc ON m.id = bc.member_id
      JOIN BookFrequencies bf ON m.id = bf.member_id AND bf.rn = 1
      JOIN books b ON bf.book_id = b.id
      ORDER BY bc.total_loans DESC
      LIMIT 3;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
};
