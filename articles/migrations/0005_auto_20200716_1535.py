# Generated by Django 3.0.6 on 2020-07-16 22:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20200716_1457'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trade',
            name='instigatorProductID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='articles.Article'),
        ),
    ]
