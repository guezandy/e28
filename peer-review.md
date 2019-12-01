## P3 Peer Review

+ Reviewer's name: Andrew Rodriguez
+ Reviwee's name: apatruno618
+ URL to reviewee's Github repo: *https://github.com/apatruno618/e28/tree/master/p3*

### Are you able to produce any errors or unexpected results?
* No errors or console warnings while navigating through the site.
* Overall site was easy to navigate

### Were there any parts of the interface that you found confusing or unclear?
* From the home page it was hard to understand what the site does
* The placement of the navigation could be improved
* "Add to favorites" doesn't really seem like a button in the recipe's page
* The "directions" numbering being left aligned while the rest of the text is centered
* After you favorite something it should be clickable so you can easily go to the recipe page again
* Categories page seems incomplete - there is nothing you can do besides see the categories
* There could be better seperation of Vue related JS files and helper classes ex: Favorites.js, recipes.js could be put into a helpers folder. 

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?
* `ShowSelected` could be renamed to `ShowSelectedCategory` to help understand how its being used. 
* Doesn't seem like there is a way to change the `selectedCategory` on the home page. Selected category is hard coded to `side dish` and there is no way to change it via the UI.
* It was difficult to figure out which parts were incomplete on purpose and which weren't. It seems categories/category pages weren't done as well as selecting categories on the home page. 
```
addToFavorites: function(recipeId) {
  let favorites = new app.Favorites();
  favorites.add(recipeId);
}
```
* I think this is not an ideal way to handle adding to favorites because everytime a new favorite is added it instantiates this `Favorites` object which involves loaded data from localStorage. Instead of loading everytime you add a Favorite - consider just loading the data once at the beginning and add to favorite just updates the values in localStorage.

### Are there any parts of the code that you found interesting or taught you something new?
* I am not sure why `axios` was imported in the app.js file to be exported and then imported via the app.js file. Its one line of code to import in each component individually.

### Are there any best practices discussed in course material that you feel were not addressed in the code?
* Not really, I thought the Vue code was really well structured and followed all the best practices. I think the site overall is on its way to be a nicely setup site. Just need a little more cleeannup.

### Do you have any additional comments not covered in the above questions
* Setup of main.js was clear and nicely done
