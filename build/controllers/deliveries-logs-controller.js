"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/deliveries-logs-controller.ts
var deliveries_logs_controller_exports = {};
__export(deliveries_logs_controller_exports, {
  DeliveriesLogsController: () => DeliveriesLogsController
});
module.exports = __toCommonJS(deliveries_logs_controller_exports);

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
});

// src/controllers/deliveries-logs-controller.ts
var import_zod = require("zod");

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/controllers/deliveries-logs-controller.ts
var DeliveriesLogsController = class {
  async create(request, response) {
    const bodySchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid(),
      description: import_zod.z.string()
    });
    const { delivery_id, description } = bodySchema.parse(request.body);
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id }
    });
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }
    if (delivery.status === "delivered") {
      throw new AppError("This order has already been delivered");
    }
    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped");
    }
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    });
    return response.status(201).json();
  }
  async show(request, response) {
    const paramsSchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid()
    });
    const { delivery_id } = paramsSchema.parse(request.params);
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        user: true,
        logs: true
      }
    });
    if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
      throw new AppError("The user can only see their own deliveries", 401);
    }
    return response.json(delivery);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveriesLogsController
});
