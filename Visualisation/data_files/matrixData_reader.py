# Makes a json file that stores the important data of a csv 
# file in a dictionnary.

import csv
import json

csvFile = 'TradeMatrCocoaExpQuan2011.csv'
jsonFileName = '_TradeMatrCocoaExpQuan2011.json'

dataDic = {}

with open(csvFile, 'rb') as csvfile:
	csvReader = csv.reader(csvfile)

	firstRow = next(csvReader)

	lastCountry = ""

	for row in csvReader:
		if row[1] == "":
			break

		# if row[5] == "European Union":
		# 	continue
		# elif row[5] == "South-Eastern Asia":
		# 	continue
		# elif row[5] == "Eastern Asia":
		# 	continue
		# elif row[5] == "Eastern Africa":
		# 	continue
		# elif row[5] == "Northern Africa":
		# 	continue
		# elif row[5] == "Western Africa":
		# 	continue
		# elif row[5] == "Eastern Africa":
		# 	continue
		# elif row[5] == "Southern Africa":
		# 	continue
		# elif row[5] == "Northern Europe":
		# 	continue
		# elif row[5] == "EU(25)ex.int":
		# 	continue
		# elif row[5] == "World":
		# 	continue
		# elif row[5] == "Asia":
		# 	continue
		# elif row[5] == "Europe":
		# 	continue
		# elif row[5] == "Africa":
		# 	continue
		# elif row[5] == "Oceania":
		# 	continue
		# elif row[5] == "Americas":
		# 	continue
		# elif row[5] == "Central Asia":
		# 	continue
		# elif row[5] == "Central America":
		# 	continue
		# elif row[5] == "Southern Asia":
		# 	continue
		# elif row[5] == "Western Asia":
		# 	continue
		# elif row[5] == "Middle Africa":
		# 	continue
		# elif row[5] == "China ex.int":
		# 	continue
		# elif row[5] == "Melanesia":
		# 	continue
		# elif row[5] == "EU(12)ex.int":
		# 	continue
		# elif row[5] == "EU(15)ex.int":
		# 	continue
		# elif row[5] == "EU(27)ex.int":
		# 	continue
		# elif row[5] == "Caribbean":
		# 	continue
		# elif row[5] == "Polynesia":
		# 	continue
		# elif row[5] == "Southern Europe":
		# 	continue
		# elif row[5] == "Eastern Europe":
		# 	continue
		# elif row[5] == "Western Europe":
		# 	continue
		# elif row[5] == "Northern Europe":
		# 	continue
		# elif row[5] == "Northern America":
		# 	continue
		# elif row[5] == "South America":
		# 	continue
		# elif row[5] == "Southern America":
		# 	continue
		# elif row[5] == "North America":
		# 	continue
		# elif row[5] == "Australia & New Zealand":
		# 	continue
		# elif row[5] == "Occupied Palestinian Territory":
		# 	continue
		# elif row[5] == "Small Island Developing States":
		# 	continue
		# elif row[5] == "Least Developed Countries":
		# 	continue
		# elif row[5] == "Low Income Food Deficit Countries":
		# 	continue
		# elif row[5] == "Land Locked Developing Countries":
		# 	continue
		# elif row[5] == "Net Food Importing Developing Countries":
		# 	continue
		if row[5] == "China, mainland":
			continue
		elif row[5] == "China, Hong Kong SAR":
			continue
		elif row[5] == "China, Macao SAR":
			continue
		elif row[5] == "China, Taiwan Province of":
			continue

		elif row[5] == "Bolivia (Plurinational State of)":
			row[5] = "Bolivia, Plurinational State of"
		elif row[5] == "Venezuela (Bolivarian Republic of)":
			row[5] = "Venezuela, Bolivarian Republic of"
		elif row[5] == "United States of America":
			row[5] = "United States"
		elif row[5] == "Republic of Moldova":
			row[5] = "Moldova, Republic of"
		elif row[5] == "The former Yugoslav Republic of Macedonia":
			row[5] = "Macedonia, the former Yugoslav Republic of"
		elif row[5] == "Iran (Islamic Republic of)":
			row[5] = "Iran, Islamic Republic of"
		elif row[5] == "United Republic of Tanzania":
			row[5] = "Tanzania, United Republic of"
		elif row[5] == "Democratic Republic of the Congo":
			row[5] = "Congo, the Democratic Republic of the"
		elif row[5] == "Republic of Korea":
			row[5] = "Korea, Republic of"

		if row[7] == "China, mainland":
			continue
		elif row[7] == "China, Hong Kong SAR":
			continue
		elif row[7] == "China, Macao SAR":
			continue
		elif row[7] == "China, Taiwan Province of":
			continue

		elif row[7] == "Bolivia (Plurinational State of)":
			row[7] = "Bolivia, Plurinational State of"
		elif row[7] == "Venezuela (Bolivarian Republic of)":
			row[7] = "Venezuela, Bolivarian Republic of"
		elif row[7] == "United States of America":
			row[7] = "United States"
		elif row[7] == "Republic of Moldova":
			row[7] = "Moldova, Republic of"
		elif row[7] == "The former Yugoslav Republic of Macedonia":
			row[7] = "Macedonia, the former Yugoslav Republic of"
		elif row[7] == "Iran (Islamic Republic of)":
			row[7] = "Iran, Islamic Republic of"
		elif row[7] == "United Republic of Tanzania":
			row[7] = "Tanzania, United Republic of"
		elif row[7] == "Democratic Republic of the Congo":
			row[7] = "Congo, the Democratic Republic of the"
		elif row[7] == "C\u00f4te d'Ivoire":
			row[7] = "Ivory Coast"
		elif row[7] == "Republic of Korea":
			row[7] = "Korea, Republic of"

		# Makes a new dicitonnary entry when a new reporter 
		# country is found.
		if row[5] != lastCountry:
			dataDic[row[5]] = {}

		lastCountry = row[5]

		dataDic[row[5]][row[7]] = int(row[15])
		# print dataDic
		print row[5],row[7]

with open(jsonFileName, "w") as f:
	json.dump(dataDic, f, indent=4)



	