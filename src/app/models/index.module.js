import { LocalityService } from './locality/index.service';
import { ChefService } from './chef/index.service';
import { MealService } from './meal/index.service';
import { PromotionService } from './promotion/index.service';
import { CartService } from './cart/index.service';
import { CouponService } from './coupon/index.service';

export default angular.module('captainscook.models', [])
  .factory('Locality', LocalityService)
  .factory('Chef', ChefService)
  .factory('Meal', MealService)
  .factory('Promotion', PromotionService)
  .factory('Cart', CartService)
  .factory('Coupon', CouponService);