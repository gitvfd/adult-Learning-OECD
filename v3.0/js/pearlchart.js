function loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency){
var dimensionList=[];
d3.map(indicators_metadata, function(d){return d.Dimension;}).keys().forEach(function(d){dimensionList.push({'dimName':d});})


dimensionList.forEach(function(z){
	indicators_metadata.filter(function(d){return d.Dimension==z.dimName;}).forEach(function(v){
		
		var selectedCou = document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value;
		barchart(v.Indicator_code,selectedCou,eval(z.dimName.toLowerCase()).filter(function(k){return k.variable==v.Indicator_code}))
		
	})
})


pearlchart("Urgency",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,urgency.filter(function(d){return d.variable=="Total"}))
pearlchart("Coverage",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,participation.filter(function(d){return d.variable=="Total"}))
pearlchart("Inclusiveness",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,inclusiveness.filter(function(d){return d.variable=="Total"}))
pearlchart("Financing",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,financing.filter(function(d){return d.variable=="Total"}))
pearlchart("Quality",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,quality.filter(function(d){return d.variable=="Total"}))
pearlchart("Alignment",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,alignment.filter(function(d){return d.variable=="Total"}))
pearlchart("Flexiguidance",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,flexiguidance.filter(function(d){return d.variable=="Total"}))


}

function pearlchart(nameIndic,selectedCou,indicData){

	var data=indicData.filter(function(d){return d.value!="NA"})

	var currentChart="#chart_"+nameIndic;
	d3.selectAll(currentChart)
		.selectAll("*")
		.remove();

	var idTopic="title_"+nameIndic;
	var IDChart="#chart_"+nameIndic;

	if(nameIndic!="Alignment" && nameIndic!="Financing" && nameIndic!="Flexiguidance" && nameIndic!="Inclusiveness" && nameIndic!="Coverage" && nameIndic!="Quality" && nameIndic!="Urgency")
	document.getElementById(idTopic).innerHTML=returnName(nameIndic);

	var compChart=d3.select(IDChart)
	    	.append("svg")
	    	.attr("id",nameIndic)
	    	.attr("width", overallwidth)
	    	.attr("height",heightPearl)
	    	//.style("background","rgba(247,247,247,0.5)")
	  		.append("g")
	    	.attr("class","compChart")
	    	.attr("transform", "translate(" + 0 + "," + 0 + ")");


		var minValue = d3.min(data, function(d) { return parseFloat(d.value); });
		var maxValue = d3.max(data, function(d) { return parseFloat(d.value); });

		if(nameIndic=="???" || nameIndic=="???" )
			xPearl.domain([minValue,maxValue]) ;
		else
			xPearl.domain([minValue,maxValue]) ;

		compChart.append("line")
			.attr("x1",xPearl(minValue))
			.attr("y1",heightPearl/2)
			.attr("x2",xPearl(maxValue))
			.attr("y2",heightPearl/2)
	      	.style("stroke", "#b19b8e")
	      	.style("stroke-width","1px");

		var circleGroup = compChart.selectAll("g")
		    .data(data)
		    .enter()
		    .append("g")

      		.filter(function(d) { return d.Country==selectedCou  ||  d.value==minValue || d.value==maxValue })
		    .attr("class", function(d){return d.variable;});

		circleGroup.append("circle")
		    .attr("cx",function(d){
		    	if(d.value!=="")
		    		return xPearl(parseFloat(d.value));})
		    .attr("cy",heightPearl/2)
			.attr("r", function(d){
				if(d.ISO==selectedCou)
					return 8;
				else
					return 8;
			})
			.style("fill",function(d){
				if(d.Country==selectedCou)
					return "#5E0084"
				else if (d.value==minValue )
					return colorDim(pickSector(d.variable))
				else if (d.value==maxValue )
					return colorDim(pickSector(d.variable))
				else
					return "";
			});

		circleGroup.append("text")
			.attr("class","label")
			.attr("dx", function(d){
				    	if(d.value!=="")
				    		return xPearl(parseFloat(d.value));})
			.attr("dy",function(d){
				if(d.Country==selectedCou)
					return heightPearl/2+18;
				else
					return heightPearl/2-10;
			})
			.style("text-anchor","middle")
			.text(function(d){

	            if (nameIndic=="EarnQual")
	              return  d.Country+ " (" + format(d.value) + " USD"+")";
	            else if  (nameIndic=="EmplGap")
	              return  d.Country+ " (" + format(d.value) + "%"+")";
	            else
	              return  d.Country+ " (" + format(d.value) + ""+")";
	      })



		compChart.selectAll("circle")
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);



}


function barchart(nameIndic,selectedCou,indicData){

	var data=(indicData.filter(function(d){return d.value!="NA"})).sort(function(a,b){return parseFloat(a.value)-parseFloat(b.value); })

	var currentChart="#chart_"+nameIndic;
	d3.selectAll(currentChart)
		.selectAll("*")
		.remove();

	var idTopic="title_"+nameIndic;
	var IDChart="#chart_"+nameIndic;

	if(nameIndic!="Alignment" && nameIndic!="Financing" && nameIndic!="Flexiguidance" && nameIndic!="Inclusiveness" && nameIndic!="Coverage" && nameIndic!="Quality" && nameIndic!="Urgency")
	document.getElementById(idTopic).innerHTML=returnName(nameIndic);

	var compChart=d3.select(IDChart)
	    	.append("svg")
	    	.attr("id",nameIndic)
	    	.attr("width", widthBar)
	    	.attr("height",heightBar)
	    	//.style("background","rgba(247,247,247,0.5)")
	  		.append("g")
	    	.attr("class","compChart")
	    	.attr("transform", "translate(" + 0 + "," + 0 + ")");


		var minValue = d3.min(data, function(d) { return parseFloat(d.value); });
		var maxValue = d3.max(data, function(d) { return parseFloat(d.value); });


  		xBar.domain(data.map(function(d) { return d.Country; }));

		if(nameIndic=="???" || nameIndic=="???" )
			yBar.domain([minValue,maxValue]) ;
		else
			yBar.domain([minValue,maxValue]) ;


      compChart.selectAll(".bar")
      	.data(data)
    	.enter().append("rect")
      	.attr("class", "bar")
      	.attr("x", function(d) { return xBar(d.Country); })
      	.attr("width", xBar.bandwidth())
      	.attr("y", function(d) { return yBar(d.value); })
      	.attr("height", function(d) { return heightBar-marginBar - yBar(d.value); })
      	.attr("fill",function(d){
      		if(d.Country==selectedCou)
      		return "#993484"
      		else
      		return"#8EA4B1"
      	});

		


		compChart.selectAll(".bar")
		.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br>" + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);

		     




}