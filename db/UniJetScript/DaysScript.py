import pandas as pd

df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Removing nan entries
df = df.dropna(subset=['DAYS'])

unique_names = list(df['DAYS'].unique())

print(unique_names)

# importing psycopg2 module
import psycopg2
 
# establishing the connection
conn = psycopg2.connect(
        database="unijet",
        user='unijet_user',
        password='',
        host='',
        port='5432'
    )
 
# creating a cursor object
cursor = conn.cursor()
 
# inserting record into employee table
for d in unique_names:
    cursor.execute("INSERT into daysOfWeek(daysOfWeek) VALUES (%s)", (d,))
 
 
print("List has been inserted to employee table successfully...")
 
# Commit your changes in the database
conn.commit()
 
# Closing the connection
conn.close()