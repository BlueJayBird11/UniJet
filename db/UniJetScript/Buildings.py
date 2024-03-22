import pandas as pd
import psycopg2

# Data for the DataFrame
data = {
    "Name": ["IESB", "GTMH", "BOGH", "UNVH", "WYLT", "HALE", "TVAC", "DAVH", "NETH", "KEEH", "COBB", "WOOH", "CTLH"],
    "fullname": [
        "Integrated Science and Engineering Buil",
        "George T Madison Hall",
        "Boghard Hall",
        "University Hall",
        "Wyly Tower",
        "Hale Hall",
        "F. Jay Taylor Visual Arts Center",
        "Davison Hall",
        "Nethkin Hall",
        "Keeny Hall",
        "College of Business Building",
        "Woodard Hall",
        "Carson-Taylor Hall"
    ],
    "Location": [
        "32.52595205383202, -92.6438754026921",
        "32.52839295890339, -92.64903636000696",
        "32.5260741747002, -92.64563493169584",
        "32.52779741815723, -92.64574758460908",
        "32.52874574248417, -92.6472661020052",
        "32.52810049899069, -92.6491658306657",
        "32.5263983487199, -92.65135378852845",
        "32.52436632945526, -92.64799559459561",
        "32.525974668821284, -92.64476589595027",
        "32.526841767824436, -92.64633204397529",
        "32.52787299527759, -92.6450928634399",
        "32.52733051393183, -92.64924995746156",
        "32.52532580397333, -92.64636906825015"
    ]
}

# Creating the DataFrame
df = pd.DataFrame(data)

# Assuming your database connection details are correct
conn = psycopg2.connect(
        database="unijet",
        user='unijet_user',
        password='',
        host='',
        port='5432'
    )

cursor = conn.cursor()

# Inserting data into the 'buildings' table
for row in df.itertuples(index=False):
    name, fullname, location = row
    # Prepare the SQL query
    query = "INSERT INTO buildings (buildingAddress, buildingName, buildingFullName, buildingLocation) VALUES (%s, %s, %s, %s)"
    # Execute the query with the data
    cursor.execute(query, ('', name, fullname, location))

# Committing the changes in the database
conn.commit()

# Closing the connection
conn.close()

print("Buildings data has been successfully inserted.")
