import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";

const deliveriesLogsRoutes = Router()
const deliveriesLogsController = new DeliveriesLogsController()

deliveriesLogsRoutes.post('/', ensureAuthenticated, verifyUserAuthorization(['sale']), deliveriesLogsController.create)

export { deliveriesLogsRoutes }