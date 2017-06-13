$(document).ready(function(){
    data = [];
	$.getJSON("keywords.json", function(results)
	{
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

	var statusDim = ndx.dimension(function(d) {
	  return d.keyword;
	});


	var dateDim = ndx.dimension(function(d) {
	  return d.post_date;
	});
	var posts = dateDim.group().reduceSum(function(d) {
	  return d.posts;
	});
	var minDate = dateDim.bottom(1)[0].post_date;
	var maxDate = dateDim.top(1)[0].post_date;

	var hitslineChart = dc.compositeChart("#chart-line-postsperday");
	var terror_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'terrorism_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});
	var jobs_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'jobs_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var sexism_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'sexism_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});
	var crime_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'crime_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var global_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'globalization_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var envir_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'climate_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var border_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'immigration_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var ed_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'education_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var russ_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'russia_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var race_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'race_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var economy_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'economy_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var health_ = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'healthcare_mainstream') {
		return d.posts;
	  } else {
		return 0;
	  }
	});




	hitslineChart
	  .width(1000).height(500)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
	  .elasticY(true)
	  .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
	  .title(function(d) {
		return getvalues(d);
	  })
	  .margins({
		top: 10,
		left: 50,
		right: 10,
		bottom: 50
	  })
	  .renderlet(function(chart) {
		chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");
	  })
	  .compose([
      dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(russ_, "Russia")
        .colors("#f50b0b")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(terror_, "Terrorism/ISIS")
        .colors("#ee7849")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(envir_, "Climate Change/Enviroment")
        .colors("#e7d338")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(jobs_, "Job/Job Opportunities")
        .colors("#38e784")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(economy_, "Economy")
        .colors("#2abb10")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(global_, "Globalization")
        .colors("#12d1d1")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(border_, "Immigration")
        .colors("#123fd1")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(sexism_, "Sexism/Women")
        .colors("#7d50e6")
		  .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart)
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
        .group(ed_, "Education")
        .colors("d77936")
        .elasticX(true)
        .elasticY(true)
        ]);

var hitslineChart2 = dc.compositeChart("#chart-line-postsperday2");
	var terror_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'terrorism_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});
	var jobs_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'jobs_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var sexism_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'sexism_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});
	var crime_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'crime_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var global_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'globalization_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var envir_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'climate_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var border_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'immigration_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var ed_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'education_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var russ_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'russia_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var race_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'race_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var economy_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'economy_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});

	var health_s = dateDim.group().reduceSum(function(d) {
	  if (d.keyword == 'healthcare_social') {
		return d.posts;
	  } else {
		return 0;
	  }
	});




	hitslineChart2
	  .width(1000).height(500)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
	  .elasticY(true)
	  .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
	  .title(function(d) {
		return getvalues(d);
	  })
	  .margins({
		top: 10,
		left: 50,
		right: 10,
		bottom: 50
	  })
	  .renderlet(function(chart) {
		chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");
	  })
	  .compose([
      dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(russ_s, "Russia")
        .colors("#f50b0b")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(terror_s, "Terrorism/ISIS")
        .colors("#ee7849")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(envir_s, "Climate Change/Enviroment")
        .colors("#e7d338")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(jobs_s, "Job/Job Opportunities")
        .colors("#38e784")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(economy_s, "Economy")
        .colors("#2abb10")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(global_s, "Globalization")
        .colors("#12d1d1")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(border_s, "Immigration")
        .colors("#123fd1")
        .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
        .dimension(dateDim)
        .group(sexism_s, "Sexism/Women")
        .colors("#7d50e6")
		  .elasticX(true)
        .elasticY(true),
    dc.lineChart(hitslineChart2)
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
        .group(ed_s, "Education")
        .colors("d77936")
        .elasticX(true)
        .elasticY(true)
        ]);



	function getvalues(d) {
	  var str = (d.key.getMonth() + 1) + "/" + d.key.getDate() + "/" + d.key.getFullYear() + "\n";
	  //filter needs to be applied to new crossfilter so it doesn't effect current data
	  //however, if chart gets filtered by status, we need to update title
	  var key_filter = dateDim.filter(d.key).top(Infinity);
	  var total = 0
	  key_filter.forEach(function(a) {
		str += a.keyword + ": " + a.posts + " Posts\n";
		total += a.posts;
	  });

	  str += "Total:" + total;
	  dateDim.filterAll(); //remove filter so it doesn't effect the graphs, this is the only filter so we can do this
	  return str;
	}




	dc.renderAll();

	$('#chart-ring-year').on('click', function() {
	  var minDate2 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate2 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  hitslineChart.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  hitslineChart.redraw();
	  hitslineChart2.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  hitslineChart2.redraw();
	});

	$('#chart-ring-month').on('click', function() {
	  var minDate3 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate3 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  hitslineChart.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  hitslineChart.redraw();
	  hitslineChart2.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  hitslineChart2.redraw();
	});
	
  }
});
