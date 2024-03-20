import pandas as pd
import psycopg2

# Read the CSV file into a DataFrame
df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Check if required columns exist
required_columns = ['SUBJ', 'CRS #', 'TITLE']
if all(col in df.columns for col in required_columns):
    # Drop rows with NaN values in required columns
    df = df.dropna(subset=required_columns)

    # Convert the 'CRS #' column to integers, removing any letters
    df['CRS #'] = df['CRS #'].apply(lambda x: (''.join(str(x))))

    # Correct the 'SUBJ' column if needed
    df['SUBJ'] = df['SUBJ'].apply(lambda x: x.strip().upper())  # Ensure SUBJ is in uppercase and stripped of whitespaces

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

    # Set to keep track of unique classes
    unique_classes = set()

    # Inserting data into the 'classes' table
    for row in df.itertuples(index=False, name=None):
        subject, course_number, class_name = row[0], row[1], row[5]
        class_info = (subject, course_number, class_name)
        if class_info not in unique_classes:
            unique_classes.add(class_info)
            print("CLASS: ", class_name, "CRS NUM:", course_number, "Subject: ", subject)
            cursor.execute("INSERT INTO classes(classSubject, courseNumber, className) VALUES (%s, %s, %s)", (subject, course_number, class_name))

    # Committing the changes in the database
    conn.commit()

    # Closing the connection
    conn.close()

    # Print the list of unique sets
    for subj, crs, title in df[required_columns].values:
        print(f"Title: {title}, CRS #: {crs}, Subject: {subj}")
    print(df[required_columns].values.tolist())
else:
    print("Required columns are missing in the DataFrame.")
