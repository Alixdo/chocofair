# Makes a json file that stores the important data of a csv 
# file in a dictionnary.

import csv
import json

csvFile = 'CocoaProdQuan2011.csv'
jsonFileName = '_CocoaProdQuan2011.json'

dataDic = {}

with open(csvFile, 'rb') as csvfile:
	csvReader = csv.reader(csvfile)
	for row in csvReader:
		if row[8] == '2011':
			if row[3] == "European Union":
				continue
			elif row[3] == "South-Eastern Asia":
				continue
			elif row[3] == "Eastern Asia":
				continue
			elif row[3] == "Eastern Africa":
				continue
			elif row[3] == "Northern Africa":
				continue
			elif row[3] == "Western Africa":
				continue
			elif row[3] == "Eastern Africa":
				continue
			elif row[3] == "Southern Africa":
				continue
			elif row[3] == "Northern Europe":
				continue
			elif row[3] == "EU(25)ex.int":
				continue
			elif row[3] == "World":
				continue
			elif row[3] == "Asia":
				continue
			elif row[3] == "Europe":
				continue
			elif row[3] == "Africa":
				continue
			elif row[3] == "Oceania":
				continue
			elif row[3] == "Americas":
				continue
			elif row[3] == "Central Asia":
				continue
			elif row[3] == "Central America":
				continue
			elif row[3] == "Southern Asia":
				continue
			elif row[3] == "Western Asia":
				continue
			elif row[3] == "Middle Africa":
				continue
			elif row[3] == "China ex.int":
				continue
			elif row[3] == "Melanesia":
				continue
			elif row[3] == "EU(12)ex.int":
				continue
			elif row[3] == "EU(15)ex.int":
				continue
			elif row[3] == "EU(27)ex.int":
				continue
			elif row[3] == "Caribbean":
				continue
			elif row[3] == "Polynesia":
				continue
			elif row[3] == "Southern Europe":
				continue
			elif row[3] == "Eastern Europe":
				continue
			elif row[3] == "Western Europe":
				continue
			elif row[3] == "Northern Europe":
				continue
			elif row[3] == "Northern America":
				continue
			elif row[3] == "South America":
				continue
			elif row[3] == "Southern America":
				continue
			elif row[3] == "North America":
				continue
			elif row[3] == "Australia & New Zealand":
				continue
			elif row[3] == "China, mainland":
				continue
			elif row[3] == "Occupied Palestinian Territory":
				continue
			elif row[3] == "China, Hong Kong SAR":
				continue
			elif row[3] == "China, Macao SAR":
				continue
			elif row[3] == "China, Taiwan Province of":
				continue
			elif row[3] == "Small Island Developing States":
				continue
			elif row[3] == "Least Developed Countries":
				continue
			elif row[3] == "Low Income Food Deficit Countries":
				continue
			elif row[3] == "Land Locked Developing Countries":
				continue
			elif row[3] == "Net Food Importing Developing Countries":
				continue


			elif row[3] == "Bolivia (Plurinational State of)":
				row[3] = "Bolivia, Plurinational State of"
			elif row[3] == "Venezuela (Bolivarian Republic of)":
				row[3] = "Venezuela, Bolivarian Republic of"
			elif row[3] == "United States of America":
				row[3] = "United States"
			elif row[3] == "Republic of Moldova":
				row[3] = "Moldova, Republic of"
			elif row[3] == "The former Yugoslav Republic of Macedonia":
				row[3] = "Macedonia, the former Yugoslav Republic of"
			elif row[3] == "Iran (Islamic Republic of)":
				row[3] = "Iran, Islamic Republic of"
			elif row[3] == "United Republic of Tanzania":
				row[3] = "Tanzania, United Republic of"
			elif row[3] == "Democratic Republic of the Congo":
				row[3] = "Congo, the Democratic Republic of the"
			elif row[3] == "Republic of Korea":
				row[3] = "Korea, Republic of"
			dataDic[row[3]] = int(row[9])

with open(jsonFileName, "w") as f:
	json.dump(dataDic, f, indent=4)



	