

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
#russia					
						
						date_dict[post_date] = {}
						date_dict[post_date]["mainstream_russia"] = 0.0
						date_dict[post_date]["social_russia"] = 0.0

						counter_dict[post_date] = {}
						counter_dict[post_date]["mainstream_russia"] = 1
						counter_dict[post_date]["social_russia"] = 1


#terror

						date_dict[post_date]["mainstream_terror"] = 0.0
						date_dict[post_date]["social_terror"] = 0.0

						counter_dict[post_date]["mainstream_terror"] = 1
						counter_dict[post_date]["social_terror"] = 1


#climate

#						date_dict[post_date]["mainstream_climate"] = 0.0
#						date_dict[post_date]["social_climate"] = 0.0
#
#						counter_dict[post_date]["mainstream_climate"] = 1
#						counter_dict[post_date]["social_climate"] = 1



#jobs

						date_dict[post_date]["mainstream_jobs"] = 0.0
						date_dict[post_date]["social_jobs"] = 0.0

						counter_dict[post_date]["mainstream_jobs"] = 1
						counter_dict[post_date]["social_jobs"] = 1


#economy

						date_dict[post_date]["mainstream_economy"] = 0.0
						date_dict[post_date]["social_economy"] = 0.0

						counter_dict[post_date]["mainstream_economy"] = 1
						counter_dict[post_date]["social_economy"] = 1



#globalization

#						date_dict[post_date]["mainstream_globalization"] = 0.0
#						date_dict[post_date]["social_globalization"] = 0.0
#
#						counter_dict[post_date]["mainstream_globalization"] = 1
#						counter_dict[post_date]["social_globalization"] = 1'''



#immigration

						date_dict[post_date]["mainstream_immigration"] = 0.0
						date_dict[post_date]["social_immigration"] = 0.0

						counter_dict[post_date]["mainstream_immigration"] = 1
						counter_dict[post_date]["social_immigration"] = 1



#sexism

						date_dict[post_date]["mainstream_sexism"] = 0.0
						date_dict[post_date]["social_sexism"] = 0.0

						counter_dict[post_date]["mainstream_sexism"] = 1
						counter_dict[post_date]["social_sexism"] = 1



#crime

#						date_dict[post_date]["mainstream_crime"] = 0.0
#						date_dict[post_date]["social_crime"] = 0.0
#
#						counter_dict[post_date]["mainstream_crime"] = 1
#						counter_dict[post_date]["social_crime"] = 1



#race
#						date_dict[post_date]["mainstream_race"] = 0.0
#						date_dict[post_date]["social_race"] = 0.0
#
#						counter_dict[post_date]["mainstream_race"] = 1
#						counter_dict[post_date]["social_race"] = 1



#health

#						date_dict[post_date]["mainstream_health"] = 0.0
#						date_dict[post_date]["social_health"] = 0.0
#
#						counter_dict[post_date]["mainstream_health"] = 1
#						counter_dict[post_date]["social_health"] = 1


#education
#						date_dict[post_date]["mainstream_education"] = 0.0
#						date_dict[post_date]["social_education"] = 0.0
#
#						counter_dict[post_date]["mainstream_education"] = 1
#						counter_dict[post_date]["social_education"] = 1'''


					keyword = str(row[5])
					keyword = unicode(keyword, errors = "ignore")
					analysis = TextBlob(keyword)
					sentiment = analysis.sentiment.polarity
					media = str(row[7])


					

#russia
					try:
						if "mainstream" in media.lower() and "russia" in keyword.lower():
							date_dict.get(post_date)["mainstream_russia"] += sentiment
							counter_dict.get(post_date)["mainstream_russia"] += 1
						if "mainstream" not in media.lower() and "russia" in keyword.lower():
							date_dict.get(post_date)["social_russia"] += sentiment
							counter_dict.get(post_date)["social_russia"] += 1


#terror


						if "mainstream" in media.lower() and ("terrorism" in keyword.lower() or "isis" in keyword.lower()):
							date_dict.get(post_date)["mainstream_terror"] += sentiment
							counter_dict.get(post_date)["mainstream_terror"] += 1
						if "mainstream" not in media.lower() and ("terrorism" in keyword.lower() or "isis" in keyword.lower()):
							date_dict.get(post_date)["social_terror"] += sentiment
							counter_dict.get(post_date)["social_terror"] += 1

#climate


#						if "mainstream" in media.lower() and ("climate change" in keyword.lower() or "environment" in keyword.lower()):
#							date_dict.get(post_date)["mainstream_climate"] += sentiment
#							counter_dict.get(post_date)["mainstream_climate"] += 1
#						if "mainstream" not in media.lower() and ("climate change" in keyword.lower() or "environment" in keyword.lower()):
#							date_dict.get(post_date)["social_climate"] += sentiment
#							counter_dict.get(post_date)["social_climate"] += 1'''

#jobs


						if "mainstream" in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower()):
							date_dict.get(post_date)["mainstream_jobs"] += sentiment
							counter_dict.get(post_date)["mainstream_jobs"] += 1
						if "mainstream" not in media.lower() and ("jobs" in keyword.lower() or "job opportunities" in keyword.lower()):
							date_dict.get(post_date)["social_jobs"] += sentiment
							counter_dict.get(post_date)["social_jobs"] += 1

#economy


						if "mainstream" in media.lower() and "economy" in keyword.lower():
							date_dict.get(post_date)["mainstream_economy"] += sentiment
							counter_dict.get(post_date)["mainstream_economy"] += 1
						if "mainstream" not in media.lower() and "economy" in keyword.lower():
							date_dict.get(post_date)["social_economy"] += sentiment
							counter_dict.get(post_date)["social_economy"] += 1

#globalization

#
#						if "mainstream" in media.lower() and "globalization" in keyword.lower():
#							date_dict.get(post_date)["mainstream_globalization"] += sentiment
#							counter_dict.get(post_date)["mainstream_globalization"] += 1
#						if "mainstream" not in media.lower() and "globalization" in keyword.lower():
#							date_dict.get(post_date)["social_globalization"] += sentiment
#							counter_dict.get(post_date)["social_globalization"] += 1'''

#immigration


						if "mainstream" in media.lower() and ("immigration" in keyword.lower() or "border wall" in keyword.lower()):
							date_dict.get(post_date)["mainstream_immigration"] += sentiment
							counter_dict.get(post_date)["mainstream_immigration"] += 1
						if "mainstream" not in media.lower() and  ("immigration" in keyword.lower() or "border wall" in keyword.lower()):
							date_dict.get(post_date)["social_immigration"] += sentiment
							counter_dict.get(post_date)["social_immigration"] += 1

#sexism


						if "mainstream" in media.lower() and ("sexism" in keyword.lower() or "women" in keyword.lower()):
							date_dict.get(post_date)["mainstream_sexism"] += sentiment
							counter_dict.get(post_date)["mainstream_sexism"] += 1
						if "mainstream" not in media.lower() and ("sexism" in keyword.lower() or "women" in keyword.lower()):
							date_dict.get(post_date)["social_sexism"] += sentiment
							counter_dict.get(post_date)["social_sexism"] += 1

#crime


#						if "mainstream" in media.lower() and "crime" in keyword.lower():
#							date_dict.get(post_date)["mainstream_crime"] += sentiment
#							counter_dict.get(post_date)["mainstream_crime"] += 1
#						if "mainstream" not in media.lower() and "crime" in keyword.lower():
#							date_dict.get(post_date)["social_crime"] += sentiment
#							counter_dict.get(post_date)["social_crime"] += 1

#race


#						if "mainstream" in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower()):
#							date_dict.get(post_date)["mainstream_race"] += sentiment
#							counter_dict.get(post_date)["mainstream_race"] += 1
#						if "mainstream" not in media.lower() and ("racism" in keyword.lower() or "race relations" in keyword.lower()):
#							date_dict.get(post_date)["social_race"] += sentiment
#							counter_dict.get(post_date)["social_race"] += 1

#health


#						if "mainstream" in media.lower() and ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()):
#							date_dict.get(post_date)["mainstream_health"] += sentiment
#							counter_dict.get(post_date)["mainstream_health"] += 1
#						if "mainstream" not in media.lower() and ("healthcare" in keyword.lower() or "obamacare" in keyword.lower()):
#							date_dict.get(post_date)["social_health"] += sentiment
#							counter_dict.get(post_date)["social_health"] += 1

#education


#						if "mainstream" in media.lower() and "education" in keyword.lower():
#							date_dict.get(post_date)["mainstream_education"] += sentiment
#							counter_dict.get(post_date)["mainstream_education"] += 1
#						if "mainstream" not in media.lower() and "education" in keyword.lower():
#							date_dict.get(post_date)["social_education"] += sentiment
#							counter_dict.get(post_date)["social_education"] += 1'''
					
					except:
						print ("Keyerror")
				
			f.close()

for p in date_dict.keys():

#russia

	date_dict[p]["mainstream_russia"] /= counter_dict[p]["mainstream_russia"]
	date_dict[p]["social_russia"] /= counter_dict[p]["social_russia"]

#terror

	date_dict[p]["mainstream_terror"] /= counter_dict[p]["mainstream_terror"]
	date_dict[p]["social_terror"] /= counter_dict[p]["social_terror"]

#climate

#	date_dict[p]["mainstream_climate"] /= counter_dict[p]["mainstream_climate"]
#	date_dict[p]["social_climate"] /= counter_dict[p]["social_climate"]

#jobs

	date_dict[p]["mainstream_jobs"] /= counter_dict[p]["mainstream_jobs"]
	date_dict[p]["social_jobs"] /= counter_dict[p]["social_jobs"]

#economy

	date_dict[p]["mainstream_economy"] /= counter_dict[p]["mainstream_economy"]
	date_dict[p]["social_economy"] /= counter_dict[p]["social_economy"]

#globalization

#	date_dict[p]["mainstream_globalization"] /= counter_dict[p]["mainstream_globalization"]
#	date_dict[p]["social_globalization"] /= counter_dict[p]["social_globalization"]	

#immigration

	date_dict[p]["mainstream_immigration"] /= counter_dict[p]["mainstream_immigration"]
	date_dict[p]["social_immigration"] /= counter_dict[p]["social_immigration"]

#sexism

	date_dict[p]["mainstream_sexism"] /= counter_dict[p]["mainstream_sexism"]
	date_dict[p]["social_sexism"] /= counter_dict[p]["social_sexism"]

#crime

#	date_dict[p]["mainstream_crime"] /= counter_dict[p]["mainstream_crime"]
#	date_dict[p]["social_crime"] /= counter_dict[p]["social_crime"]

#race

#	date_dict[p]["mainstream_race"] /= counter_dict[p]["mainstream_race"]
#	date_dict[p]["social_race"] /= counter_dict[p]["social_race"]

#health

#	date_dict[p]["mainstream_health"] /= counter_dict[p]["mainstream_health"]
#	date_dict[p]["social_health"] /= counter_dict[p]["social_health"]	

#education

#	date_dict[p]["mainstream_education"] /= counter_dict[p]["mainstream_education"]
#	date_dict[p]["social_education"] /= counter_dict[p]["social_education"]	


#print date_dict
#print counter_dict


#put in JSON

a = ([{"post_date" : key, "topic" : keyword.rsplit("_", 1)[-1], "sentiment" : sentiment, "posts" : counter_dict[key][keyword], "media": keyword.rsplit("_", 1)[0]} for key, value in date_dict.iteritems() for keyword, sentiment in value.iteritems()])


fp = open("split_topics.json", "w")
f = json.dumps(a)
fp.write(f)
fp.close()

