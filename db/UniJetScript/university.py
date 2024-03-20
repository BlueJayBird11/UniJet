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

# creating data tuple
d = (1, "Louisiana Tech University", "#003085", "#ca333a", "@latech.edu", "71272", "LA", "201 Mayfield Ave, Ruston", "CT")

# executing the insert query
cursor.execute("INSERT into university(id, uniName, primaryColor, secondaryColor, emailExtension, zip, uniState, uniAddress, timeZone) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", d)

print("Record inserted successfully...")

# Commit your changes in the database
conn.commit()

# Closing the connection
conn.close()
