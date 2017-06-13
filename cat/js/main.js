$(document).ready(function(){
    data = [];
	$.getJSON("categories.json", function(results)
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

	var statusRingChart = dc.pieChart("#chart-ring-category");
	var statusDim = ndx.dimension(function(d) {
	  return d.category;
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
	var posts = dateDim.group().reduceSum(function(d) {
	  return d.posts;
	});
	var minDate = dateDim.bottom(1)[0].post_date;
	var maxDate = dateDim.top(1)[0].post_date;

	var blogs_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'blogs') {
			return d.posts;
	  } else {
			return 0;
	  }
	});
	var comments_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'comments') {
			return d.posts;
	  } else {
			return 0;
	  }
	});

	var forums_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'forums') {
			return d.posts;
	  } else {
			return 0;
	  }
	});
	var replies_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'replies') {
			return d.posts;
	  } else {
			return 0;
	  }
	});

	var twitter_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'twitter') {
			return d.posts;
	  } else {
			return 0;
	  }
	});

	var mainstream_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'mainstream') {
			return d.posts;
	  } else {
			return 0;
	  }
	});

	var facebook_ = dateDim.group().reduceSum(function(d) {
	  if (d.category === 'facebook') {
			return d.posts;
          } else {
                return 0;
          }
    });


	hitslineChart
	  .width(1100).height(600)
	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .brushOn(false)
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
        .group(blogs_, "Blogs")
        .colors("blue")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(comments_, "Comments")
        .colors("red")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(forums_, "Forums")
        .colors("orange")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(replies_, "Forum Replies")
        .colors("green")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(twitter_, "Twitter")
        .colors("purple")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(mainstream_, "Mainstream Media")
         .colors("violet")
        .elasticX(true)
        .elasticY(true),
	dc.lineChart(hitslineChart)
        .dimension(dateDim)
        .group(facebook_, "Facebook")
        .colors("pink")
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
		str += a.category + ": " + a.posts + " Posts\n";
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
	});

	$('#chart-ring-month').on('click', function() {
	  var minDate3 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate3 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  hitslineChart.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));

	  hitslineChart.redraw();
	});
	
  }
});
