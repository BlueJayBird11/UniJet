import psycopg2
import pandas as pd

df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Removing nan entries
df = df.dropna(subset=['SEC #'])

unique_names = []

for sec_number in df['SEC #'].unique():
    try:
        sec_number_as_int = int(sec_number)
        unique_names.append((sec_number_as_int,))  # Wrap integer in a tuple
    except ValueError:
        print(f"Invalid section number found: {sec_number}")

print(unique_names)

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

# Inserting records into the table
for d in unique_names:
    cursor.execute("INSERT INTO section(section) VALUES (%s)", d)

print("List has been inserted into the section table successfully...")

# Commit your changes in the database
conn.commit()

# Closing the connection
conn.close()
