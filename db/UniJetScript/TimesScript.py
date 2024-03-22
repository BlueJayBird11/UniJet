import pandas as pd
import re

# Read the CSV file into a DataFrame
df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Check if 'START TIME' and 'END TIME' columns exist
if 'START TIME' in df.columns and 'END TIME' in df.columns:
    # Drop rows with NaN values in 'START TIME' or 'END TIME' columns
    df = df.dropna(subset=['START TIME', 'END TIME'])

    # Convert 'START TIME' and 'END TIME' to 24-hour format
    for col in ['START TIME', 'END TIME']:
        df[col] = df[col].apply(lambda x: x.strip())
        # Handle AM and PM conversion
        df[col] = df[col].apply(lambda x: re.sub(r'(\d{1,2}):?(\d{2})\s*([AP]M)?',
                                                  lambda match: '{:02d}:{}'.format((int(match.group(1)) + 12) if match.group(3) == 'PM' else int(match.group(1)), match.group(2)), x))
        
        # Replace '24' with '12' in start time and end time if present
        df[col] = df[col].apply(lambda x: x.replace('24', '12'))

    # Sort the DataFrame by 'START TIME' and 'END TIME' columns
    df_sorted = df.sort_values(by=['START TIME', 'END TIME'])
    
    # Find unique sets of 'START TIME' and 'END TIME'
    unique_sets = df_sorted.drop_duplicates(subset=['START TIME', 'END TIME'])
    
    # Convert unique sets into a list of tuples
    unique_sets_list = unique_sets[['START TIME', 'END TIME']].values.tolist()

    print(unique_sets_list)
else:
    print("Columns 'START TIME' and 'END TIME' do not exist in the DataFrame.")
    print("Existing columns:", df.columns)

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
 
# list that contain records to be inserted into table
data = unique_sets_list
 
# inserting record into employee table
for d in data:
    cursor.execute("INSERT into timeInformation(startTime, endTime) VALUES (%s, %s)", d)
 
 
print("List has been inserted to employee table successfully...")
 
# Commit your changes in the database
conn.commit()
 
# Closing the connection
conn.close()
