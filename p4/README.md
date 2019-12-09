# Project 4
+ By: Andrew Rodrigez
+ Production URL: <http://p4.squareinches.com>

## Outline of features
*Background*

I am working towards my Masters in Software Engineering and recently found out I took a class that doesn't count towards the degree.

This is my passive aggressive response to that - as I think there should be better tooling at HES to figure out which classes met which degree requirements.

*Features*
Landing on the site - should mirror someone who has logged in using their HES credentials. They are shown 3 pages:
* Degree Audit page - shows list of classes taken thus far and what certificates/degrees the classes satisfy.
* Certificate Program page - showing progress on certain certificate programs
* Masters program page - showing progress on a certain masters program

One of the trickier things was how to implement the NoSQL data model to represent a `Certificate` or `Masters` program and its requirements. I did it as follows

Of note:
* Requirements is an array
* Count is the number of courses needed for this requirement
* Options is a list of courses that satisfy this requirement

```
{
    "id": 2,
    "name": "Backend-End Web Development",
    "requirements": [{
      "count": 1,
      "name": "Required courses",
      "options": ["CSCI E-14A", "CSCI E-26"]
    }, {
      "count": 3,
      "name": "Elective courses",
      "options": ["CSCI E-15", "CSCI E-33A", "DGMD E-28", "CSCI E-14A", "CSCI E-31"]
    }]
  }
```

Local storage is used to mirror a logging in experience. When landing on the site you are prompted with a login form that drops a `user_id` in localStorage. This is used throughout the app to keep track of the current user logged in.
Also added a logout feature that clears this `user_id` from localStorage

## Final project requirements
* Store data in Vuex is used all across the application 
* At least one unit test: p4/tests/unit/NavBar.spec.js


## Full Database can be found here
https://my-json-server.typicode.com/guezandy/e28/


## Outside resources
[Used bootstrap vue for UI components](https://bootstrap-vue.js.org/docs)

