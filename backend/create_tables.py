import psycopg2
import urllib.parse
import os

url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
username = url.username
password = url.password
database = url.path[1:]
hostname = url.hostname

conn = psycopg2.connect(
   database=database, user=username, password=password, host=hostname, port= '5432',
)
cursor = conn.cursor()
cursor.execute("DROP TABLE IF EXISTS customer")
sql ='''CREATE TABLE customer(id SERIAL PRIMARY KEY, name TEXT, country TEXT, age SMALLINT, stair_id SMALLINT);'''
cursor.execute(sql)
conn.commit()
print("Table created")
conn.close()