angular.module('filters',[])
//Filter to fetch the unique categories from the list of products
.filter('fetchUniqueCategories', function() {   
    return function(products) { 
        var categoriesArray = [];
        var categories = [];
        angular.forEach(products, function(product) {
            if (categoriesArray.indexOf(product.cat) === -1) {
                var category = {
                    "name":product.cat,
                    "selected":false
                };
                categoriesArray.push(product.cat);
                categories.push(category);
            } 
        });
        return categories;
    }
})
//Filter to fetch the products filtered by categories
.filter('filterProductsByCategories', function(){
    return function(products, selectedCategories) { 
        var displayedProducts = [];
        angular.forEach(products, function(product) {
            if(selectedCategories.indexOf(product.cat) !== -1){
                displayedProducts.push(product);
            }
        });
        return displayedProducts;
    }
});