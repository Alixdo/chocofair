# Makes a json file that stores the important data of a csv 
# file in a dictionnary.

import csv
import json

csvFile = 'CocoaExpVal2000_2011.csv'
jsonFileName = '_CocoaExpVal2000_2011.json'

dataDic = {}

with open(csvFile, 'rb') as csvfile:
	csvReader = csv.reader(csvfile)
	for row in csvReader:
		if row[8] == '2011':
			if row[3] == "European Union":
				break
			dataDic[row[2]] = int(row[9])

with open(jsonFileName, "w") as f:
	json.dump(dataDic, f, indent=4)



	