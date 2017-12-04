# MSD
It is a single page application for an E-Commerce type website based on AngularJS.

### <a name=“setup-and-run”>Features</a>
1. Products are displayed in a 3x3 grid, displaying only 9 products at a time and loading others using infinite scroll pagination without hitting the URL for each page
2. Each item in the grid displays the following information about the product
	* Image - Until the image is downloaded, a spinner is displayed. If there is an error, then “No image available” is shown. Image is scaled and aligned
	* Name
	* Price
	* Category
	* Score - Rendered as stars on a scale of 5
3. All unique categories are listed as filter options and user can select one or more filters to view the subset of products
4. Products can be sorted based on price and score in ascending or descending order
5. The total count and currently visible count of products are shown 
6. Price of the products can be viewed using different currencies(Currently 4 are supported)
7. Once user scrolls down, a floating button appears, on click of which user can navigate back to the top of the page

### <a name=“setup-and-run”>Setup & Run</a>

1. Install Node JS in your laptop from the link - https://nodejs.org/en/download/

2. Verify if node is installed by typing “node -v” from your terminal

3. Git clone the project into a folder

4. Navigate to the project folder from your terminal and run "npm install" to install all dependencies

5. Run "node index.js"

6. Open the URL from your browser - http://localhost:8000/index.html

### <a name=“run-tests”>Run Tests</a>

1. Navigate to the project folder from your terminal and run
   "npm install mocha chai jasmine angular-mocks --save-dev" (Incase the packages are not installed) and "node index.js"

2. Open the URL from your browser - http://localhost:8000/testrunner.html

### <a name=“run-tests”>Ideas for improvements</a>
1. Improve the latency of page load and ajax calls made
2. Support paging, filter and sort from backend instead of loading complete data to UI in a single ajax call
3. Provide search support
4. Display the magnified image when user clicks/hovers over the product image and provide more details about the product if needed
5. Provide more filter options based on price, rating etc

### <a name=“run-tests”>Supported browsers</a>
- Chrome

### <a name=“run-tests”>Known Issues</a>
- Once user starts scrolling, there are two vertical scroll bars appearing in the page
- Scroll is not working in Firefox and Safari browsers since vertical scroll bar in nested flex div has some issues in these browsers
- Once user reaches the end of page, slightly scroll up and then scroll down to load the next products

### Any questions, please contact sands7788@gmail.com ###
