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
						if ("hillary" in keyword.lower() or "clinton" in keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["clinton_mainstream"] += 1
						if ("hillary" in keyword.lower() or "clinton" in keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["clinton_social"] += 1
						if ("donald" in keyword.lower() or "trump" in  keyword.lower()) and "mainstream" in media.lower():
							date_dict[post_date]["trump_mainstream"] += 1
						if ("donald" in keyword.lower() or "trump" in  keyword.lower()) and "mainstream" not in media.lower():
							date_dict[post_date]["trump_social"] += 1
			
				f.close()

#put in JSON
fp = open("candidate_mentions.json", "w") 
json_string = json.dumps([{"post_date" : key, "candidate" : keyword, "posts" : n_posts} for key, value in date_dict.iteritems() for keyword, n_posts in value.iteritems()])
fp.write(json_string)
fp.close()




