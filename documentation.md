# Documentation

## Architecture
For this service I went with a basic structure where a MySQL database.
I decided to go with this database because we could create relationships between each key.

###### ERD

![alt text](https://github.com/caquillo07/key-value-storage-service/blob/master/database-ERD.png)

Using this relationship, we can use the `Posts` table as the "source control". 
This way we are able to to add as many revisions as we like, all while getting a new ID for each of them.
Using this structure we are also able to pretty efficiently query against the `Posts` and grab the HTML 
associated with it as per requirement.

I also decided to maintain a reference to the post in the `Links` and `References`, which lets us easily grab the desired 
keys associated with it from the blob.

The REST API is built using NodeJS, and uses Sequelize ORM to communicate with the MySQL database.

## Assumptions and limitations
A limitation introduced by using the HTML's primary key the source of versioning, is that now everything associated to 
a "post" is too tightly coupled to this table. Another alternative to this would of been to have another table where we 
would store the unique IDs, and then point every other key/table to it. This would of given the service a lot more 
flexibility to add new keys if needed, and it would eliminate cases where primary keys would conflict on creation 
of new blobs.

Another limitation is due to a bad assumption, and that is making the Link's `id` a primary key in the database.
This leads to a lot of issues, one being that now the client could run into a `foreign key constraint` error when trying
to add new links to a post. This however, would be eliminated if the primary key would be removed in favor of a 
"unique identifier" that lives on another table as the source of truth, as explained above.

## Code structure.
For this service I decided to go with an MVC-like architecture, where we have controllers for each resource/entity
has a controller to interface with the routes, and a repository to interface with the database.

The folders of interest are `repositories`, `controllers`, and `routes`. The rest of project is mostly boiler plate
to get the application running, but if you are interested in the schemas for the tables check out the 
`migrations` and `models` folders.