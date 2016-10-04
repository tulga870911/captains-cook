const HomeCmt = {
  templateUrl: 'app/routes/home/tpl.html',
  controller: HomeCtrl
}

export default angular.module('captainscook.routes.home', [])
  .component('home', HomeCmt);

function HomeCtrl() {
  this.meals = [{ name: "Special Beef Recipe", rating: 4.5, location: "West Bengal", chef: "Sanjay Puruthi", price: "$55", oldPrice: "$60" },
    { name: "Chicken Karhai", rating: 4.1, location: "Andheri East", chef: "Sheetal Magon", price: "$30", oldPrice: "$90" },
    { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75" }

  ];
  this.chefs = [
    { name: "RK", rating: 4.5, location: "Andheri East" },
    { name: "Sheetal Magon", rating: 5, location: "Bangalore" },
    { name: "Shipra Singh", rating: 4, location: "Andheri West" },
    { name: "Parveen Sultana", rating: 3.5, location: "Andheri East" }
  ];
}
