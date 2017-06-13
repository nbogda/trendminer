#for mainstream media only

import csv
import os
import json
import datetime
from collections import defaultdict
from textblob import TextBlob
import code


paths = []
date_dict = {}
counter_dict = {}

#parse files
for w in ["/export3/duggan/social/2015", "/export3/duggan/social/2016"]:
	for dirs, subdirs, files in os.walk(w):
		for fname in files:
			if fname.endswith(".csv"): 
				f = open(dirs + "/" + fname, "r")
				csv_f = csv.reader(f)
				next(csv_f, None) #skip header
				for row in csv_f:
					post_date = str((row[11]).partition(" ")[0])
					if post_date not in date_dict and "/" in post_date and post_date:				
						date_dict[post_date] = {}
						date_dict[post_date]["clinton_mainstream"] = 0.0
						date_dict[post_date]["trump_mainstream"] = 0.0
						date_dict[post_date]["clinton_social"] = 0.0
						date_dict[post_date]["trump_social"] = 0.0
						counter_dict[post_date] = {}
						counter_dict[post_date]["clinton_mainstream"] = 0
						counter_dict[post_date]["trump_mainstream"] = 0
						counter_dict[post_date]["clinton_social"] = 0
						counter_dict[post_date]["trump_social"] = 0
					keyword = str(row[5])
					keyword = unicode(keyword, errors = "ignore")
					analysis = TextBlob(keyword)
					sentiment = analysis.sentiment.polarity
					media = str(row[7])
					try:
						if ("clinton" in keyword.lower() or "hillary" in keyword.lower()) and "mainstream" in media.lower():
							date_dict.get(post_date)["clinton_mainstream"] += sentiment
							counter_dict.get(post_date)["clinton_mainstream"] += 1
						if ("donald" in keyword.lower() or "trump" in keyword.lower()) and "mainstream" in media.lower():
							date_dict.get(post_date)["trump_mainstream"] += sentiment
							counter_dict.get(post_date)["trump_mainstream"] += 1	
						if ("clinton" in keyword.lower() or "hillary" in keyword.lower()) and "mainstream" not in media.lower():
							date_dict.get(post_date)["clinton_social"] += sentiment
							counter_dict.get(post_date)["clinton_social"] += 1
						if ("trump" in keyword.lower() or "donald" in keyword.lower()) and "mainstream" not in media.lower():
							date_dict.get(post_date)["trump_social"] += sentiment
							counter_dict.get(post_date)["trump_social"] += 1
					except:
						print ("Keyerror")

				f.close()

for p in date_dict.keys():
	date_dict[p]["clinton_mainstream"] /= counter_dict[p]["clinton_mainstream"]
	date_dict[p]["trump_mainstream"] /= counter_dict[p]["trump_mainstream"]
	date_dict[p]["clinton_social"] /= counter_dict[p]["clinton_social"]
	date_dict[p]["trump_social"] /= counter_dict[p]["trump_social"]		


#put in JSON
fp = open("can_MSM_sentiment.json", "w") 
json_string = json.dumps([{"post_date" : key, "candidate" : keyword, "sentiment" : sentiment, "posts" : counter_dict[key]["trump_" + keyword.split("_")[1]] + counter_dict[key]["clinton_" + keyword.split("_")[1]] } for key, value in date_dict.iteritems() for keyword, sentiment in value.iteritems()])
fp.write(json_string)
fp.close()





