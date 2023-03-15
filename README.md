# Backend server

To create this server I used variety libraries to make all the functionality of MVC for the future blog website.

The server core is based on node.js technology with express.js framework and mongoose.js library. This type of architecture is based on asynchronous calls, which enables Node.js servers to handle more concurrent request.

## Database models 
There are two models in database. First model contains users' information to represent a person in website.
Second model contains information about posts. It has links to users' model to connect posts with creators. 


## Implemented inquiries
1. registration

This request check DB for duplications, then server makes hash password and saves new data in mongodb.
2. login

This request compare input password with hashed password. Then server creates token based on user's id after successful login.
3. load all posts

This request will show all public posts on blog page.
4. load one post

This request makes route to page with detailed post information. 
5. create post 

This request check for auth token to allow a post creation, then server send it to database.
6. edit post

This request also check for token to allow changes in user's posts in database. 
7. delete post 

This request allows user to delete posts which this user created. Server also delete it from database.

8. media requests

This request allows users to send pictures and save them in server's uploads


