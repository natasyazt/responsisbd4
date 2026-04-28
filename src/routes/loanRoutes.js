import express from 'express';
import { LoanController } from '../controllers/loanController.js';

const router = express.Router();

router.get('/top-borrowers', LoanController.getTopBorrowers); // Route baru
router.get('/', LoanController.getLoans);
router.post('/', LoanController.createLoan);

export default router;
