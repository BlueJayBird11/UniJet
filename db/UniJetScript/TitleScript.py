import pandas as pd

df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Removing nan entries
df = df.dropna(subset=['TITLE'])

unique_names = list(df['TITLE'].unique())

print(unique_names)