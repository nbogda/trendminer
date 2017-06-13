$(document).ready(function(){
    data = [];	

	var file_array = ["can_MSM_sentiment.json"];
	for (var i = 0; i < file_array.length; i++)
	{
	$.getJSON(file_array[i], function(results)
	{
		data = results;
		process_data();
	});
	}
	
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

	var hitslineChart = dc.compositeChart("#chart-line-postsperday");
	var dateDim = ndx.dimension(function(d) {
	  return d.post_date;
	});

	var minDate = dateDim.bottom(1)[0].post_date;
	var maxDate = dateDim.top(1)[0].post_date;

	var clinton_ = dateDim.group().reduceSum(function(d) {
	
	  if (d.candidate == 'clinton_mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	
	var trump_ = dateDim.group().reduceSum(function(d)
	{
	  if (d.candidate == 'trump_mainstream') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var posts_m = dateDim.group().reduceSum(function(d) {
		if (d.candidate == 'clinton_mainstream') {
		return d.posts;
		}
		else{
			return 0;
		}
	});
	
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
	  .rightYAxisLabel("Posts")
	  .compose([
		dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(clinton_, "Clinton")
		.colors("blue")
		.elasticX(true)
		.elasticY(true),
		dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(trump_, "Trump")
		.colors("red")
		.elasticX(true)
		.elasticY(true),
		dc.lineChart(hitslineChart)
		.dimension(dateDim)
		.group(posts_m, "Posts")
		.colors("gray")
		.dashStyle([5,5])
		.elasticX(true)
		.elasticY(true)
		.useRightYAxis(true)
		]);

/******************************************************************************/

	var hitslineChart2 = dc.compositeChart("#chart-line-socialmedia");

	var clinton_s = dateDim.group().reduceSum(function(d) {
	
	  if (d.candidate == 'clinton_social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});
	var trump_s = dateDim.group().reduceSum(function(d)
	{
	  if (d.candidate == 'trump_social') {
		return d.sentiment;
	  } else {
		return 0;
	  }
	});

	var posts_s = dateDim.group().reduceSum(function(d) {
		if (d.candidate == 'clinton_social') {
		return d.posts;
		}
		else{
			return 0;
		}
	});

	hitslineChart2
	  .width(1000).height(400)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
	  .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
	  .title(function(d, h1) {
		h1 = false;
		return getvalues(d);
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
	  .rightYAxisLabel("Posts")
	  .compose([
		dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(clinton_s, "Clinton")
		.colors("blue")
		.elasticX(true)
		.elasticY(true),
		dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(trump_s, "Trump")
		.colors("red")
		.elasticX(true)
		.elasticY(true),
		dc.lineChart(hitslineChart2)
		.dimension(dateDim)
		.group(posts_s, "Posts")
		.colors("gray")
		.dashStyle([5,5])
		.elasticX(true)
		.elasticY(true)
		.useRightYAxis(true)
		]);


	function getvalues(d, h1) {
	  var str = (d.key.getMonth() + 1) + "/" + d.key.getDate() + "/" + d.key.getFullYear() + "\n";
	  //filter needs to be applied to new crossfilter so it doesn't effect current data
	  //however, if chart gets filtered by status, we need to update title
	  var key_filter = dateDim.filter(d.key).top(Infinity);
	  var total = 0
	  if (h1)
	  {
		  key_filter.forEach(function(a) 
		  {
			if (a.candidate == "clinton_mainstream") 
			{
			str += a.sentiment + " clinton mainstream sentiment value\n";
			}
		    if (a.candidate == "trump_mainstream") 
			{
			str += a.sentiment + " trump mainstream sentiment value\n";
			}

			if (a.candidate == "clinton_mainstream")
			{
				str += "Total " + a.posts + "\n"
			}
		   });
	  }

	 else
		 {
		 key_filter.forEach(function(a) 
		 {
			if (a.candidate == "clinton_social") 
			{
				str += a.sentiment + " clinton social sentiment value\n";
			}
			 if (a.candidate == "trump_social") 
			 {
				str += a.sentiment + " trump social sentiment value\n";
			}
			if (a.candidate == "clinton_social")
			{
				str += "Total " + a.posts + "\n"
			}
		  });
 
		 }
		
	  

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
