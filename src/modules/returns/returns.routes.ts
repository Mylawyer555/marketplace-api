import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { returnsController, returnStatusTransitionController } from './returns.controller';

const returnsRoute = express.Router()

returnsRoute.post(
  "/:orderItemId",
  authenticate,
  returnsController
);

returnsRoute.patch(
  "/:returnId/status",
  authenticate,
  returnStatusTransitionController
);

export default returnsRoute