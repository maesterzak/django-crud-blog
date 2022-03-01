from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

# Create your models here.


class Post (models.Model):
    title = models.CharField(max_length=100)
    body = RichTextUploadingField()
    image = models.ImageField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    published = models.BooleanField(default=False)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

