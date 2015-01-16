import csv
import json

csvFile = 'CocoaExpVal2000_2011.csv'
jsonFileName = '_Test.json'


dataDic = []

with open(csvFile, 'rb') as csvfile:
	csvReader = csv.reader(csvfile)
	for row in csvReader:
		dataDic.append(row[3])

with open(jsonFileName, "w") as f:
	json.dump(dataDic, f, indent=4)