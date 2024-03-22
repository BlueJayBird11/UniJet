import csv

def filter_csv(input_file, output_file):
    with open(input_file, 'r', newline='') as infile:
        reader = csv.reader(infile)
        rows = [row for row in reader if row[7].strip() != '']
        
    with open(output_file, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(rows)

# Example usage:
input_filename = 'CleanedSpringQuarterClassSchedule.csv'
output_filename = 'SuperCleanedSpringQuarterClassSchedule.csv'
filter_csv(input_filename, output_filename)