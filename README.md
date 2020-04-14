# GitHub API Service
API Created to consume the GitHub API and handle searching repositories and handle some starring functionality.

## Setting up the service

 1. You should have node.js installed. Go to the [Node.js site](https://nodejs.org/) for more information.
 2. Clone the repository using:  `$ git clone https://github.com/JohnJasso/git-api-service.git`
 3. Move to project folder: `$ cd git-api-service`
 4. Install all dependencies using: `$  npm install`
 5. This service uses simple authentication, for that we need to create a .json credentials file named ***credentials.json*** containing the username and password to be used:
	 ```
	 { 
		 "username": "[user_name]", 
		 "password": "[password]" 
	}
	```
6. Create a ***.gitignore*** file containing the following entries (this way your credentials will not be in the repository):
	```
	.gitignore
	/node_modules
	credentials.json
7. To set a custom port to run the service use the following command: `$ export PORT=port_number`
8. Run the service using `$ nodemon app.js`

## END-Points

 - **GET** */api/search-repo?term=[search_term]*
	Where ***search-term*** is what we wish to send as search query to search repositories by those keywords
	- Results are sorted by stars in a descending order
	- Separate keywords with a **+** sing
	- You can specify *topics* and *languages* in the following way:
		> Each of this instances is considered a keyword and should be separated by a ***+*** sign:
		> */api/search-repo?term=tetris+language:c+topic:game*
- **GET** */api/bookmarks*
	Used to return all bookmarks of the specified user
- **PUT** */api/bookmark-repo/:id*
	Used to bookmark a repository by its id
	> Example: 
	> /api/bookmark-repo/95875527
- **DELETE** */api/bookmark-repo/:id*
	Used to remove the bookmark from a repository by it id
	> Example: 
	> /api/bookmark-repo/95875527
	

> PUT and DELETE request can be made using the popular [Postman
> Application (browser extensions also exist)](https://www.postman.com)