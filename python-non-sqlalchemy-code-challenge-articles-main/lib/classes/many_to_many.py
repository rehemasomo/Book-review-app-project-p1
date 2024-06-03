class Article:
    all = []

    def __init__(self, author, magazine, title):
        if not isinstance(author, Author):
            raise ValueError("Author must be an instance of Author class")
        if not isinstance(magazine, Magazine):
            raise ValueError("Magazine must be an instance of Magazine class")
        if not (5 <= len(title) <= 50):
            raise ValueError("Title must be between 5 and 50 characters")  # Added validation for title length
        self._author = author
        self._magazine = magazine
        self._title = title
        Article.all.append(self)

    @property
    def title(self):
        return self._title

    @property
    def author(self):
        return self._author

    @property
    def magazine(self):
        return self._magazine

    @classmethod
    def remove(cls, article):
        if article in cls.all:
            cls.all.remove(article)


class Author:
    def __init__(self, name):
        if not isinstance(name, str):
            raise ValueError("Name must be a string")
        if len(name) == 0:
            raise ValueError("Name must not be empty")
        self._name = name
        self._articles = []

    @property
    def name(self):
        return self._name

    def articles(self):
        return self._articles

    def add_article(self, magazine, title):
        article = Article(self, magazine, title)
        self._articles.append(article)
        return article

    def magazines(self):  
        return list(set(article.magazine for article in self._articles))

    def topic_areas(self):
        if not self._articles:
            return []
        return list(set(article.magazine.category for article in self._articles))
   
    def __str__(self):
        return f"Author: {self._name}"



class Magazine:
    _all_magazines = []

    def __init__(self, name, category):
        if not isinstance(name, str):
            raise ValueError("Name must be a string")
        if not (2 <= len(name) <= 16):
            raise ValueError("Name must be between 2 and 16 characters")
        if not isinstance(category, str):
            raise ValueError("Category must be a string")
        if len(category.strip()) == 0:
            raise ValueError("Category must not be empty")  # Category validation
        self._name = name
        self._category = category
        self._articles = []
        Magazine._all_magazines.append(self)

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not isinstance(value, str):
            raise ValueError("Name must be a string")
        if not (2 <= len(value) <= 16):
            raise ValueError("Name must be between 2 and 16 characters")
        self._name = value

    @property
    def category(self):
        return self._category

    @category.setter
    def category(self, value):
        if not isinstance(value, str):
            raise ValueError("Category must be a string")
        if len(value.strip()) == 0:
            raise ValueError("Category must not be empty")
        self._category = value

    def articles(self):
        return self._articles  # Change articles property to a method

    def add_article(self, author, title):
        article = Article(author, self, title)
        self._articles.append(article)
        return article

    def article_titles(self):
        return [article.title for article in self._articles]

    def contributing_authors(self):
        authors_count = {}
        for article in self._articles:
            author = article.author
            if author in authors_count:
                authors_count[author] += 1
            else:
                authors_count[author] = 1
        return [author for author, count in authors_count.items() if count > 2]  # Fix contributing_authors method

    @classmethod
    def top_publisher(cls):
        if not cls._all_magazines:
            return None
        return max(cls._all_magazines, key=lambda magazine: len(magazine.articles))

    def contributors(self):
        unique_contributors = set()
        for article in self._articles:
            unique_contributors.add(article.author)
        return list(unique_contributors)

    def __str__(self):
        return f"Magazine: {self._name}, Category: {self._category}"
