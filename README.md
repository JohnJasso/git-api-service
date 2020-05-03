# GitHub API Service

API Created to consume the GitHub API and handle searching repositories and handle some starring functionality.

## Setting up the service

1.  You should have node.js installed. Go to the [Node.js site](https://nodejs.org/) for more information.
2.  Clone the repository using: `$ git clone https://github.com/JohnJasso/git-api-service.git`
3.  Move to project folder: `$ cd git-api-service`
4.  Install all dependencies using: `$ npm install`
5.  This service uses simple authentication, for that we need to create a .json credentials file named **_credentials.json_** containing the username and password to be used:
    ```
    {
     "username": "[user_name]",
     "password": "[password]"
    }
    ```
6.  Create a **_.gitignore_** file containing the following entries (this way your credentials will not be in the repository):
    ```
    .gitignore
    /node_modules
    credentials.json
    ```
7.  To set a custom port to run the service use the following command: `$ export PORT=port_number`
8.  Run the service using `$ nodemon app.js`

## END-Points

- **GET** _/api/search-repo?term=[search_term]_
  Where **_search-term_** is what we wish to send as search query. Repositories will be searched by the specified keywords: - Results are sorted by stars in a descending order - Separate keywords with a **space** or **+** sign - You can specify _topics_, _languages_ and _repository owner_ in the following way: > Each of these instances is considered a keyword and should be separated by a **_space_** or **_+_** sign: > _/api/search-repo?term=tetris+language:c+topic:game_ > _/api/search-repo?term=git api language:javascript user:JohnSmith_
- **GET** _/api/bookmarks_
  Used to return all bookmarks of the specified user
- **PUT** _/api/bookmark-repo/:id_
  Used to bookmark a repository by its id > Example: > /api/bookmark-repo/95875527
- **DELETE** _/api/bookmark-repo/:id_
  Used to remove the bookmark from a repository by it id > Example: > /api/bookmark-repo/95875527

> PUT and DELETE requests can be made using the popular [Postman
> Application (browser extensions also exist)](https://www.postman.com)
