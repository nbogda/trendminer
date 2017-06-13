#if youre reading this turn back now 

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

						date_dict[post_date]["russia"] = {}
						date_dict[post_date]["russia"]["clinton_mainstream"] = 1
						date_dict[post_date]["russia"]["trump_mainstream"] = 1
						date_dict[post_date]["russia"]["clinton_social"] = 1
						date_dict[post_date]["russia"]["trump_social"] = 1

						date_dict[post_date]["terrorism"] = {}
						date_dict[post_date]["terrorism"]["clinton_mainstream"] = 1
						date_dict[post_date]["terrorism"]["trump_mainstream"] = 1
						date_dict[post_date]["terrorism"]["clinton_social"] = 1
						date_dict[post_date]["terrorism"]["trump_social"] = 1


						date_dict[post_date]["climate"] = {}
						date_dict[post_date]["climate"]["clinton_mainstream"] = 1
						date_dict[post_date]["climate"]["trump_mainstream"] = 1
						date_dict[post_date]["climate"]["clinton_social"] = 1
						date_dict[post_date]["climate"]["trump_social"] = 1

		
						date_dict[post_date]["jobs"] = {}
						date_dict[post_date]["jobs"]["clinton_mainstream"] = 1
						date_dict[post_date]["jobs"]["trump_mainstream"] = 1
						date_dict[post_date]["jobs"]["clinton_social"] = 1
						date_dict[post_date]["jobs"]["trump_social"] = 1


						date_dict[post_date]["economy"] = {}
						date_dict[post_date]["economy"]["clinton_mainstream"] = 1
						date_dict[post_date]["economy"]["trump_mainstream"] = 1
						date_dict[post_date]["economy"]["clinton_social"] = 1
						date_dict[post_date]["economy"]["trump_social"] = 1
						
						
						date_dict[post_date]["globalization"] = {}
						date_dict[post_date]["globalization"]["clinton_mainstream"] = 1
						date_dict[post_date]["globalization"]["trump_mainstream"] = 1
						date_dict[post_date]["globalization"]["clinton_social"] = 1
						date_dict[post_date]["globalization"]["trump_social"] = 1


						date_dict[post_date]["immigration"] = {}
						date_dict[post_date]["immigration"]["clinton_mainstream"] = 1
						date_dict[post_date]["immigration"]["trump_mainstream"] = 1
						date_dict[post_date]["immigration"]["clinton_social"] = 1
						date_dict[post_date]["immigration"]["trump_social"] = 1


						date_dict[post_date]["sexism"] = {}
						date_dict[post_date]["sexism"]["clinton_mainstream"] = 1
						date_dict[post_date]["sexism"]["trump_mainstream"] = 1
						date_dict[post_date]["sexism"]["clinton_social"] = 1
						date_dict[post_date]["sexism"]["trump_social"] = 1

						date_dict[post_date]["crime"] = {}
						date_dict[post_date]["crime"]["clinton_mainstream"] = 1
						date_dict[post_date]["crime"]["trump_mainstream"] = 1
						date_dict[post_date]["crime"]["clinton_social"] = 1
						date_dict[post_date]["crime"]["trump_social"] = 1

						date_dict[post_date]["racism"] = {}
						date_dict[post_date]["racism"]["clinton_mainstream"] = 1
						date_dict[post_date]["racism"]["trump_mainstream"] = 1
						date_dict[post_date]["racism"]["clinton_social"] = 1
						date_dict[post_date]["racism"]["trump_social"] = 1

					
						date_dict[post_date]["health"] = {}
						date_dict[post_date]["health"]["clinton_mainstream"] = 1
						date_dict[post_date]["health"]["trump_mainstream"] = 1
						date_dict[post_date]["health"]["clinton_social"] = 1
						date_dict[post_date]["health"]["trump_social"] = 1

						date_dict[post_date]["education"] = {}
						date_dict[post_date]["education"]["clinton_mainstream"] = 1
						date_dict[post_date]["education"]["trump_mainstream"] = 1
						date_dict[post_date]["education"]["clinton_social"] = 1
						date_dict[post_date]["education"]["trump_social"] = 1

					keyword = str(row[5])
					keyword = unicode(keyword, errors = "ignore")
					analysis = TextBlob(keyword)
					sentiment = analysis.sentiment.polarity
					media = str(row[7])

					try:
					
						if "mainstream" in media.lower() and "russia" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["russia"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and "russia" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["russia"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and "russia" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["russia"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and "russia" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["russia"]["trump_social"] += 1
							
						if "mainstream" in media.lower() and ("terrorismism" in keyword.lower() or "isis" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["terrorism"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and ("terrorismism" in keyword.lower() or "isis" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["terrorism"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and ("terrorismism" in keyword.lower() or "isis" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["terrorism"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and ("terrorismism" in keyword.lower() or "isis" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["terrorism"]["trump_social"] += 1


						if "mainstream" in media.lower() and  ("climate change" in keyword.lower() or "environment" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["climate"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and  ("climate change" in keyword.lower() or "environment" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["climate"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and  ("climate change" in keyword.lower() or "environment" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["climate"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and  ("climate change" in keyword.lower() or "environment" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["climate"]["trump_social"] += 1



						if "mainstream" in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["jobs"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["jobs"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower())  and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["jobs"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["jobs"]["trump_social"] += 1



						if "mainstream" in media.lower() and "economy" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["economy"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and "economy" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["economy"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and "economy" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["economy"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and "economy" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["economy"]["trump_social"] += 1


						if "mainstream" in media.lower() and "globalization" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["globalization"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and "globalization" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["globalization"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and "globalization" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["globalization"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and "globalization" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["globalization"]["trump_social"] += 1


						if "mainstream" in media.lower() and ("immigration" in keyword.lower() or "border wall" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["immigration"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and ("immigration" in keyword.lower() or "border wall" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["immigration"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and ("immigration" in keyword.lower() or "border wall" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["immigration"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and ("immigration" in keyword.lower() or "border wall" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["immigration"]["trump_social"] += 1

						if "mainstream" in media.lower() and ("sexism" in keyword.lower()  or "women" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["sexism"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and ("sexism" in keyword.lower()  or "women" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["sexism"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and ("sexism" in keyword.lower()  or "women" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["sexism"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and ("sexism" in keyword.lower()  or "women" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["sexism"]["trump_social"] += 1

						if "mainstream" in media.lower() and "crime" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["crime"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and "crime" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["crime"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and "crime" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["crime"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and "crime" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["crime"]["trump_social"] += 1

					
						if "mainstream" in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower())  and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["racism"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["racism"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["racism"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["racism"]["trump_social"] += 1

					
					
					
						if "mainstream" in media.lower() and  ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["health"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and  ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["health"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and  ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()) and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["health"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and  ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()) and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["health"]["trump_social"] += 1

					
						if "mainstream" in media.lower() and "education" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["education"]["clinton_mainstream"] += 1
						if "mainstream" in media.lower() and "education" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["education"]["trump_mainstream"] += 1
						if "mainstream" not in media.lower() and "education" in keyword.lower() and ("hillary" in keyword.lower() or "clinton" in keyword.lower()):
							date_dict[post_date]["education"]["clinton_social"] += 1
						if "mainstream" not in media.lower() and "education" in keyword.lower() and ("donald" in keyword.lower() or "trump" in keyword.lower()):
							date_dict[post_date]["education"]["trump_social"] += 1
					
					except:
						print("Keyerror")
				
				
				f.close()

fp = open("talk.json", "w")
json_string = json.dumps([{"post_date": key, "topic": keyword, "candidate": can, "posts" : n_posts} for key, value in date_dict.iteritems() for keyword, val in value.iteritems() for can, n_posts in val.iteritems()])
fp.write(json_string)
fp.close()
