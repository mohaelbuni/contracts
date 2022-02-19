FROM python

WORKDIR /app

COPY  requirements.txt .
RUN pip install -r requirements.txt
RUN apt-get update
RUN pip install --upgrade pip
RUN pip install psycopg2-binary
COPY . .

# RUN python manage.py makemigration
# RUN python manage.py migrate

CMD ["python","manage.py","runserver","0.0.0.0:8000"]


