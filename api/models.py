from django.db import models
from autoslug import AutoSlugField


class BlogPost(models.Model):
    '''Model definition for BlogPost.'''
    title = models.CharField(max_length=200)
    content = models.TextField(blank = True)
    data_added = models.TimeField(auto_now_add=True)
    data_update = models.TimeField(auto_now=True)
    slug = AutoSlugField(populate_from = 'title', max_length = 200, unique = True)

    class Meta:
        '''Meta definition for BlogPost.'''

        verbose_name = 'BlogPost'
        verbose_name_plural = 'BlogPost'

    def __str__(self):
        return self.title 

class Fakemodel(models.Model):
    title = models.CharField
    content = models.TextField(max_length=100)
