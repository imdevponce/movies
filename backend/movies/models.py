from django.db import models

# Defined here: https://developer.imdb.com/non-commercial-datasets/

class Movie(models.Model):
    tconst = models.CharField(max_length=20, primary_key=True)  # Unique identifier for the title
    title_type = models.CharField(max_length=50)  # Corresponds to 'titleType' in title.basics
    title = models.CharField(max_length=200)  # Corresponds to 'primaryTitle'
    original_title = models.CharField(max_length=200, blank=True, null=True)  # 'originalTitle'
    is_adult = models.BooleanField(default=False)  # 'isAdult' (0 or 1)
    year = models.CharField(max_length=4, blank=True, null=True)  # 'startYear'
    end_year = models.CharField(max_length=4, blank=True, null=True)  # 'endYear'
    runtime = models.CharField(max_length=10, blank=True, null=True)  # 'runtimeMinutes'
    genre = models.CharField(max_length=200, blank=True, null=True)  # 'genres'

    def __str__(self):
        return f"{self.title} ({self.year})"

class Name(models.Model):
    nconst = models.CharField(max_length=20, primary_key=True)  # Unique identifier for the name
    name = models.CharField(max_length=200)  # Corresponds to 'primaryName' in name.basics
    birth_year = models.CharField(max_length=4, blank=True, null=True)  # 'birthYear'
    death_year = models.CharField(max_length=4, blank=True, null=True)  # 'deathYear'
    primary_professions = models.CharField(max_length=200, blank=True, null=True)  # 'primaryProfession'
    known_for_titles = models.TextField(blank=True, null=True)  # 'knownForTitles' (comma-separated list of tconsts)

    def __str__(self):
        return self.name

class Principal(models.Model):
    tconst = models.ForeignKey(Movie, on_delete=models.CASCADE)  # ForeignKey to Movie
    nconst = models.ForeignKey(Name, on_delete=models.CASCADE)  # ForeignKey to Name
    category = models.CharField(max_length=50)  # 'category' in title.principals (e.g., actor, director)
    job = models.CharField(max_length=200, blank=True, null=True)  # 'job' in title.principals
    characters = models.JSONField(blank=True, null=True)  # 'characters' (JSON-encoded list in title.principals)

    def __str__(self):
        return f"{self.nconst.name} in {self.tconst.title} ({self.category})"