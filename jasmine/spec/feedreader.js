/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This tests loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
         it('and feed items have a valid URL', function() {
            // Loop throguh allFeeds, check each feedItem for valid URL
            allFeeds.forEach(function(feedItem){
                expect(feedItem.url).toBeDefined();
                // Ensure it is a string
                expect(typeof feedItem.url).toBe('string');
                // Perhaps redundant, but let's see if feedItem.url evalutates 
                // to a falsy expression but checking its negation
                expect(feedItem.url).toBeTruthy();
            });
         });


        /* This test loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
         it('and feed items have a name', function() {
            // Loop throguh allFeeds, check each feedItem for valid name
            allFeeds.forEach(function(feedItem){
                expect(feedItem.name).toBeDefined();
                // Ensure it is a string
                expect(typeof feedItem.name).toBe('string');
                // Perhaps redundant, but let's see if feedItem.name evalutates 
                // to a falsy expression but checking its negation
                expect(feedItem.name).toBeTruthy();
            });
         });

    });


    /* Test suite for "The menu" */
    describe('The menu', function() {
        /* This tests ensures that the menu has the same number of items
         * as the allFeeds array.
         */
        it('should have a link for every feed', function(){
          expect($('.menu .feed-list li a').length).toEqual(allFeeds.length);
        });

        /* This test ensures the menu element is hidden by default.
         */
         it('is hidden on when the page is loaded', function(){
            // Check body tag for the 'menu-hidden' class
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes visibility when the 
          * menu icon is clicked. This test has two expectations: 
          * the menu should display when clicked, and it should
          * hide when clicked again.
          */
          it('should open and close when menu icon is clicked', function(){
            // Store the jQuery object for the menu icon
            var menuIcon = $('.menu-icon-link');

            // Test the first click
            menuIcon.click(); // jQuery click action
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Test the second click
            menuIcon.click(); // jQuery click action
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function() {
        // Call the loadFeeds before each test
        beforeEach(function(done){
            // Make call to load feed
            loadFeed(0, done);
        });

        /* This test ensures that after the loadFeed function is called and
         * completes its work, there is at least a single '.entry' element
         * within the .feed container.
         */
        it('should have one or more entries after feed loads', function(){
            expect($('.feed .entry').length > 0).toBe(true);
        });
    });

    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function(done){
        var prevTitle, prevContents, currTitle, currContents;
        
        // Call the loadFeeds before each test
        beforeEach(function(done){
            // Load feed 0 before each test
            loadFeed(0, function(){
                // Store the default values for comparison
                prevTitle = $('.header-title').html();
                prevContents = $('.feed').html();

                // Load feed 1 for comparison
                loadFeed(1, done);
            }); 
        });

        /* This test ensures that when a new feed is loaded by the loadFeed
         * function, that the title actually changes.
         */
        it('should have a new title', function(){
            // Store the new content for comparison
            currTitle = $('.header-title').html();

            // Test that titles are different
            expect(currTitle).not.toEqual(prevTitle);
        });

        /* This test ensures that when a new feed is loaded by the loadFeed
         * function, that the content actually changes.
         */
        it('should have new content', function(){
            // Store the new content for comparison
            currContents = $('.feed').html();

            // Test that feed items are different
            expect(currContents).not.toEqual(prevContents);
        });
    });
}());
