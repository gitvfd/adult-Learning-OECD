	function dimDesc(indicatorname,data){
		var ind2display = indicatorname.replace('_Desc', '');

		var ind2check = indicatorname.replace('_Desc', 'Data');
		
		dimDef.forEach(function(d){
			if (d.code.toLowerCase() == ind2check.toLowerCase()){
				console.log(ind2display)
				console.log(colorDim(ind2display))
				document.getElementById("titleDesc").innerHTML = d.dim;
				d3.select("#titleDesc").style("color",colorDim(ind2display))
				document.getElementById("explainDesc").innerHTML = d.longText;
			}
		})

		var guideStart2display,guideEnd2display;

		dimGuides.forEach(function (d) {
			if (d.dimGuide.toLowerCase() == ind2check.toLowerCase()){
				guideStart2display = d.guides[0];
				guideEnd2display = d.guides[1];
			}
		})

		if (screenWidth > 800) {

			var heightChart = 0.5 * window.innerHeight;
			var xScale = d3.scaleBand()
				.domain(data.filter(function (d) { return d.value != "NA" }).sort(function (a, b) { return parseFloat(a.value) - parseFloat(b.value); }).map(function (d) { return d.Country }))
				.range([margin, screenWidth - margin / 2])
				.padding(padding);

			var yScale = d3.scaleLinear()
				.domain([0, 1])
				.range([heightChart - margin, margin / 3]);
			
			var dimDescChart = d3.select('#vizDesc').html('')
				.append('svg')
				.attrs({ width: screenWidth, height: heightChart })


			var dimDescGuide = dimDescChart.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.append("tspan")
				.attr("id", "chartGuideDimDesc")
				.attr("x", margin)
				.attr("y", heightChart - margin / 10)
				.html(guideStart2display)
			//.call(wrap,0.25*width);

			var dimDescGuideEnd = dimDescChart.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.append("tspan")
				.attr("id", "chartGuideDimDescEnd")
				.attr("x", screenWidth - margin / 2)
				.attr("y", heightChart - margin / 10)
				.html(guideEnd2display)
				.style("text-anchor", "end")


			//Create Y axis
			dimDescChart.append("g")
				.attr("class", "axis y yAxis")
				.attr("transform", "translate(" + margin + ",0)")
				.call(d3.axisLeft(yScale));


		///Lollipop dimDesc
		var lollipopsCircle = dimDescChart.selectAll("circle")
			.data(data)
			.enter().append("circle")
			.attr("class", "lollipopCircle")
			.attr("r", lollipopRadius)
			.attr("cx", function (d) {
				if (d.value === "NA")
					return "-10";
				else
					return xScale(d.Country) + xScale.bandwidth() / 2;
			})
			.attr("cy", function (d) {
				if (d.value === "NA")
					return "-10";
				else
					return yScale(d.value);
			})
			.attr("fill", colorDim(ind2display))
			.on("mouseover", function (d) {
				tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
				tooltip.style("visibility", "visible");
			})
			.on("mousemove", mousemove)
			.on("mouseout", mouseout);


		var lollipopsText = dimDescChart.selectAll("circleText")
			.data(data)
			.enter().append("text")
			.attr("class", "lollipopText")

			.attr("transform", "translate(-3,15)rotate(-90)")
			.attr("dy", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return xScale(d.Country) + xScale.bandwidth() / 2;
			})
			.attr("dx", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return -yScale(d.value);
			})
			.text(function (d) {
				return d.Country;
			})
			.attr("text-anchor", "end")
			.attr("fill", colorDim(ind2display))
			.on("mouseover", function (d) {
				tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
				tooltip.style("visibility", "visible");
			})
			.on("mousemove", mousemove)
			.on("mouseout", mouseout);;;

		var lollipopsLine = dimDescChart.selectAll("circleLine")
			.data(data)
			.enter().append("line")
			.attr("class", "lollipopLine")
			.attr("x1", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return xScale(d.Country) + xScale.bandwidth() / 2;
			})
			.attr("x2", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return xScale(d.Country) + xScale.bandwidth() / 2;
			})
			.attr("y1", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return yScale(0);
			})
			.attr("y2", function (d) {
				if (d.value == "NA")
					return "-10";
				else
					return yScale(d.value);
			})
			.attr("stroke", colorDim(ind2display))
			.attr("stroke-width", "1")
			.on("mouseover", function (d) {
				tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
				tooltip.style("visibility", "visible");
			})
			.on("mousemove", mousemove)
			.on("mouseout", mouseout);;;


		} 
		else {
			var heightChart = window.innerHeight*0.70;

			var xScale = d3.scaleBand()
				.domain(data.filter(function (d) { return d.value != "NA" }).sort(function (a, b) { return parseFloat(a.value) - parseFloat(b.value); }).map(function (d) { return d.Country }))
				.range([heightChart - margin, margin / 3])
				.padding(padding);


			var yScale = d3.scaleLinear()
				.domain([0, 1])
				.range([margin, screenWidth - margin / 2]);


			var dimDescChart = d3.select('#vizDesc').html('')
				.append('svg')
				.attrs({ width: screenWidth, height: heightChart })

		

			var dimDescGuide = dimDescChart.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.append("tspan")
				.attr("id", "chartGuideDimDesc")
				.attr("x", margin)
				.attr("y", heightChart - margin / 2)
				.html(guideStart2display)
			//.call(wrap,0.25*width);

			var dimDescGuideEnd = dimDescChart.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.append("tspan")
				.attr("id", "chartGuideDimDescEnd")
				.attr("x", screenWidth - margin / 2)
				.attr("y", margin /4)
				.html(guideEnd2display)
				.style("text-anchor", "end")


			//Create Y axis
			dimDescChart.append("g")
				.attr("class", "axis y yAxis")
				.attr("transform", "translate(" + margin/4 + ",0)")
				.call(d3.axisTop(yScale));


			///Lollipop dimDesc
			var lollipopsCircle = dimDescChart.selectAll("circle")
				.data(data)
				.enter().append("circle")
				.attr("class", "lollipopCircle")
				.attr("r", lollipopRadius)
				.attr("cy", function (d) {
					if (d.value === "NA")
						return "-10";
					else
						return xScale(d.Country) + xScale.bandwidth() / 2;
				})
				.attr("cx", function (d) {
					if (d.value === "NA")
						return "-10";
					else
						return yScale(d.value);
				})
				.attr("fill", colorDim(ind2display))
				.on("mouseover", function (d) {
					tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", mousemove)
				.on("mouseout", mouseout);


			var lollipopsText = dimDescChart.selectAll("circleText")
				.data(data)
				.enter().append("text")
				.attr("class", "lollipopText")

				.attr("transform", "translate(-10,-3)")
				.attr("dy", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return xScale(d.Country) + xScale.bandwidth() / 2;
				})
				.attr("dx", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return yScale(d.value);
				})
				.text(function (d) {
					return d.Country;
				})
				.attr("text-anchor", "end")
				.attr("fill", colorDim(ind2display))
				.on("mouseover", function (d) {
					tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", mousemove)
				.on("mouseout", mouseout);;;

			var lollipopsLine = dimDescChart.selectAll("circleLine")
				.data(data)
				.enter().append("line")
				.attr("class", "lollipopLine")
				.attr("y1", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return xScale(d.Country) + xScale.bandwidth() / 2;
				})
				.attr("y2", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return xScale(d.Country) + xScale.bandwidth() / 2;
				})
				.attr("x1", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return yScale(0);
				})
				.attr("x2", function (d) {
					if (d.value == "NA")
						return "-10";
					else
						return yScale(d.value);
				})
				.attr("stroke", colorDim(ind2display))
				.attr("stroke-width", "1")
				.on("mouseover", function (d) {
					tooltip.html(d.Country + "<br><br> score: " + d3.format(".2f")(d.value));
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", mousemove)
				.on("mouseout", mouseout);;;
		
		}
    };