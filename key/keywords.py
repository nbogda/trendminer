#this program takes 7 minutes to run please have mercy on my soul

import csv
import os
import json
import datetime
from collections import defaultdict
import code
paths = []
date_dict = {}


#parse files
for p in ["/export3/duggan/social/2015", "/export3/duggan/social/2016"]:
	for dirs, subdirs, files in os.walk(p):
		for fname in files:
			if fname.endswith(".csv"): 
				f = open(dirs + "/" + fname, "r")
				csv_f = csv.reader(f)
				next(csv_f, None) #skip header
				for row in csv_f:
					post_date = str(row[11]).partition(" ")[0]
					keyword = str(row[5])
					media = str(row[7])
					if "/" in post_date:
						if post_date not in date_dict:
							date_dict[post_date] = defaultdict(int)
						if "russia" in  keyword.lower() and "mainstream" in media.lower():
							date_dict[post_date]["russia_mainstream"] += 1
						if ("terrorism" in keyword.lower() or "isis" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["terrorism_mainstream"] += 1
						if ("climate change" in keyword.lower() or "environment" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["climate_mainstream"] += 1
						if ("jobs" in keyword.lower() or "job opportunities" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["jobs_mainstream"] += 1
						if "economy" in  keyword.lower() and "mainstream" in media.lower():
							date_dict[post_date]["economy_mainstream"] += 1
						if "globalization" in  keyword.lower() and "mainstream" in media.lower():
							date_dict[post_date]["globalization_mainstream"] += 1
						if ("immigration" in keyword.lower() or "border wall" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["immigration_mainstream"] += 1
						if ("sexism" in keyword.lower() or "women" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["sexism_mainstream"] += 1
						if "crime" in  keyword.lower() and "mainstream" in media.lower():
							date_dict[post_date]["crime_mainstream"] += 1
						if ("race relations" in keyword.lower() or "racism" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["race_mainstream"] += 1
						if ("healthcare" in keyword.lower() or "obamacare" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["healthcare_mainstream"] += 1
						if "education" in  keyword.lower() and "mainstream" in media.lower():
							date_dict[post_date]["education_mainstream"] += 1
					
						if "russia" in  keyword.lower() and "mainstream" not in media.lower():
							date_dict[post_date]["russia_social"] += 1
						if ("terrorism" in keyword.lower() or "isis" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["terrorism_social"] += 1
						if ("climate change" in keyword.lower() or "environment" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["climate_social"] += 1
						if ("jobs" in keyword.lower() or "job opportunities" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["jobs_social"] += 1
						if "economy" in  keyword.lower() and "mainstream" not in media.lower():
							date_dict[post_date]["economy_social"] += 1
						if "globalization" in  keyword.lower() and "mainstream" not in media.lower():
							date_dict[post_date]["globalization_social"] += 1
						if ("immigration" in keyword.lower() or "border wall" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["immigration_social"] += 1
						if ("sexism" in keyword.lower() or "women" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["sexism_social"] += 1
						if "crime" in  keyword.lower() and "mainstream" not in media.lower():
							date_dict[post_date]["crime_social"] += 1
						if ("race relations" in keyword.lower() or "racism" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["race_social"] += 1
						if ("healthcare" in keyword.lower() or "obamacare" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["healthcare_social"] += 1
						if "education" in  keyword.lower() and "mainstream" not in media.lower():
							date_dict[post_date]["education_social"] += 1

				f.close()

#put in JSON
fp = open("keywords.json", "w") 
json_string = json.dumps([{"post_date" : key, "keyword" : keyword, "posts" : n_posts} for key, value in date_dict.iteritems() for keyword, n_posts in value.iteritems()])
fp.write(json_string)
fp.close()




