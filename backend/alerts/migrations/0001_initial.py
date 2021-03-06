# Generated by Django 3.2.9 on 2022-02-14 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('subject', models.CharField(max_length=255)),
                ('sender', models.EmailField(max_length=254)),
                ('receiver', models.EmailField(max_length=254)),
            ],
        ),
    ]
