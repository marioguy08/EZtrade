# Generated by Django 3.0.6 on 2020-07-13 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='createdBy',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
    ]
