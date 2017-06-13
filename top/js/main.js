$(document).ready(function(){
    
	data = [];


		$.getJSON("split_topics.json", function(results) {
			data = results;
			process_data();
		});
			

		
	function process_data()
{	
	var ndx = crossfilter(data);
	var parseDate = d3.time.format("%m/%d/%Y").parse;
	data.forEach(function(d) {
	  d.post_date = parseDate(d.post_date);
	  d.Year = d.post_date.getFullYear();
	  d.Month = d.post_date.getMonth() + 1;
	});
	/************
	Year Ring
	*************/
	var yearRingChart = dc.pieChart("#chart-ring-year");
	var yearDim = ndx.dimension(function(d) {
	  return +d.Year;
	});
	var year_total = yearDim.group().reduceSum(function(d) {
	  return d.posts;
	});
	yearRingChart
	  .width(150).height(150)
	  .dimension(yearDim)
	  .group(year_total)
	  .innerRadius(30);
	  

	/**************
	Month Ring
	**************/
	var monthRingChart = dc.pieChart("#chart-ring-month");
	var monthDim = ndx.dimension(function(d) {
		return +d.Month;
	});
	var month_total = monthDim.group().reduceSum(function(d) {
		return d.posts;
	});
	monthRingChart
		.width(150).height(150)
		.dimension(monthDim)
		.group(month_total)
		.innerRadius(30);


	statusRingChart = dc.pieChart("#chart-ring-topic");
    var statusDim = ndx.dimension(function(d) {
      return d.topic;
    });
    var hit_status = statusDim.group().reduceSum(function(d) {
      return d.posts;
    });

    statusRingChart
      .width(150).height(150)
      .dimension(statusDim)
      .group(hit_status)
      .innerRadius(30);

	var hitslineChart = dc.compositeChart("#chart-line-postsperday");
	var dateDim = ndx.dimension(function(d) {
	  return d.post_date;
	});

	var minDate = dateDim.bottom(1)[0].post_date;
	var maxDate = dateDim.top(1)[0].post_date;

	var russia_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'russia' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var terror_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'terror' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var climate_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_climate') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	var jobs_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'jobs' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var economy_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'economy' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var globalization_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_globalization') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	var immigration_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'immigration' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var sexism_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'sexism' && d.media == 'mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var crime_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_crime') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
		
	var race_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_race') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var health_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_health') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var education_ = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'mainstream_education') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	
	var h1 = true

	hitslineChart
	  .width(1000).height(400)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
	  .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
	  .title(function(d) {
		return getvalues(d, h1);
	  })
	  .margins({
		top: 10,
		left: 30,
		right: 60,
		bottom: 50
	  })
	  .renderlet(function(chart) {
		chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");
	  })	
	  .yAxisLabel("Sentiment")
	  .compose([
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(russia_, "Russia")
		.colors("#f50b0b")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(terror_, "Terrorism")
		.colors("#ee7849")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(climate_, "Climate Change/Enviroment")
		.colors("#e7d338")
		.elasticX(true)
		.elasticY(true),*/
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(jobs_, "Jobs")
		.colors("#38e784")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(economy_, "Economy")
		.colors("#2abb10")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(globalization_, "Globalization")
		.colors("#12d1d1")
		.elasticX(true)
		.elasticY(true),*/
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(immigration_, "Immigration")
		.colors("#123fd1")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(sexism_, "Women")
		.colors("#7d50e6")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(crime_, "Crime")
		.colors("#4415b0")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(race_, "Racism/Race Relations")
		.colors("#d51fd5")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(health_, "Healthcare/Obamacare")
		.colors("#2b85e6")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(education_, "Education")
		.colors("d77936")
		.elasticX(true)
		.elasticY(true),*/
		]);

/******************************************************************************/

	var hitslineChart2 = dc.compositeChart("#chart-line-socialmedia");

	
	var dateDim = ndx.dimension(function(d) {
	  return d.post_date;
	});

	var minDate = dateDim.bottom(1)[0].post_date;
	var maxDate = dateDim.top(1)[0].post_date;

	var russia_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'russia' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var terror_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'terror' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var climate_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_climate') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	var jobs_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'jobs' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var economy_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'economy' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var globalization_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_globalization') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	var immigration_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'immigration' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var sexism_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'sexism' && d.media == 'social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
/*	var crime_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_crime') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
		
	var race_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_race') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var health_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_health') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var education_s = dateDim.group().reduceSum(function(d) {
	  if (d.topic == 'social_education') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});*/
	
	
	var h1 = true

	hitslineChart2
	  .width(1000).height(400)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
	  .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
	  .title(function(d) {
		return getvalues(d, h1);
	  })
	  .margins({
		top: 10,
		left: 30,
		right: 60,
		bottom: 50
	  })
	  .renderlet(function(chart) {
		chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");
	  })	
	  .yAxisLabel("Sentiment")
	  .compose([
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(russia_s, "Russia")
		.colors("#f50b0b")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(terror_s, "Terrorism")
		.colors("#ee7849")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(climate_s, "Climate Change/Enviroment")
		.colors("#e7d338")
		.elasticX(true)
		.elasticY(true),*/
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(jobs_s, "Jobs")
		.colors("#38e784")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(economy_s, "Economy")
		.colors("#2abb10")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(globalization_s, "Globalization")
		.colors("#12d1d1")
		.elasticX(true)
		.elasticY(true),*/
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(immigration_s, "Immigration")
		.colors("#123fd1")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(sexism_s, "Women")
		.colors("#7d50e6")
		.elasticX(true)
		.elasticY(true),
/*	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(crime_s, "Crime")
		.colors("#4415b0")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(race_s, "Racism/Race Relations")
		.colors("#d51fd5")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(health_s, "Healthcare/Obamacare")
		.colors("#2b85e6")
		.elasticX(true)
		.elasticY(true),
	dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(education_s, "Education")
		.colors("d77936")
		.elasticX(true)
		.elasticY(true),*/
		]);

	

	function getvalues(d, h1) {
	  var str = (d.key.getMonth() + 1) + "/" + d.key.getDate() + "/" + d.key.getFullYear() + "\n";
	  //filter needs to be applied to new crossfilter so it doesn't effect current data
	  //however, if chart gets filtered by status, we need to update title
	  var key_filter = dateDim.filter(d.key).top(Infinity);
	  var total = 0
	 /* if (h1)
	  {
		  key_filter.forEach(function(a) 
		  {
			if (a.topic == "russia_mainstream") 
			{
			str += a.sentiment + " russia MSM sentiment\n";
			}
		    if (a.topic == "terror_mainstream") 
			{
			str += a.sentiment + " terror MSM sentiment\n";
			}
	/*		if (a.topic == "climate_mainstream") 
			{
			str += a.sentiment + " climate MSM sentiment\n";
			}*/
	/*		 if (a.topic == "jobs_mainstream") 
			{
			str += a.sentiment + " jobs MSM sentiment\n";
			}
			 if (a.topic == "economy_mainstream") 
			{
			str += a.sentiment + " economy MSM sentiment\n";
			}
		/*	 if (a.topic == "globalization_mainstream") 
			{
			str += a.sentiment + " globalization MSM sentiment\n";
			}*/
	/*		 if (a.topic == "immigration_mainstream") 
			{
			str += a.sentiment + " immigration MSM sentiment\n";
			}
			 if (a.topic == "sexism_mainstream") 
			{
			str += a.sentiment + " sexism MSM sentiment\n";
			}
		/*	 if (a.topic == "race_mainstream") 
			{
			str += a.sentiment + " race MSM sentiment\n";
			}
			 if (a.topic == "healthcare_mainstream") 
			{
			str += a.sentiment + " healthcare MSM sentiment\n";
			}
			 if (a.topic == "education_mainstream") 
			{
			str += a.sentiment + " education MSM sentiment\n";
			}*/

	/*	   });
	  }

	 else
		 {
		 key_filter.forEach(function(a) 
		 {
		
			if (a.topic == "russia_social") 
			{
			str += a.sentiment + " russia SM sentiment\n";
			}
		    if (a.topic == "terror_social") 
			{
			str += a.sentiment + " terror SM sentiment\n";
			}
	/*		if (a.topic == "climate_social") 
			{
			str += a.sentiment + " climate SM sentiment\n";
			}*/
	/*		 if (a.topic == "jobs_social") 
			{
			str += a.sentiment + " jobs SM sentiment\n";
			}
			 if (a.topic == "economy_social") 
			{
			str += a.sentiment + " economy SM sentiment\n";
			}
		/*	 if (a.topic == "crime_social") 
			{
			str += a.sentiment + " crime SM sentiment\n";
			}
			 if (a.topic == "globalization_social") 
			{
			str += a.sentiment + " globalization SM sentiment\n";
			}*/
	/*		 if (a.topic == "immigration_social") 
			{
			str += a.sentiment + " immigration SM sentiment\n";
			}
			 if (a.topic == "sexism_social") 
			{
			str += a.sentiment + " sexism SM sentiment\n";
			}
		/*	 if (a.topic == "race_social") 
			{
			str += a.sentiment + " race SM sentiment\n";
			}
			 if (a.topic == "healthcare_social") 
			{
			str += a.sentiment + " healthcare SM sentiment\n";
			}
			 if (a.topic == "education_social") 
			{
			str += a.sentiment + " education SM sentiment\n";
			}*/

		
		 /* });
 
		 }*/
		
	  

	  //str += "Total:" + total;
	  dateDim.filterAll(); //remove filter so it doesn't effect the graphs, this is the only filter so we can do this
	  return str;
	}



	dc.renderAll();

	$('#chart-ring-year').on('click', function() {
	  var minDate2 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate2 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  hitslineChart.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  hitslineChart2.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  hitslineChart.redraw();
	  hitslineChart2.redraw();
	});

	$('#chart-ring-month').on('click', function() {
	  var minDate3 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate3 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  hitslineChart.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  hitslineChart2.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  hitslineChart.redraw();
      hitslineChart2.redraw();
	});
	
  }
});
