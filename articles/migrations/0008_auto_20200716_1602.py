# Generated by Django 3.0.6 on 2020-07-16 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_auto_20200716_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trade',
            name='instigatorProductID',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='trade',
            name='recieverProductID',
            field=models.CharField(max_length=120),
        ),
    ]
