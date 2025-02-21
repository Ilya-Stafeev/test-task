import { Router } from 'express';
import { container } from '../../app/container';
import { RequestController } from '../controllers/RequestController';

const router = Router();
const requestController =
  container.resolve<RequestController>('RequestController');

router.post('/requests', (req, res) => requestController.create(req, res));
router.patch('/requests/:id/take', (req, res) =>
  requestController.take(req, res)
);
router.patch('/requests/:id/complete', (req, res) =>
  requestController.complete(req, res)
);
router.patch('/requests/:id/cancel', (req, res) =>
  requestController.cancel(req, res)
);
router.get('/requests', (req, res) => requestController.getAll(req, res));
router.patch('/requests/cancel-all-in-progress', (req, res) =>
  requestController.cancelAllInProgress(req, res)
);

export { router as requestRoutes };
