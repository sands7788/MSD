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

describe('Filter-fetchUniqueCategories', function() {
    var $filter;
    
    beforeEach( function() {
        module('productsApp');
        inject(function(_$filter_){
            $filter = _$filter_;
        });
    });

    it('Checks if unique categories are fetched from products', function() {
        var fetchUniqueCategories = $filter('fetchUniqueCategories');
        expect(fetchUniqueCategories(productsJSON.products).length).equal(3);
    });
});

describe('Filter-filterProductsByCategories', function() {
    var $filter;
    
    beforeEach( function() {
        module('productsApp');
        inject(function(_$filter_){
            $filter = _$filter_;
        });
    });

    it('Checks if products are filtered based on categories', function() {
        var filterProductsByCategories = $filter('filterProductsByCategories');
        expect(filterProductsByCategories(productsJSON.products,['sarees']).length).equal(1);
    });
});