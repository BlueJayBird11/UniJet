import pandas as pd
import psycopg2
from datetime import datetime

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    database="unijet",
    user='unijet_user',
    password='',
    host='',
    port='5432'
)
cur = conn.cursor()

# Function to insert data into classInfo table
def insert_class_info(class_id, time_info_id, section_id, days_of_week_id, building_id, term_id):
    query = """
    INSERT INTO classInfo (classID, timeInfoID, sectionID, daysOfWeekID, buildingID, termID)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cur.execute(query, (class_id, time_info_id, section_id, days_of_week_id, building_id, term_id))

# Read CSV file using pandas
df = pd.read_csv('SuperCleanedSpringQuarterClassSchedule.csv')

total_rows = len(df)
processed_rows = 0

# Iterate through each row and insert data into classInfo table
for index, row in df.iterrows():
    # Get classID from classes table
    cur.execute("SELECT id FROM classes WHERE classSubject = %s AND courseNumber = %s AND className = %s", (row['SUBJ'], row['CRS #'], row['TITLE']))
    class_id = cur.fetchone()[0]

    # Get timeInfoID from timeInformation table
    start_time_csv = datetime.strptime(str(row['START TIME']), '%I%M%p').strftime('%I:%M:%S %p')
    end_time_csv = datetime.strptime(str(row['END TIME']), '%I%M%p').strftime('%I:%M:%S %p')
    try:
        cur.execute("SELECT id FROM timeInformation WHERE startTime = %s AND endTime = %s", (start_time_csv, end_time_csv))
        time_info_id = cur.fetchone()[0]
    except TypeError as e:
        print("Error occurred while fetching timeInfoID:", e)
        continue  # Skip this iteration and move to the next row

    # Get termID from term table
    start_date = datetime.strptime(row['SESS BEGIN'], '%m/%d/%Y').date()
    end_date = datetime.strptime(row['SESS END'], '%m/%d/%Y').date()
    session = row['SESSION'] if str(row['SESSION']).lower() != 'nan' else None
    cur.execute("SELECT id FROM term WHERE startDate = %s AND endDate = %s AND termName = %s", (start_date, end_date, session))
    result = cur.fetchone()
    term_id = 1
        
    # Get sectionID from section table
    cur.execute("SELECT id FROM section WHERE section = %s", (str(row['SEC #']),))
    section_id = cur.fetchone()[0]

    # Get daysOfWeekID from daysOfWeek table
    cur.execute("SELECT id FROM daysOfWeek WHERE daysOfWeek = %s", (row['DAYS'],))
    days_of_week_id = cur.fetchone()[0]

    # Splitting the building name and room number and taking only the building name
    building_column_value = row['BLDG & ROOM #']
    if isinstance(building_column_value, str):
        building_name = building_column_value.split(' ')[0]
    else:
        print("Building name is not a string:", building_column_value)
        continue  # Skip this iteration and move to the next row

    # Get buildingID from buildings table
    cur.execute("SELECT id FROM buildings WHERE buildingName = %s", (building_name,))
    building_row = cur.fetchone()
    if building_row is not None:
        building_id = building_row[0]
    else:
        print("No matching record found in buildings table for buildingName:", building_name)
        continue  # Skip this iteration and move to the next row

    # Insert data into classInfo table
    insert_class_info(class_id, time_info_id, section_id, days_of_week_id, building_id, term_id)
    
    processed_rows += 1
    progress = processed_rows / total_rows * 100
    remaining = total_rows - processed_rows
    print(f"{processed_rows} / {total_rows} done, {processed_rows} - {remaining} left")

# Commit changes and close connection
conn.commit()
conn.close()
