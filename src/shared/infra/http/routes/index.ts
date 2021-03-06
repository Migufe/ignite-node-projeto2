import { Router } from "express"; 
import { authenticationRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from './rentals.routes'

const router = Router();

router.use(authenticationRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes)

export { router };