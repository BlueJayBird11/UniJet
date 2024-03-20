import pandas as pd

df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Removing nan entries
df = df.dropna(subset=['CRS #'])

unique_names = list(df['CRS #'].unique())

print(unique_names)