function loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency){

	var dimensionList=[];

	d3.map(indicators_metadata, function(d){return d.Dimension;}).keys().forEach(function(d){dimensionList.push({'dimName':d});})

	dimensionList.forEach(function(z){
		indicators_metadata.filter(function(d){return d.Dimension==z.dimName;}).forEach(function(v){
			
			var selectedCou = document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value;

			var compCou = document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value;

			barchart(v.Indicator_code, selectedCou,compCou,eval(z.dimName.toLowerCase()).filter(function(k){return k.variable==v.Indicator_code}))
			
		})
	})
	pearlchart("Urgency", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value, urgency.filter(function (d) { return d.variable == "Total" }))
	pearlchart("Coverage", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,participation.filter(function(d){return d.variable=="Total"}))
	pearlchart("Inclusiveness", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,inclusiveness.filter(function(d){return d.variable=="Total"}))
	pearlchart("Financing", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,financing.filter(function(d){return d.variable=="Total"}))
	pearlchart("Quality", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,quality.filter(function(d){return d.variable=="Total"}))
	pearlchart("Alignment", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,alignment.filter(function(d){return d.variable=="Total"}))
	pearlchart("Flexiguidance", document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value, document.getElementById("country_dropdown_comp").options[document.getElementById("country_dropdown_comp").selectedIndex].value,flexiguidance.filter(function(d){return d.variable=="Total"}))
	
}

function pearlchart(nameIndic, selectedCou,compCou,indicData){

	var data = indicData.filter(function (d) { return d.value != "NA" })

	var rankArray = []
	data.filter(function (k) { return k.variable == "Total" }).forEach(function (k) {
		if (k.value != "NA")
			rankArray.push(k.value);
	})
	data.forEach(function(k){
		k.ranking = rankArray.sort().reverse().indexOf(k.value) + 1;
	})

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
	    	.style("background","none")
	  		.append("g")
	    	.attr("class","compChart")
	    	.attr("transform", "translate(" + 0 + "," + 0 + ")");


		var minValue = d3.min(data, function(d) { return parseFloat(d.value); });
		var maxValue = d3.max(data, function(d) { return parseFloat(d.value); });

		if(nameIndic=="???" || nameIndic=="???" )
			xPearl.domain([minValue,maxValue]) ;
		else
			xPearl.domain([minValue,maxValue]) ;



		var guideStart2display, guideEnd2display;

		dimGuides.forEach(function (d) {
			var indic2pick;
			if (nameIndic=="Coverage")
				indic2pick="participationData"
			else
				indic2pick = nameIndic + "Data"

			if (d.dimGuide.toLowerCase() == indic2pick.toLowerCase()) {
				guideStart2display = d.guides[0];
				guideEnd2display = d.guides[1];
			}
		})


		var dimDescGuide = compChart.append("text")
			.append("tspan")
			.attr("id", "chartGuidePearl")
			.attr("x", 5).attr("y", 9)
			//.attr("y", heightPearl -3)
			.html(guideStart2display)
		//.call(wrap,0.25*width);

		var dimDescGuideEnd = compChart.append("text")
			.append("tspan")
			.attr("id", "chartGuidePearlEnd")
			.attr("x", overallwidth - 5).attr("y",  9)
			//.attr("y", heightPearl -3)
			.html(guideEnd2display)
			.style("text-anchor", "end")

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

			.filter(function (d) { return d.Country == selectedCou || d.Country == compCou ||  d.value==minValue || d.value==maxValue })
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
					return selCounColor;
				else if (d.Country == compCou)
					return selCompCounColor;
				else if (d.value==minValue )
					return colorDim(nameIndic)
				else if (d.value==maxValue )
					return colorDim(nameIndic)
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
				else if (d.Country == compCou)
					return heightPearl / 2 + 27;
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

		var dispCou = false;
		data.forEach(function (k) {
			if (k.Country == selectedCou)
				dispCou = true;
		})


		if (!dispCou) {
			compChart.append("text")
				.attr("class", "noDataAvailable")
				.attr('x', 1/4*overallwidth)
				.attr('y', 15)
				.text('data unavailable for the selected country ')
		}

		compChart.selectAll("circle")
			.on("mouseover", function(d) {
				tooltip.html(d.Country + "<br> score: " + d3.format(".2f")(d.value)+"<br> rank: " + d.ranking + "/" + rankArray.length);
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);





}


function barchart(nameIndic, selectedCou, compCou,indicData){
	
	var data=(indicData.filter(function(d){return d.value!="NA"})).sort(function(a,b){return parseFloat(a.value)-parseFloat(b.value); })
	var currentChart="#chart_"+nameIndic;
	
	var dispCou=false;
	data.forEach(function(k){
		if(k.Country==selectedCou)
			dispCou=true;
	})

	d3.selectAll(currentChart)
		.selectAll("*")
		.remove();


	var idTopic="title_"+nameIndic;
	var IDChart="#chart_"+nameIndic;

	if(nameIndic!="Alignment" && nameIndic!="Financing" && nameIndic!="Flexiguidance" && nameIndic!="Inclusiveness" && nameIndic!="Coverage" && nameIndic!="Quality" && nameIndic!="Urgency")
	document.getElementById(idTopic).innerHTML=returnName(nameIndic);


	var idHashtag = "#" + idTopic;
	d3.select(idHashtag)
		.on("mouseover", function (d) {
			tooltip.html("Source:" + returnSource(nameIndic));
			tooltip.style("visibility", "visible");
		})
		.on("mousemove", mousemove)
		.on("mouseout", mouseout);

	var compChart=d3.select(IDChart)
	    	.append("svg")
	    	.attr("id",nameIndic)
	    	.attr("width", widthBar)
	    	.attr("height",heightBar)
	    	//.style("background","rgba(247,247,247,0.5)")
	  		.append("g")
	    	.attr("class","compChart")
	    	.attr("transform", "translate(" + 0 + "," + 0 + ")");


		var minValue = d3.min(data, function(d) { return parseFloat(d.value); })-5;
		var maxValue = d3.max(data, function(d) { return parseFloat(d.value); })+5;


  	xBar.domain(data.map(function(d) { return d.Country; }));
		if (minValue <= 0) {
			yBar.domain([parseFloat(minValue), parseFloat(maxValue)]);
		}else {
				yBar.domain([0, parseFloat(maxValue)]);

		}

      compChart.selectAll(".bar")
      	.data(data)
    	.enter().append("rect")
      	.attr("class", "bar")
				.attr("y", function (d) { return yBar(Math.max(0, parseFloat(d.value))); })
				.attr("x", function (d) { return xBar(d.Country); })
				.attr("height", function (d) { return Math.abs(yBar(parseFloat(d.value))-yBar(0) ); })
				.attr("width", xBar.bandwidth())
      	.attr("fill",function(d){
      		if(d.Country==selectedCou)
						return selCounColor;
					else if (d.Country == compCou)
						return selCompCounColor;
      		else
      			return"#8EA4B1"
      	});

		if (!dispCou){
			compChart.append("text")
			.attr("class","noDataAvailable")
			.attr('x',15)
			.attr('y',15)
			.text('data unavailable for the selected country ')
		}

		compChart.selectAll(".bar")
		.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br>" + d3.format(".2f")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);

		     




}