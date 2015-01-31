#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Makes a json file that stores the needed data of a csv 
# file in a dictionnary.

import csv
import json

csvFile = 'TradeMatrCocoaExpVal2011.csv'
jsonFileName = '_TradeMatrCocoaExpVal2011.json'

dataDic = {}

with open(csvFile, 'rb') as csvfile:
	csvReader = csv.reader(csvfile)

	firstRow = next(csvReader)

	lastCountry = ""

	for row in csvReader:
		if row[1] == "":
			break

		if row[5] == "China, mainland":
			continue
		elif row[5] == "China, Hong Kong SAR":
			continue
		elif row[5] == "China, Macao SAR":
			continue
		elif row[5] == "China, Taiwan Province of":
			continue
		elif row[5] == "Micronesia (Federated States of)":
			continue
		elif row[5] == "Tuvalu":
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
		elif row[5] == "Republic of Korea":
			row[5] = "Korea, Republic of"
		elif row[5] == "United Republic of Tanzania":
			row[5] = "Tanzania, United Republic of"
		elif row[5] == "Democratic Republic of the Congo":
			row[5] = "Congo, the Democratic Republic of the"
		elif row[5] == "Republic of Korea":
			row[5] = "Korea, Republic of"
		elif row[5] == "Côte d'Ivoire":
			row[5] = "Ivory Coast"
		elif row[5] == "Sudan (former)":
			row[5] = "Sudan"
		elif row[5] == "Cabo Verde":
			row[5] = "Cape Verde"


		if row[7] == "Unspecified":
			continue
		elif row[7] == "China, mainland":
			continue
		elif row[7] == "China, Hong Kong SAR":
			continue
		elif row[7] == "China, Macao SAR":
			continue
		elif row[7] == "China, Taiwan Province of":
			continue
		elif row[7] == "Micronesia (Federated States of)":
			continue
		elif row[7] == "Tuvalu":
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
		elif row[7] == "Republic of Korea":
			row[7] = "Korea, Republic of"
		elif row[7] == "United Republic of Tanzania":
			row[7] = "Tanzania, United Republic of"
		elif row[7] == "Democratic Republic of the Congo":
			row[7] = "Congo, the Democratic Republic of the"
		elif row[7] == "Côte d'Ivoire":
			row[7] = "Ivory Coast"
		elif row[7] == "Sudan (former)":
			row[7] = "Sudan"
		elif row[7] == "Cabo Verde":
			row[7] = "Cape Verde"

		# Makes a new dicitonnary entry when a new reporter 
		# country is found.
		if row[5] != lastCountry:
			dataDic[row[5]] = {}

		lastCountry = row[5]

		dataDic[row[5]][row[7]] = int(row[15])

with open(jsonFileName, "w") as f:
	json.dump(dataDic, f, indent=4)



	