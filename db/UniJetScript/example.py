# importing psycopg2 module
import psycopg2
 
# establishing the connection
conn = psycopg2.connect(
    database="UniJet",
    user='postgres',
    password='HsmlPostgreSQL',
    host='localhost',
    port='5432'
)
 
# creating a cursor object
cursor = conn.cursor()
 
# creating table
sql = '''CREATE TABLE employee(
 id  SERIAL NOT NULL,
 name varchar(20) not null,
 state varchar(20) not null
)'''
 
 
# list that contain records to be inserted into table
data = [('Babita', 'Bihar'), ('Anushka', 'Hyderabad'), 
        ('Anamika', 'Banglore'), ('Sanaya', 'Pune'),
        ('Radha', 'Chandigarh')]
 
# inserting record into employee table
for d in data:
    cursor.execute("INSERT into section(id, section) VALUES (%s, %s)", d)
 
 
print("List has been inserted to employee table successfully...")
 
# Commit your changes in the database
conn.commit()
 
# Closing the connection
conn.close()