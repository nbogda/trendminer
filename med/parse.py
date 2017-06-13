import json
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


with open("can_MSM_sentiment.json") as json_data:
	d = json.load(json_data)
#	print d

#make 4 lists, one for each category

clinton_MS = []
clinton_SM = []
trump_MS = []
trump_SM = []

for k, v in enumerate(d):
	if v["candidate"] == "clinton_mainstream":
		clinton_MS.append(v["sentiment"])
	if v["candidate"] == "trump_mainstream":
		clinton_SM.append(v["sentiment"])
	if v["candidate"] == "clinton_social":
		trump_MS.append(v["sentiment"])
	if v["candidate"] == "trump_social":
		trump_SM.append(v["sentiment"])

plt.figure()
plt.hist([clinton_MS, trump_MS], 200, range=(-1, 1), color=["blue", "red"], alpha = 0.75, label=["Clinton", "Trump"])
plt.legend(bbox_to_anchor=(0.02, 1), loc=2, borderaxespad=0)
plt.xlabel("Sentiment")
plt.ylabel("Distribution")
plt.title("Mainstream Media Sentiment")
plt.grid(True)
#plt.savefig("clintonMS.png", bbox_inches="tight")


#plt.figure()
#plt.hist(trump_MS, 200, range=(-1, 1), facecolor = 'red', alpha = 0.75, label="Trump")
#plt.xlabel("Sentiment")
#plt.ylabel("Distribution")
#plt.title("Trump Mainstream Media Sentiment")
#plt.grid(True)
axis=plt.gca()
axis.set_axisbelow(True)
fig=plt.gcf()
fig.set_size_inches(20, 5)
fig.savefig("MS.png", bbox_inches="tight", dpi=100)


plt.figure()
plt.hist([clinton_SM, trump_SM], 200, range=(-1, 1), color=["blue", "red"], alpha = 0.75, label=["Clinton", "Trump"])
plt.legend(bbox_to_anchor=(0.02, 1), loc=2, borderaxespad=0)
plt.xlabel("Sentiment")
plt.ylabel("Distribution")
plt.title("Social Media Sentiment")
plt.grid(True)
#plt.savefig("clintonSM.png", bbox_inches="tight")

#plt.figure()
#plt.hist(trump_SM, 200, range=(-1, 1), facecolor = 'red', alpha = 0.75)
#plt.xlabel("Sentiment")
#plt.ylabel("Distribution")
#plt.title("Trump Social Media Sentiment")
#plt.grid(True)
axis=plt.gca()
axis.set_axisbelow(True)
fig=plt.gcf()
fig.set_size_inches(20, 5)
fig.savefig("SM.png", bbox_inches="tight", dpi=100)


