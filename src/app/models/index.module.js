import { ChefService } from './chef/index.service';
import { MealService } from './meal/index.service';

export default angular.module('captainscook.models', [])
  .factory('Chef', ChefService)
  .factory('Meal', MealService);
