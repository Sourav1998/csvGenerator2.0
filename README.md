# csvGenerator2.0
An Express.js route that integrates data from three different API endpoints, extracts specific key values from their responses, writes these values into a CSV file based on where user.id matches with post.userid and post.id matches with post.id matches with comment.postid, and returns the path to the generated CSV file.

**In this code I have did more mapping where from post api post.userid is mapped with user api user.id and comment api comment.postid is mapped with post api post.id. Reason behind doing is when I looking post api JSON I found every user has 10 post associated with it and while looking at comment api JSON I found every post as 5 comments.**

After downloading the repo into your local. Kindly install below packages.

npm install express axios json2csv

Also you can install nodemon to avoid manually stoping and restarting your server every time you modify your code. Nodemon will help in automatically restart your Node.js server whenever you make changes.

npm install -g nodemon

After doing above just hit below command to start the server(You should be inside the repo directory).

When nodemon is not installed in your system :- node csvgenerator2.js

When nodemon is installed in your system :- nodemon csvgenerator2.js

After hitting the above command just copy,paste and hit the below URL in your browser.

http://localhost:8080/generate-csv

To see the error message kindly remove m from any of the API from the code from line number 10 to 12 const API_USERS = 'https://jsonplaceholder.typicode.co/users'; const API_POSTS = 'https://jsonplaceholder.typicode.com/posts'; const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

Or

const API_USERS = 'https://jsonplaceholder.typicode.com/users'; const API_POSTS = 'https://jsonplaceholder.typicode.co/posts'; const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

Or

const API_USERS = 'https://jsonplaceholder.typicode.com/users'; const API_POSTS = 'https://jsonplaceholder.typicode.com/posts'; const API_COMMENTS = 'https://jsonplaceholder.typicode.co/comments';

**Haven taken some help form internet while implementing it for mapping part.**
