# Group Project COM229
Social Media App Frontend
This is the frontend implementation for the Social Media App. It handles user interfaces and interacts with the backend to enable features like user authentication, dark/ligh mode, post creation, liking posts, adding/removing friends, viewing feeds, and more. 

Features:
-User Registration and Login
-Switch to dark or light mode
-Create and Like Posts
-View Feed
-Add/Remove Friends
-Profile Management

Setup Instructions:



Installation:
1. Clone the repository:
   git clone <https://github.com/DrBidoof/COM229_FrontEnd>
   cd Group-Project-COM229_FrontEnd
   

2. Install dependencies:
    npm install

3. Set up environment variables:
   - Create a `.env` file in the root directory 
    
     REACT_APP_API_URL=http://localhost:6001
 

4. Run the application:
 
   npm start


   This will start the application at `http://localhost:3000`.


Usage Instructions

1. User Authentication
- Register a User: Navigate to `/register` and fill in the required fields.
- Login a User: Navigate to `/login` and enter your credentials.

2. Posts
- Create a Post: Go to `/create-post` to create a post with or without an image.
- View All Posts: Go to `/feed` to view all posts.
- Like a Post: Click the like button on any post to like/unlike it.

3. Friends
- View Friend's Profile: Go to `/profile/:userId` (replace `:userId` with the actual friend's ID).
- Add/Remove Friends: Click the Add Friend or Remove Friend button on a profile.

4. Dark/Light Mode
- click on the button to switch to either mode

5. Manage Profile
- Click on manage profile button to manage your account
