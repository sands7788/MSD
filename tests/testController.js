var expect = chai.expect;
var productsJSON = {
    "products": [
      {
        "cat": "jeans", 
        "id": 1, 
        "img": "http://lorempixel.com/292/398/fashion/", 
        "name": "jeans 1", 
        "price": 1228, 
        "score": 0.23483014633917532, 
        "url": "http://www.example.com/"
      },{
        "cat": "sarees", 
        "id": 2, 
        "img": "http://lorempixel.com/301/436/fashion/", 
        "name": "sarees 2", 
        "price": 1937, 
        "score": 0.44741480603923756, 
        "url": "http://www.example.com/"
      },{
        "cat": "pants", 
        "id": 3, 
        "img": "http://lorempixel.com/273/366/fashion/", 
        "name": "pants 4", 
        "price": 2437, 
        "score": 0.6054607650821381, 
        "url": "http://www.example.com/"
      }]
  };
var currenciesJSON = {"base":"INR","date":"2017-12-04","rates":{"GBP":0.011481,"USD":0.015528,"EUR":0.013087}};
describe('Controller', function() {
    var $controller, $rootScope, $httpBackend, $filter;

    beforeEach(function () {
        module('productsApp');

        module(function($provide) {
            $provide.value('orderBy', productsJSON);
        }); 

        inject(function(_$controller_, _$rootScope_, _$httpBackend_, _$filter_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $filter = _$filter_;
        });
    });

    describe('Method sortBy', function() {
        afterEach (function () {
            $httpBackend.verifyNoOutstandingExpectation ();
            $httpBackend.verifyNoOutstandingRequest ();
        });
        beforeEach(function() {
            $httpBackend.when('GET', 'https://test-prod-api.herokuapp.com/products').respond(productsJSON);
            $httpBackend.when('GET', 'http://api.fixer.io/latest?base=INR').respond(currenciesJSON);
        });
        it('Should sort products by price high-to-low', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('productsController', { $scope: $scope, $filter:$filter});
            $httpBackend.flush();
            $scope.sortByField = "price-dsc";
            $scope.sortOrderInfo = {"price-dsc" : {
                "label" : "Price: High to Low",
                "reverse" : true,
                "field" : "price"
            }};
            $scope.sortBy();
            expect(productsJSON.products[2].price).equal($scope.displayedProducts[0].price);
            expect(productsJSON.products[1].price).equal($scope.displayedProducts[1].price);
            expect(productsJSON.products[0].price).equal($scope.displayedProducts[2].price);
        });
    });

    describe('Method applyFilter', function() {
        afterEach (function () {
            $httpBackend.verifyNoOutstandingExpectation ();
            $httpBackend.verifyNoOutstandingRequest ();
        });
        beforeEach(function() {
            $httpBackend.when('GET', 'https://test-prod-api.herokuapp.com/products').respond(productsJSON);
            $httpBackend.when('GET', 'http://api.fixer.io/latest?base=INR').respond(currenciesJSON);
        });
        it('Should filter products by category-sarees', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('productsController', { $scope: $scope, $filter:$filter});
            $httpBackend.flush();
            $scope.products = productsJSON.products;
            $scope.categories = [{
                "name":"sarees",
                "selected":true
            },{
                "name":"jeans",
                "selected":false
            }];
            $scope.sortByField = "price-asc";
            $scope.sortOrderInfo = {"price-asc" : {
                "label" : "Price: Low to High",
                "reverse" : false,
                "field" : "price"
            }};
            $scope.applyFilter();
            expect($scope.displayedProducts.length).equal(1);
        });
    });

    describe('Method loadMore', function() {
        afterEach (function () {
            $httpBackend.verifyNoOutstandingExpectation ();
            $httpBackend.verifyNoOutstandingRequest ();
        });
        beforeEach(function() {
            $httpBackend.when('GET', 'https://test-prod-api.herokuapp.com/products').respond(productsJSON);
            $httpBackend.when('GET', 'http://api.fixer.io/latest?base=INR').respond(currenciesJSON);
        });
        it('Should increase visibleProductSize in multiples of 9', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('productsController', { $scope: $scope, $filter:$filter});
            $scope.visibleProductSize = 9;
            $httpBackend.flush();
            $scope.loadMore();
            expect(($scope.visibleProductSize%9)).equal(0);
        });
    });

    describe('Method currencyChange', function() {
        afterEach (function () {
            $httpBackend.verifyNoOutstandingExpectation ();
            $httpBackend.verifyNoOutstandingRequest ();
        });
        beforeEach(function() {
            $httpBackend.when('GET', 'https://test-prod-api.herokuapp.com/products').respond(productsJSON);
            $httpBackend.when('GET', 'http://api.fixer.io/latest?base=INR').respond(currenciesJSON);
        });
        it('Should change currency', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('productsController', { $scope: $scope, $filter:$filter});
            $httpBackend.flush();
            $scope.selectedCurrency = 'USD';
            var returnValue = $scope.currencyChange(100);
            var selectedCurrencyInfo = $scope.currenciesInfo['USD'];
            var convertedPrice = selectedCurrencyInfo.symbol+((100 * selectedCurrencyInfo.rate).toFixed(2));
            expect(returnValue).equal(convertedPrice);
        });
    });

    
});