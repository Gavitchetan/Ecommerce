import { DeleteOrder, UpdateOrder, getAllOrder, getSingleOrder, myOrders, newOrder } from "../controllers/orderc.js";
import { isAuthenticated, autheriseRole } from "../middlewares/auth.js";


import exp from "express";
const router = exp.Router();

router.post("/order/new",
    isAuthenticated,
    newOrder
);
router.get("/order/me",
    isAuthenticated,
    myOrders
);
router.get("/order/:id",
    isAuthenticated,
    // autheriseRole("admin"),
    getSingleOrder
);
router.get('/admin/orders', isAuthenticated, autheriseRole('admin'), getAllOrder)
router.route("/admin/orders/:id")
    .put(isAuthenticated, autheriseRole("admin"), UpdateOrder)
    .delete(isAuthenticated, autheriseRole('admin'), DeleteOrder)


export default router;

