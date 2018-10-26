function loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency){
var dimensionList=[];
d3.map(indicators_metadata, function(d){return d.Dimension;}).keys().forEach(function(d){dimensionList.push({'dimName':d});})


dimensionList.forEach(function(z){
	indicators_metadata.filter(function(d){return d.Dimension==z.dimName;}).forEach(function(v){
		
		var selectedCou = document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value;
		pearlchart(v.Indicator_code,selectedCou,eval(z.dimName.toLowerCase()).filter(function(k){return k.variable==v.Indicator_code}))
		
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
	    	.style("background","rgba(247,247,247,0.5)")
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
	      	.style("stroke", "#00B7B5")
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
	              return  d.Country+ " (" + format(d.value) + "%"+")";
	      })



		compChart.selectAll("circle")
			.on("mouseover",function(d){
			d3.select(this)
				.attr("r",10);

			var xPosition = event.pageX-20;
			var yPosition = event.pageY+15;
			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-160;

			//Update the tooltip position and value


		     d3.select("#indicTooltip")
		        .text(function(){
	            	if (nameIndic=="Emp")
	            		return "Employment rate (" + d.yearData +")";
	            	if (nameIndic=="EmpFTI")
	            		return "Full-time equivalent employment rate (" + d.yearData  +")";
	            	if (nameIndic=="Unemp")
	            		return "Unemployment rate (" + d.yearData  +")";
	            	if (nameIndic=="EarnQual")
	            		return "Earnings quality (" + d.yearData  +")";
	            	if (nameIndic=="LabMarkSec")
	            		return "Labour market insecurity (" + d.yearData  +")" ;
	            	if (nameIndic=="JobStrain")
	            		return "Job strain (" + d.yearData  +")" ;
	            	if (nameIndic=="LongHours")
	            		return "Very long-hours of work (" + d.yearData  +")" ;
	            	if (nameIndic=="LowIncome")
	            		return "Low income rate (" + d.yearData  +")" ;
	            	if (nameIndic=="GenderIneq")
	            		return "Gender Labour Income Gap (" + d.yearData  +")" ;
	            	if (nameIndic=="EmplGap")
	            		return "Employment gap for disadvantaged groups (" + d.yearData  +")" ;

	            });

		     d3.select("#valueTooltip")
		        .text(function(){
	            if (nameIndic=="EarnQual")
	              return format(d.value) + " USD";
	            else if  (nameIndic=="EmplGap")
	              return format(d.value) + "%";
	            else
	              return format(d.value) + "%";
        	});

		     



			d3.select("#indicTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") 
		        .select("#countryTooltip")
		        .text(d.Country);

			d3.select("#indicTooltip").classed("hidden", false);


		

		})
		.on("mouseout",function(d){

			var sel = document.getElementById("country_dropdown");

				
				d3.select(this)
				.attr("r",  function(d){
				if(d.ISO==sel.options[sel.selectedIndex].value)
					return 8;

				else
					return 8;
			})
	            
	            //Hide the tooltip
				d3.select("#indicTooltip").classed("hidden", true);	            

		});



}