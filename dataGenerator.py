import csv
import random
from faker import Faker

fake = Faker()

data = []

n = 1000

for _ in range(n):
    major = random.choice(['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Biology', 'Mathematics', 'Physics'])
    cne = fake.random_letter() + str(fake.random_number(9))
    cin = ''.join(fake.random_letters(length=random.randint(1, 2))).upper() + str(fake.random_number(6))
    data.append({
        'name': fake.name(),
        'CNE': cne,
        'CIN': cin,
        'S1': random.uniform(0, 20),
        'S2': random.uniform(0, 20),
        'S3': random.uniform(0, 20),
        'S4': random.uniform(0, 20),
        'S5': random.uniform(0, 20),
        'S6': random.uniform(0, 20),
        'major': major
    })
    
csv_filename = 'generated_data.csv'
with open(csv_filename, 'w', newline='') as csvfile:
    fieldnames = ['name', 'CNE', 'CIN', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'major']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for entry in data:
        writer.writerow(entry)

print(f"Data saved to {csv_filename}")
