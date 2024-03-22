import pandas as pd
import re

df = pd.read_csv('SpringQuarterClassSchedule.csv')

unique_names = df['BLDG & ROOM #'].unique()

unique_names_no_numbers = [re.sub(r'[0-9]', '', str(name)) for name in unique_names]

official_building_names = []
for i in unique_names_no_numbers:
    official_building_names.append(i.rstrip())

unique_names = list(set(official_building_names))

print(unique_names)