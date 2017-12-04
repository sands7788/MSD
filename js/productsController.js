angular.module('controllers', []).controller('productsController', function($scope, $http, $filter) {
    $scope.products = []; //Total products array
    $scope.displayedProducts = []; //Displayed products array
    $scope.totalProductsCount = 0; // Total products count
    $scope.visibileProductSize = 9; //Since 3*3 visibleProducts is 9
    $scope.currenciesInfo = { //Currencies and their symbols
        'INR':{
            "symbol" : '₹',
            "rate" : 1
        }, 
        'USD':{
            "symbol" : '$',
            "rate" : 0
        }, 
        'GBP':{
            "symbol" : '£',
            "rate" : 0
        }, 
        'EUR':{
            "symbol" : '€',
            "rate" : 0
        }
    };
    $scope.selectedCurrency = 'INR'; //Default selected currency
    $scope.sortOrderInfo = { //Sorting information
        "price-asc" : {
            "label" : "Price: Low to High",
            "reverse" : false,
            "field" : "price"
        },
        "price-dsc" : {
            "label" : "Price: High to Low",
            "reverse" : true,
            "field" : "price"
        },
        "score-asc" : {
            "label" : "Score: Low to High",
            "reverse" : false,
            "field" : "score"
        },
        "score-dsc" : {
            "label" : "Score: High to Low",
            "reverse" : true,
            "field" : "score"
        }
    };

    //Method to sort
    //Uses "orderBy" filter to pass the array, field and reverse values
    $scope.sortBy = function() {
        var field = "", reverse=false;
        var sortOrder = $scope.sortOrderInfo[$scope.sortByField];
        $scope.displayedProducts = $filter('orderBy')($scope.displayedProducts, sortOrder.field, sortOrder.reverse);
        $scope.totalProductsCount = $scope.displayedProducts.length;
    }

    //Method which is invoked when any category filter is chosen
    //Finds the selectedCategories and uses "filterProductsByCategories" filter to fetch filtered list of products
    $scope.applyFilter = function(){
        var selectedCategories = [];
        $scope.visibileProductSize = 9;
        angular.forEach($scope.categories, function(category){
            if(category.selected){
                selectedCategories.push(category.name);
            }
        });
        if(selectedCategories.length>0){
            $scope.displayedProducts = $filter('filterProductsByCategories')($scope.products, selectedCategories);
        } else {
            $scope.displayedProducts = $scope.products;
        }
        $scope.sortBy();
        $scope.totalProductsCount = $scope.displayedProducts.length;
    }

    //Method invoked for every scroll and updates the visibleProductsSize 
    //since number of products displayed to user will increase
    $scope.loadMore = function() {
        $scope.visibileProductSize += 9;
    }; 

    //Method invoked for each product price to be displayed with the selected currency and its symbol
    $scope.currencyChange = function(price) {
        var selectedCurrencyInfo = $scope.currenciesInfo[$scope.selectedCurrency];
        var convertedPrice = (price * selectedCurrencyInfo.rate).toFixed(2);
        return selectedCurrencyInfo.symbol+convertedPrice;
    }

    //Method invoked when user clicks the "Top" button to scroll to the top of the page
    $scope.backToTop = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        var backToTopButtonElement = document.getElementById("backToTopButton");
        if(backToTopButtonElement) { backToTopButtonElement.style.display = "none"; }
    }

    //Method to fetch the products and initialize all data
    $scope.fetchProducts = function() {
        var loadMaskElement = document.getElementById('loadmask');
        if(loadMaskElement) { loadMaskElement.style.visibility = "visible";}
        $http.get("https://test-prod-api.herokuapp.com/products").then(function(response) {
            $scope.products = response.data.products;
            $scope.displayedProducts = $filter('orderBy')($scope.products, "price", false);
            $scope.categories = $filter('fetchUniqueCategories')($scope.products);
            $scope.totalProductsCount = $scope.products.length;
            if(loadMaskElement) { loadMaskElement.style.visibility = "hidden"; }
        });
    }

    //Method to fetch the currency rates with INR as base
    $scope.fetchCurrenyRates = function() {
        $http.get("http://api.fixer.io/latest?base=INR").then(function(response) {
            angular.forEach($scope.currenciesInfo, function(value, key) {
                if(key in response.data.rates){
                    $scope.currenciesInfo[key].rate = response.data.rates[key];
                }
            });
        });
    }

    //Method to initialize the page
    $scope.init = function() {
        $scope.fetchProducts();
        $scope.fetchCurrenyRates();
    }
    $scope.init();
}); 