angular.module('directives',[])
//Directive to render the rating stars based on the score of the product
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '='
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < 5; i++) {
                    var ratingValue = scope.ratingValue * 5;
                    scope.stars.push({
                        filled: i < ratingValue
                    });
                }
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
})
//Directive to handle the scroll of the page to list the products
.directive('whenScrolled', function($document, $window) {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if(raw.scrollTop == 1 && raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            } 
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("backToTopButton").style.display = "block";
            } else {
                document.getElementById("backToTopButton").style.display = "none";
            }
        });
    };
})
//Directive to render the loading and error images for the product
.directive("productPic", function() {
    return {
        link: function(scope, element, attrs) {
        var img, loadImage;
        img = null;

        loadImage = function() {
            //Loading image before the actual image is loaded
            element[0].src = "images/loading.gif";
            img = new Image();
            img.src = attrs.productPic;

            img.onload = function() {
                element[0].src = attrs.productPic;
            };

            img.onerror = function() {
                //Error image in case the actual image is not loaded
                element[0].src = "images/no_image.png";
            };
        };

        scope.$watch((function() {
            return attrs.productPic;
        }), function(newVal, oldVal) {
            loadImage();
        });
        }
    };
});
