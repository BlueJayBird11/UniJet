import pandas as pd

df = pd.read_csv('SpringQuarterClassSchedule.csv')

# Removing nan entries
df = df.dropna(subset=['SUBJ'])

unique_names = list(df['SUBJ'].unique())

print(unique_names)