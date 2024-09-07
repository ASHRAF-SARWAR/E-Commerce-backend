import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PTrejBtZBjRprNKT3AFGKRMLRQcm66V5kvgJHMax0f28jh9YY7e5w6OALE1rwpRWxEAOckAXIjyyKgNWqJwUqvr00AKcJ9O8Q"
);

const order = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice, userId } = req.body;

    const newOrder = new Order({
      orderItems,
      shippingAddress,
      totalPrice,
      user: userId,
      paidAt: new Date(),
    });
    await newOrder.save();

    // Stripe session creation
    const session = await createStripeSession(orderItems, newOrder._id);

    res.send({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating order:", error);

    // Send detailed error response
    res.status(500).send({
      success: false,
      message: error.message,
      details: error.raw || error,
    });
  }
};

// Function to create a Stripe session
const createStripeSession = async (orderItems, orderId) => {
  try {
    const frontend_url = "https://ecommerce-ashrafsarwar.netilfy.app"; // Replace with your frontend URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.nameProduct,
          },
          unit_amount: item.price * 100, // Ensure price is in cents
        },
        quantity: item.quantity, // Correct quantity
      })),
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`,
    });

    return session;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw error; // Re-throw error to be caught in the main function
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, isDelivered } = req.body;
    const order = await Order.findById(orderId);
    console.log(isDelivered);
    if (!order) {
      return res.send({ success: false, message: "Order not found" });
    }
    order.isDelivered = isDelivered;
    await order.save();
    res.send({ success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.send({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.send({ success: false, message: error.message });
  }
};

export { order, getOrders, updateOrderStatus };
