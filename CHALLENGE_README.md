## 🕒 Time Taken for Each Step

### 1. **Setting up the Environment**

- **Time Taken**: 45 min

### 2. **Reviewing the API Endpoints**

- **Time Taken**: 30 minutes
- Reviewed the API documentation and tested all three endpoints:
  - `/api/movies/`
  - `/api/principals/`
  - `/api/names/`
- Verified the response structure and data integrity.

### 3. **Enhancing the Frontend UI/UX**

- **Time Taken**: 2 hours

### 4. **Optimizing the Application**

- **Time Taken**: 2 hours

### 5. **Writing Tests and Ensuring Accessibility**

- **Time Taken**: 1 hour

## 📝 Instructions for Running the Application

### backend

- Use [`pipenv`](https://pipenv.pypa.io/en/latest/) to setup your environment
  - This project uses Python 3.9.5
- `python manage.py runserver` to run the API application
- `python manage.py migrate_imdb_data` to migrate the data from the `imdb_subset.db` into the Django application
  - _This has already been run for you_ and the data included in this repository in `./backend/db.sqlite3`

### frontend

- Use [`npm`](https://www.npmjs.com/) to install dependencies
  - We recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage your Node versions and we've included an `.nvmrc` for you for the version used on this project
- `npm run dev` - this will run the front end server and watch for changes for Tailwind as
