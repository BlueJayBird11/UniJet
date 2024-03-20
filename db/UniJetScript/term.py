import psycopg2

# Establishing the connection
conn = psycopg2.connect(
    database="UniJet",
    user='postgres',
    password='HsmlPostgreSQL',
    host='localhost',
    port='5432'
)

# Creating a cursor object
cursor = conn.cursor()

# Defining the data tuple
data = ("2024-03-13", "2024-05-24", "Spring 2024")

# Executing the insert query
cursor.execute("INSERT INTO term(startDate, endDate, termName) VALUES (%s, %s, %s)", data)

print("Record inserted successfully...")

# Committing the changes in the database
conn.commit()

# Closing the connection
conn.close()
