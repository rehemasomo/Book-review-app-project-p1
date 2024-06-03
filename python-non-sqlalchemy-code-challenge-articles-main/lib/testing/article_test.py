import pytest
from classes.many_to_many import Article
from classes.many_to_many import Magazine
from classes.many_to_many import Author


class TestArticle:
    """Article in many_to_many.py"""
    def test_has_title(self):
        author = Author("Carry Bradshaw")
        magazine = Magazine("Vogue", "Fashion")
        article_1 = Article(author, magazine, "How to wear a tutu with style")
        article_2 = Article(author, magazine, "Dating life in NYC")

        assert article_1.title == "How to wear a tutu with style"
        assert article_2.title == "Dating life in NYC"

    def test_title_is_immutable_str(self):
        author = Author("Carry Bradshaw")
        magazine = Magazine("Vogue", "Fashion")
        article_1 = Article(author, magazine, "How to wear a tutu with style")

        with pytest.raises(AttributeError):
            article_1.title = "New Title"

        assert article_1.title == "How to wear a tutu with style"

    def test_title_is_valid(self):
        author = Author("Carry Bradshaw")
        magazine = Magazine("Vogue", "Fashion")
        with pytest.raises(ValueError):
            Article(author, magazine, "Test")
        with pytest.raises(ValueError):
            Article(author, magazine, "How to wear a tutu with style and walk confidently down the street")

