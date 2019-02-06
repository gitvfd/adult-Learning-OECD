	function sortchartDash(topicSelected){

		if(topicSelected=="Country")
			sortItems = function (a, b) {
				return a.Country.localeCompare(b.Country);
			}
		else
			sortItems = function (a, b) {
				return b[topicSelected] - a[topicSelected];
			}
	    	//data_sort.sort(function(a, b) { return a[topicSelected] - b[topicSelected]; });

		chartDash.selectAll(".Name")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });


		chartDash.selectAll(".UrgencyDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });
		
		chartDash.selectAll(".CoverageDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		chartDash.selectAll(".InclusivenessDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		chartDash.selectAll(".FinancingDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		chartDash.selectAll(".QualityDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		chartDash.selectAll(".AligmentDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		chartDash.selectAll(".FlexiguidanceDash")
			.sort(sortItems)
			.transition()
  			.delay(function (d, i) {
        		return i * 10;
    		})
        	.duration(100)
			.attr("y",function(d, i) { return  i * barHeightDash ; });

		//var indicator = d3.select(this).attr("class")
		//		indicator=indicator.split(' ')[0]
		titleDash.selectAll("rect")
		.style("opacity", function(d){
		 if(d.code==topicSelected)

		 	return 0.15;
		 else 
		 	return 0.65;
		}) ;
	}


	    		