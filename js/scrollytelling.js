



function  renderStory(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency){
	if(screenWidth>600){
		screenWidth=0.7*screenWidth
		
		var heightChart=0.75*window.innerHeight;

		var xScaleChallenges = d3.scaleBand()
	        	.domain(urgency.filter(function(d){return d.value!="NA"}).sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
	        	.range([margin, screenWidth - margin/2])
	        	.padding(padding);

		var xScaleResponses = d3.scaleBand()
	        	.domain(financing.filter(function(d){return d.value!="NA"}).sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
	        	.range([margin, screenWidth - margin /2])
	        	.padding(padding);

		var yScale = d3.scaleLinear()
	    	.domain([0, 1])
	    	.range([heightChart-margin,margin/3]);


	 	var challengesChart = d3.select('#challengesChart').html('')
	    	.append('svg')
	      	.attrs({width: screenWidth, height: heightChart})


	 	var responsesChart = d3.select('#responsesChart').html('')
	    	.append('svg')
	      	.attrs({width: screenWidth, height: heightChart})

		var challengesGuide = challengesChart.append("text")
		  	.attr("x",0)
		    .attr("y",0)
		    .append("tspan")
		  	.attr("id","chartGuideChallenges")
		  	.attr("x",margin/3)
		    .attr("y",margin/5)
		    .html("↓  <br/> 1 is the lowest performance, 0 the highest")
		    //.call(wrap,0.25*width);
		
		var responsesGuide = responsesChart.append("text")
		  	.attr("x",0)
		    .attr("y",0)
		    .append("tspan")
		  	.attr("id","chartGuideResponses")
		  	.attr("x",margin/3)
		    .attr("y",margin/5)
		    .html("↑  <br/> 0 is the lowest performance, 1 the highest")
	   
	    //←↑→↓
		//Create challenges  X axis
		//challengesChart.append("g")
		  //  .attr("class", "axis x xAxis")
		    //.attr("transform", "translate(0," + yScale(0) + ")")
		    //.call(d3.axisBottom(xScaleChallenges));

		  
	  	//Create Y axis
	  	challengesChart.append("g")
		    .attr("class", "axis y yAxis")
		    .attr("transform", "translate(" + margin + ",0)")
		    .call(d3.axisLeft(yScale));


		//Create responses  X axis
		//responsesChart.append("g")
		  //  .attr("class", "axis x xAxis")
		    //.attr("transform", "translate(0," + yScale(0) + ")")
		    //.call(d3.axisBottom(xScaleResponses));
		  
	  	//Create Y axis
	  	responsesChart.append("g")
		    .attr("class", "axis y yAxis")
		    .attr("transform", "translate(" + margin + ",0)")
		    .call(d3.axisLeft(yScale));

		///Lollipop challenges
	    var lollipopsCircle = challengesChart.selectAll("circle")
	    	.data(urgency)
	    	.enter().append("circle")
	    	.attr("class", "lollipopCircle")
	        .attr("r", 10)
	        .attr("cx", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else
	            	return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("cy", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("fill",colorDim("urgency"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);


			var lollipopsText = challengesChart.selectAll("circleText")
	    	.data(urgency)
	    	.enter().append("text")
	    	.attr("class", "lollipopText")

	        .attr("transform", "translate(-3,15)rotate(-90)")
	        .attr("dy", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("dx", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return -yScale(d.value);
	         })
	         .text( function(d){
	         	return d.Country;
	         })
	        .attr("text-anchor", "end")
	        .attr("fill",colorDim("urgency"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;

			var lollipopsLine = challengesChart.selectAll("circleLine")
	    	.data(urgency)
	    	.enter().append("line")
	    	.attr("class", "lollipopLine")
	        .attr("x1", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	        .attr("x2", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("y1", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(0);
	         })
	         .attr("y2", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("stroke",colorDim("urgency"))
	         .attr( "stroke-width","1")
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;
	         
	       
		///Lollipop responses
	    var resplollipopsCircle = responsesChart.selectAll("circle")
	    	.data(financing)
	    	.enter().append("circle")
	    	.attr("class", "lollipopCircle")
	        .attr("r", 10)
	        .attr("cx", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else
	            	return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("cy", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("fill",colorDim("financing"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;


			var resplollipopsText = responsesChart.selectAll("circleText")
	    	.data(financing)
	    	.enter().append("text")
	    	.attr("class", "lollipopText")

	        .attr("transform", "translate(-3,15)rotate(-90)")
	        .attr("dy", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("dx", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return -yScale(d.value);
	         })
	         .text( function(d){
	         	return d.Country;
	         })
	        .attr("text-anchor", "end")
	        .attr("fill",colorDim("financing"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;

			var resplollipopsLine = responsesChart.selectAll("circleLine")
	    	.data(financing)
	    	.enter().append("line")
	    	.attr("class", "lollipopLine")
	        .attr("x1", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	        .attr("x2", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("y1", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(0);
	         })
	         .attr("y2", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("stroke",colorDim("financing"))
	         .attr( "stroke-width","1")
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;
	         

	  	var dataPosChallenges=[urgency,urgency,participation,inclusiveness]
	  	var colorChallenges=["urgency","urgency","participation","inclusiveness"]
	  	var dataPosResponses=[financing,financing,alignment,quality,flexiguidance]
	  	var colorResponses=["financing","financing","alignment","quality","flexiguidance"]
	  	var guideChallenges=["↓  <br/> 1 is the lowest performance, 0 the highest","↓  <br/> 1 is the lowest performance, 0 the highest","↑  <br/> 0 is the lowest performance, 1 the highest","↑  <br/> 0 is the lowest performance, 1 the highest"]
	  	var guideResponses=["↑  <br/> 0 is the lowest performance, 1 the highest","↑  <br/> 0 is the lowest performance, 1 the highest","↑  <br/> 0 is the lowest performance, 1 the highest","↑  <br/> 0 is the lowest performance, 1 the highest","↑  <br/> 0 is the lowest performance, 1 the highest"]

	   //←↑→↓
		///Scrolly Challenges
		var gs = d3.graphScroll()
		    .container(d3.select('.container-1'))
		    .graph(d3.selectAll('container #challengesChart'))
		    .eventId('uniqueId1')  // namespace for scroll and resize events
		    .sections(d3.selectAll('.container-1 #sections > div'))
		    .offset(innerWidth < 900 ? innerHeight - 100 : 500)
		    .on('active', function(i){

		    	var dataStory=dataPosChallenges[i].filter(function(d){return d.value!="NA"})
				xScaleChallenges.domain(dataStory.sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
				
				challengesChart.select(".x").transition().duration(600).call(d3.axisBottom(xScaleChallenges));
				
				lollipopsCircle.data(dataPosChallenges[i])
						.transition()
						.duration(600)     
				        .attr("cx", function(d) {
				         	if(d.value!="NA")
				            	return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				            else
				            	return "-10";
				        })
				        .attr("cy", function(d) {
				         	if(d.value!="NA")
				            	return yScale(d.value);
				            else 
				            	return "-10";
				        })
	         			.attr("fill",colorDim(colorChallenges[i]))

				lollipopsText.data(dataPosChallenges[i])
						.transition()
						.duration(600)     
						.attr("dy", function(d) {
							         	if(d.value=="NA")
							         		return "-10";
							         	else
							         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				        })
				        .attr("dx", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return -yScale(d.value);
				        })
				        .text( function(d){
				         	return d.Country;
				        })
	       				.attr("fill",colorDim(colorChallenges[i]))

				lollipopsLine.data(dataPosChallenges[i])
						.transition()
						.duration(600) 
						.attr("x1", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				         })
			            .attr("x2", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				         })
				         .attr("y1", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(0);
				         })
				         .attr("y2", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
		         		})	
	         			.attr("stroke",colorDim(colorChallenges[i]))		       
				
				challengesChart.select("#chartGuideChallenges")
		    			.html(guideChallenges[i]);
		             	         
		      })


		///Scrolly Responses
		var gs2 = d3.graphScroll()
		    .container(d3.select('.container-2'))
		    .graph(d3.selectAll('container2 #responsesChart'))
		    .eventId('uniqueId2')  // namespace for scroll and resize events
		    .sections(d3.selectAll('.container-2 #sections2 > div'))
		    .offset(innerWidth < 900 ? innerHeight - 250 : 500)
		    .on('active', function(i){
		    	var dataStory=dataPosResponses[i].filter(function(d){return d.value!="NA"})
				xScaleResponses.domain(dataStory.sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
				
				responsesChart.select(".x").transition().duration(600).call(d3.axisBottom(xScaleResponses));
				
				resplollipopsCircle.data(dataPosResponses[i])
						.transition()
						.duration(600)     
				        .attr("cx", function(d) {
				         	if(d.value!="NA")
				            	return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				            else
				            	return "-10";
				        })
				        .attr("cy", function(d) {
				         	if(d.value!="NA")
				            	return yScale(d.value);
				            else 
				            	return "-10";
				        })
				        .attr("fill",colorDim(colorResponses[i]));

				resplollipopsText.data(dataPosResponses[i])
						.transition()
						.duration(600)     
						.attr("dy", function(d) {
							         	if(d.value=="NA")
							         		return "-10";
							         	else
							         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				        })
				        .attr("dx", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return -yScale(d.value);
				        })
				        .text( function(d){
				         	return d.Country;
				        })
	        			.attr("fill",colorDim(colorResponses[i]))

				resplollipopsLine.data(dataPosResponses[i])
						.transition()
						.duration(600) 
						.attr("x1", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				         })
			            .attr("x2", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				         })
				         .attr("y1", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(0);
				         })
				         .attr("y2", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
		         		})			
	         			.attr("stroke",colorDim(colorResponses[i]))       
		        

				responsesChart.select("#chartGuideResponses")
		    			.html(guideResponses[i]);        
		      })
		}
	else{
		var heightChart=window.innerHeight;

		var xScaleChallenges = d3.scaleBand()
	        	.domain(urgency.filter(function(d){return d.value!="NA"}).sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
	        	.range([heightChart-margin,margin/3])
	        	.padding(padding);

		var xScaleResponses = d3.scaleBand()
	        	.domain(financing.filter(function(d){return d.value!="NA"}).sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
	        	.range([heightChart-margin,margin/3])
	        	.padding(padding);

		var yScale = d3.scaleLinear()
	    	.domain([0, 1])
	    	.range([margin, screenWidth - margin/2]);
	    		


	 	var challengesChart = d3.select('#challengesChart').html('')
	    	.append('svg')
	      	.attrs({width: screenWidth, height: heightChart})


	 	var responsesChart = d3.select('#responsesChart').html('')
	    	.append('svg')
	      	.attrs({width: screenWidth, height: heightChart})

		var challengesGuide = challengesChart.append("text")
		  	.attr("x",0)
		    .attr("y",0)
		    .append("tspan")
		  	.attr("id","chartGuideChallenges")
		  	.attr("x",margin/3)
		    .attr("y",heightChart-margin/2)
		    .html("←  <br/> 1 is the lowest performance, 0 the highest")
		    //.call(wrap,0.25*width);
		
		var responsesGuide = responsesChart.append("text")
		  	.attr("x",0)
		    .attr("y",0)
		    .append("tspan")
		  	.attr("id","chartGuideResponses")
		  	.attr("x",margin/3)
		    .attr("y",heightChart-margin/2)
		    .html("→  <br/> 0 is the lowest performance, 1 the highest")
	   

		  
	  	//Create Y axis
	  	challengesChart.append("g")
		    .attr("class", "axis y yAxis")
		    .attr("transform", "translate(" + 0 + ","+margin/4+")")
		    .call(d3.axisTop(yScale));


		  
	  	//Create Y axis
	  	responsesChart.append("g")
		    .attr("class", "axis y yAxis")
		    .attr("transform", "translate(" + 0 + ","+margin/4+")")
		    .call(d3.axisTop(yScale));

		///Lollipop challenges
	    var lollipopsCircle = challengesChart.selectAll("circle")
	    	.data(urgency)
	    	.enter().append("circle")
	    	.attr("class", "lollipopCircle")
	        .attr("r", 6)
	        .attr("cy", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else
	            	return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("cx", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("fill",colorDim("urgency"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);


			var lollipopsText = challengesChart.selectAll("circleText")
	    	.data(urgency)
	    	.enter().append("text")
	    	.attr("class", "lollipopText")
	        .attr("transform", "translate(-10,-3)")
	        .attr("dy", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("dx", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .text( function(d){
	         	return d.Country;
	         })
	        .attr("text-anchor", "end")
	        .attr("fill",colorDim("urgency"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;

			var lollipopsLine = challengesChart.selectAll("circleLine")
	    	.data(urgency)
	    	.enter().append("line")
	    	.attr("class", "lollipopLine")
	        .attr("y1", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	        .attr("y2", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
	         })
	         .attr("x1", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(0);
	         })
	         .attr("x2", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("stroke",colorDim("urgency"))
	         .attr( "stroke-width","1")
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;
	         
	       
		///Lollipop responses
	    var resplollipopsCircle = responsesChart.selectAll("circle")
	    	.data(financing)
	    	.enter().append("circle")
	    	.attr("class", "lollipopCircle")
	        .attr("r", 6)
	        .attr("cy", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else
	            	return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("cx", function(d) {
	         	if(d.value==="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("fill",colorDim("financing"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;


			var resplollipopsText = responsesChart.selectAll("circleText")
	    	.data(financing)
	    	.enter().append("text")
	    	.attr("class", "lollipopText")

	        .attr("transform", "translate(-10,-3)rotate(0)")
	        .attr("dy", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("dx", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .text( function(d){
	         	return d.Country;
	         })
	        .attr("text-anchor", "end")
	        .attr("fill",colorDim("financing"))
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;

			var resplollipopsLine = responsesChart.selectAll("circleLine")
	    	.data(financing)
	    	.enter().append("line")
	    	.attr("class", "lollipopLine")
	        .attr("y1", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	        .attr("y2", function(d) {
	         	if(d.value=="NA")
	         		return "-10";
	         	else
	         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
	         })
	         .attr("x1", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(0);
	         })
	         .attr("x2", function(d) {
	         	if(d.value=="NA")
	            	return "-10";
	            else 
	            	return yScale(d.value);
	         })
	         .attr("stroke",colorDim("financing"))
	         .attr( "stroke-width","1")
			.on("mouseover", function(d) {
		              tooltip.html(d.Country + "<br><br> score: " + d3.format(".2")(d.value));
		              tooltip.style("visibility", "visible");
		      })
		    .on("mousemove", mousemove)
		   	.on("mouseout", mouseout);;;
	         

	  	var dataPosChallenges=[urgency,urgency,participation,inclusiveness]
	  	var colorChallenges=["urgency","urgency","participation","inclusiveness"]
	  	var dataPosResponses=[financing,financing,alignment,quality,flexiguidance]
	  	var colorResponses=["financing","financing","alignment","quality","flexiguidance"]
	  	var guideChallenges=["←  <br/> 1 is the lowest performance, 0 the highest","←  <br/> 1 is the lowest performance, 0 the highest","→  <br/> 0 is the lowest performance, 1 the highest","→  <br/> 0 is the lowest performance, 1 the highest"]
	  	var guideResponses=["→  <br/> 0 is the lowest performance, 1 the highest","→  <br/> 0 is the lowest performance, 1 the highest","→  <br/> 0 is the lowest performance, 1 the highest","→  <br/> 0 is the lowest performance, 1 the highest","→  <br/> 0 is the lowest performance, 1 the highest"]
	 	
		///Scrolly Challenges
		var gs = d3.graphScroll()
		    .container(d3.select('.container-1'))
		    .graph(d3.selectAll('container #challengesChart'))
		    .eventId('uniqueId1')  // namespace for scroll and resize events
		    .sections(d3.selectAll('.container-1 #sections > div'))
		    .offset(innerWidth < 900 ? innerHeight - 100 : 500)
		    .on('active', function(i){

		    	var dataStory=dataPosChallenges[i].filter(function(d){return d.value!="NA"})
				xScaleChallenges.domain(dataStory.sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
				
				challengesChart.select(".x").transition().duration(600).call(d3.axisBottom(xScaleChallenges));
				
				lollipopsCircle.data(dataPosChallenges[i])
						.transition()
						.duration(600)     
				        .attr("cy", function(d) {
				         	if(d.value!="NA")
				            	return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				            else
				            	return "-10";
				        })
				        .attr("cx", function(d) {
				         	if(d.value!="NA")
				            	return yScale(d.value);
				            else 
				            	return "-10";
				        })
	         			.attr("fill",colorDim(colorChallenges[i]))

				lollipopsText.data(dataPosChallenges[i])
						.transition()
						.duration(600)     
						.attr("dy", function(d) {
							         	if(d.value=="NA")
							         		return "-10";
							         	else
							         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				        })
				        .attr("dx", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
				        })
				        .text( function(d){
				         	return d.Country;
				        })
	       				.attr("fill",colorDim(colorChallenges[i]))

				lollipopsLine.data(dataPosChallenges[i])
						.transition()
						.duration(600) 
						.attr("y1", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				         })
			            .attr("y2", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleChallenges(d.Country)+xScaleChallenges.bandwidth() / 2;
				         })
				         .attr("x1", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(0);
				         })
				         .attr("x2", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
		         		})	
	         			.attr("stroke",colorDim(colorChallenges[i]))	

				challengesChart.select("#chartGuideChallenges")
		    			.html(guideChallenges[i]);   	       
		         	         
		      })


		///Scrolly Responses
		var gs2 = d3.graphScroll()
		    .container(d3.select('.container-2'))
		    .graph(d3.selectAll('container2 #responsesChart'))
		    .eventId('uniqueId2')  // namespace for scroll and resize events
		    .sections(d3.selectAll('.container-2 #sections2 > div'))
		    .offset(innerWidth < 900 ? innerHeight - 30 : 500)
		    .on('active', function(i){
		    	var dataStory=dataPosResponses[i].filter(function(d){return d.value!="NA"})
				xScaleResponses.domain(dataStory.sort(function(a, b) { return parseFloat(a.value)- parseFloat(b.value);}).map(function(d) { return d.Country }))
				
				responsesChart.select(".x").transition().duration(600).call(d3.axisBottom(xScaleResponses));
				
				resplollipopsCircle.data(dataPosResponses[i])
						.transition()
						.duration(600)     
				        .attr("cy", function(d) {
				         	if(d.value!="NA")
				            	return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				            else
				            	return "-10";
				        })
				        .attr("cx", function(d) {
				         	if(d.value!="NA")
				            	return yScale(d.value);
				            else 
				            	return "-10";
				        })
				        .attr("fill",colorDim(colorResponses[i]));

				resplollipopsText.data(dataPosResponses[i])
						.transition()
						.duration(600)     
						.attr("dy", function(d) {
							         	if(d.value=="NA")
							         		return "-10";
							         	else
							         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				        })
				        .attr("dx", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
				        })
				        .text( function(d){
				         	return d.Country;
				        })
	        			.attr("fill",colorDim(colorResponses[i]))

				resplollipopsLine.data(dataPosResponses[i])
						.transition()
						.duration(600) 
						.attr("y1", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				         })
			            .attr("y2", function(d) {
				         	if(d.value=="NA")
				         		return "-10";
				         	else
				         		return xScaleResponses(d.Country)+xScaleResponses.bandwidth() / 2;
				         })
				         .attr("x1", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(0);
				         })
				         .attr("x2", function(d) {
				         	if(d.value=="NA")
				            	return "-10";
				            else 
				            	return yScale(d.value);
		         		})			
	         			.attr("stroke",colorDim(colorResponses[i])) 

				responsesChart.select("#chartGuideResponses")
		    			.html(guideResponses[i]);         
		         	         
		      })
		
	}    

}