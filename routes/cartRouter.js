import express from "express";
import { auth } from "../midleware/auth.js";
import {
  addToCart,
  getCartItems,
  removeAll,
  removeFromCart,
} from "../controllers/users.js";
const cartRouter = express.Router();

cartRouter.post("/addToCart", auth, addToCart);
cartRouter.post("/removeFromCart", auth, removeFromCart);
cartRouter.post("/removeAll", auth, removeAll);
cartRouter.post("/getCart", auth, getCartItems);

export default cartRouter;
