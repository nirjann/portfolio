# Project Breakdown

## Identifying the users

- The Admin (me)
  - **Permissions**
    - Create Blogs
    - Edit existing blogs
    - Delete Blogs
    - Add new users [optional]
    - manage user roles [optional]
    - Delete Users [optional]
- Readers/Recruiters

## Identifying the features of the project

- Presenting the static information in an organized and visual way
- Blogs
- Admin Dashboard for Blog Manipulation

## Identifying the Resources

- User Resource
- Blog Resource

## Identifying the Actions

- **User Creation [optional feature]**

  - From the Admin panel
  - User Credentials are sent
  - Email and Password are validated
  - User Roles has been well specified
  - User has been created and stored in DB.

- **Admin Login**

  - From the admin panel the user logs in using credentials
  - The credentials are validated against the database
  - An access token has been issued and sent as a cookie
  - User successfully logged in.

- **Create Blogs**
  - Write blogs from the editor on the admin panel
  - Blogs are sanitized first
  - Blogs are saved in raw text into the database ?
  - Raw Blogs are transformed into html files and saved in S3?
  - Reference of the HTML blogs are saved into the DB.

## Mapping Resources

### User Resource

| Action      | Verb | Endpoint          | Status code                                  |
| ----------- | ---- | ----------------- | -------------------------------------------- |
| Admin Login | POST | /auth/local/login | 200 Ok for successful, 401 for denied access |

#### lets do this in graphQL

- A login mutation is needed
- incoming user credentials are validated
- logs in the user by sending access token as cookie
-

### Blogs Resource

- Let's implement a graphql API for efficient query and mutation

| Action      | Verb | Endpoint | Schema                                                                                        |
| ----------- | ---- | -------- | --------------------------------------------------------------------------------------------- |
| Create Blog | POST | /graphql | `query {fetchBlogs(args: limit and offset) {title referenceLink createdAt updatedAt author}}` |
