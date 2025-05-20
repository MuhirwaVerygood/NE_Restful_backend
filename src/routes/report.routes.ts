import express from 'express';
import { 
  getOutgoingCarsByDateRange, 
  getIncomingCarsByDateRange, 
  getParkingOccupancyReport,
  getRevenueReport
} from '../controllers/report.controller';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';
import { query } from 'express-validator';
import { validateRequest } from '../middlewares/validation.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/reports/outgoing:
 *   get:
 *     summary: Get report of outgoing cars in a date range
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Outgoing cars report generated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get(
  '/outgoing',
  [
    authenticate,
    authorizeAdmin,
    query('startDate').notEmpty().withMessage('Start date is required'),
    query('endDate').notEmpty().withMessage('End date is required'),
    validateRequest
  ],
  getOutgoingCarsByDateRange
);

/**
 * @swagger
 * /api/reports/incoming:
 *   get:
 *     summary: Get report of incoming cars in a date range
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Incoming cars report generated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get(
  '/incoming',
  [
    authenticate,
    authorizeAdmin,
    query('startDate').notEmpty().withMessage('Start date is required'),
    query('endDate').notEmpty().withMessage('End date is required'),
    validateRequest
  ],
  getIncomingCarsByDateRange
);

/**
 * @swagger
 * /api/reports/occupancy:
 *   get:
 *     summary: Get parking occupancy report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Parking occupancy report generated successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get(
  '/occupancy',
  [
    authenticate,
    authorizeAdmin
  ],
  getParkingOccupancyReport
);

/**
 * @swagger
 * /api/reports/revenue:
 *   get:
 *     summary: Get revenue report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: groupBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [parking, day]
 *         description: Group results by parking or day
 *     responses:
 *       200:
 *         description: Revenue report generated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get(
  '/revenue',
  [
    authenticate,
    authorizeAdmin,
    query('startDate').notEmpty().withMessage('Start date is required'),
    query('endDate').notEmpty().withMessage('End date is required'),
    query('groupBy').optional().isIn(['parking', 'day']).withMessage('Group by must be either parking or day'),
    validateRequest
  ],
  getRevenueReport
);

export default router;