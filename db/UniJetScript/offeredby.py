import psycopg2

# Establishing the connection
conn = psycopg2.connect(
        database="unijet",
        user='unijet_user',
        password='',
        host='',
        port='5432'
    )

# Creating a cursor object
cursor = conn.cursor()

# Generating SQL statements to insert data into the 'offeredBy' table
class_ids = range(1, 1111)  # Assuming class IDs start from 1 and go up to 972
university_id = 1  # Setting university ID to 1 for all entries

for class_id in class_ids:
    sql_insert = "INSERT INTO offeredBy(classID, universityID) VALUES (%s, %s)"
    data = (class_id, university_id)
    cursor.execute(sql_insert, data)

# Committing the changes in the database
conn.commit()

# Closing the connection
conn.close()
