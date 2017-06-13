$(document).ready(function(){
    
	data = [];

		$.getJSON("talk.json", function(results) {
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
/**********/

	var barMSMChart = dc.barChart("#chart-bar-msm");
	var topDim = ndx.dimension(function(d) {return d.topic;});
	var clinton_ = topDim.group().reduceSum(function(d) {
		if (d.candidate == "clinton_mainstream"){
			return d.posts;
		}else{
			return 0;
		}
	});

	var trump_ = topDim.group().reduceSum(function(d) {
		if (d.candidate == "trump_mainstream"){
			return d.posts;
		}else{
			return 0;
		}
	});

	
	barMSMChart
		.dimension(topDim)
		.group(clinton_, "Hillary Clinton")
		.stack(trump_, "Donald Trump")
		.ordinalColors(["blue", "red"])
		.width(1000)
		.height(400)
		.margins({top: 20, right: 100, bottom: 20, left: 50})
		.x(d3.scale.ordinal().domain(data.map(function(d) {
			return d.topic;})))
		.xUnits(dc.units.ordinal)
		.brushOn(false)
		.elasticY(true)
		.renderHorizontalGridLines(true)
		.legend(dc.legend().x(60).y(5).itemHeight(15).gap(5))

			
	var barSMChart = dc.barChart("#chart-bar-sm");
	var clinton_s = topDim.group().reduceSum(function(d) {
		if (d.candidate == "clinton_social"){
			return d.posts;
		}else{
			return 0;
		}
	});

	var trump_s = topDim.group().reduceSum(function(d) {
		if (d.candidate == "trump_social"){
			return d.posts;
		}else{
			return 0;
		}
	});

	
	barSMChart
		.dimension(topDim)
		.group(clinton_s, "Hillary Clinton")
		.stack(trump_s, "Donald Trump")
		.ordinalColors(["blue", "red"])
		.width(1000)
		.height(400)
		.margins({top: 20, right: 50, bottom: 20, left: 50})
		.x(d3.scale.ordinal().domain(data.map(function(d) {
			return d.topic;})))
		.xUnits(dc.units.ordinal)
		.brushOn(false)
		.elasticY(true)
		.renderHorizontalGridLines(true)
		.legend(dc.legend().x(60).y(5).itemHeight(15).gap(5))
	


	dc.renderAll();

	$('#chart-ring-year').on('click', function() {
	  var minDate2 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate2 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  barMSMChart.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  barSMChart.x(d3.time.scale().domain([minDate2, maxDate2]).range([0,1000]));
	  barMSMChart.redraw();
	  barSMChart.redraw();
	});

	$('#chart-ring-month').on('click', function() {
	  var minDate3 = dateDim.bottom(1)[0].post_date; //new Date(2015, 4, 12)
	  var maxDate3 = dateDim.top(1)[0].post_date; //new Date(2016, 11, 8)
	  barMSMChart.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  barSMChart.x(d3.time.scale().domain([minDate3, maxDate3]).range([0,1000]));
	  barMSMChart.redraw();
      barSMChart.redraw();
	});
	
  }
});
