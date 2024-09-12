import expres from "express";
import { auth } from "../midleware/auth.js";
import { getOrders, order, updateOrderStatus } from "../controllers/order.js";

const orderRouter = expres.Router();

orderRouter.post("/addToOrder", auth, order);
orderRouter.post("/getOrders", auth, getOrders);
orderRouter.post("/updateOrder", auth, updateOrderStatus);
orderRouter.post("/getuserorders", auth, getOrdersOfUser);

export default orderRouter;
