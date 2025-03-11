# 🎬 Movies

Our front end engineering test here at Counterpart. This will test your skills with React and Tailwind by providing a skeleton of an application for you to start with.

## 📝 Description

This is a small subset of data from the Internet Movie Database (IMDB) non-commercial data set.

[https://developer.imdb.com/non-commercial-datasets/](https://developer.imdb.com/non-commercial-datasets/)

It contains data from the following data sets:

* [title.basics.tsv.gz](https://developer.imdb.com/non-commercial-datasets/#titlebasicstsvgz)
    * Names of movies, shows, etc.
* [title.principals.tsv.gz](https://developer.imdb.com/non-commercial-datasets/#titleprincipalstsvgz)
    * People who worked on the film or show like actors, directors, etc.
* [name.basics.tsv.gz](https://developer.imdb.com/non-commercial-datasets/#titleprincipalstsvgz)
    * Links to the people themselves including their names

We have narrowed down the movies included to movies matching the names of the top 20 Disney movies from [Rotten Tomatoes](https://editorial.rottentomatoes.com/guide/all-disney-animated-theatrical-movies-ranked-by-tomatometer/) by pre-downloading those files and running `import.py`.

```
(movies) ➜  movies python import.py
🚀 Starting the IMDb data processing script!
📂 Loading Title Basics data from ./title.basics.tsv...
📂 Loading Title Principals data from ./title.principals.tsv...
📂 Loading Name Basics data from ./name.basics.tsv...
🎬 Filtering movies to include only the top 20 Disney animated movies...
✅ Filtered 96 movies from Title Basics.
🎭 Filtering principals (cast and crew) for the selected movies...
✅ Filtered 1554 principals.
🧑‍🎨 Filtering names for the selected principals...
✅ Filtered 1226 names.
💾 Connecting to SQLite database...
🎥 Saving filtered movies to the database...
👥 Saving filtered principals to the database...
📜 Saving filtered names to the database...
🎉 All data has been successfully saved to the SQLite database!
🌟 Script completed. Enjoy exploring your IMDb data! 🚀
```

This data is stored in a [SQLite](https://www.sqlite.org/) database in `imdb_subset.db`.

As you might guess, there are many movies that match the _names_ of Disney movies without _being_ the Disney movie.

We have setup a skeleton of a Django project in `./backend` that is running Django REST framework.

There is a small front end installed via [Vite](https://vite.dev/) using [React](https://react.dev/) and [Tailwind](https://tailwindcss.com/) for styling.

## 🏃 Running the Applications

### `backend`

* Use [`pipenv`](https://pipenv.pypa.io/en/latest/) to setup your environment
    * This project uses Python 3.9.5
* `python manage.py runserver` to run the API application
* `python manage.py migrate_imdb_data` to migrate the data from the `imdb_subset.db` into the Django application
    * _This has already been run for you_ and the data included in this repository in `./backend/db.sqlite3`

### API endpoints
Once the server is running there are three endpoints available:

* [http://127.0.0.1:8000/api/movies/](http://127.0.0.1:8000/api/movies/)
```json
[
    {
        "tconst": "tt0017162",
        "title_type": "movie",
        "title": "Moana",
        "original_title": "Moana",
        "is_adult": false,
        "year": "1926",
        "end_year": null,
        "runtime": "85",
        "genre": "Documentary"
    },
    {
        "tconst": "tt0029583",
        "title_type": "movie",
        "title": "Snow White and the Seven Dwarfs",
        "original_title": "Snow White and the Seven Dwarfs",
        "is_adult": false,
        "year": "1937",
        "end_year": null,
        "runtime": "83",
        "genre": "Adventure,Animation,Family"
    },
```

* [http://127.0.0.1:8000/api/principals/](http://127.0.0.1:8000/api/principals/)
```json
[
    {
        "id": 1,
        "category": "actor",
        "job": null,
        "characters": [
            "Moana"
        ],
        "tconst": "tt0017162",
        "nconst": "nm0845808"
    },
    {
        "id": 2,
        "category": "actor",
        "job": null,
        "characters": [
            "Moana's Fiancé"
        ],
        "tconst": "tt0017162",
        "nconst": "nm0264390"
    },
```

* [http://127.0.0.1:8000/api/names/](http://127.0.0.1:8000/api/names/)
```json
[
    {
        "nconst": "nm0000051",
        "name": "James Mason",
        "birth_year": "1909",
        "death_year": "1984",
        "primary_professions": "actor,producer,writer",
        "known_for_titles": "tt0056193,tt0053125,tt0047522,tt0084855"
    },
    {
        "nconst": "nm0000100",
        "name": "Rowan Atkinson",
        "birth_year": "1955",
        "death_year": null,
        "primary_professions": "actor,writer,producer",
        "known_for_titles": "tt0274166,tt1634122,tt0110357,tt0118689"
    },
```

### `frontend`

* Use [`npm`](https://www.npmjs.com/) to install dependencies
    * We recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage your Node versions and we've included an `.nvmrc` for you for the version used on this project
* `npm run dev` - this will run the front end server and watch for changes for Tailwind as well
* Should load a list of all of the movies. 
* When clicking on a movie, it should load the Principals for the movie alongside.

## 🏁 The Challenge

We want you to showcase your front-end expertise by improving the Movies application.

* **Enhance the user experience**:
    * Create a polished application shell with a header, navigation, and footer
    * Improve the list of movies:
        * Add sorting and filtering options directly in the UI
            * E.g., by year, genre
        * Implement better scrolling or pagination for navigation that makes sense
    * Style the movie details page:
        * Display principals in a visually appealing card layout
        * Add tabs or sections for more detailed information
    * Use animations or transitions to improve the app's responsiveness and interactivity
* **Optimize the application**: 
    * Use caching techniques to reduce redundant API calls
    * Lazy load components or data where it makes sense for performance optimization
* **Testing and accessibility**:
    * Write comprehensive tests for your components
    * Ensure the application is accessible and adheres to basic WCAG guidelines

_Please reach out if you have any questions at all._

**Your submission should be a _private_ GitHub repository was created from this `zip` file and edited.**

**Your submission _must_ include a written component.**

* Approximate steps you took
    * How long each step took you
* Instructions for applying your changes / running your application

### 🤩 Bonus

* Include the ratings for this data
* Publish the application somewhere we can view it
