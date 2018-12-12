var screenWidth=window.innerWidth;
var chartWidth=document.getElementById("chart").offsetWidth;

var width="";
var counter=1;

while(width==""){
	if((chartWidth/counter)>150 && (chartWidth/counter)<200)
		width= Math.round(chartWidth/counter)-4.5;
	counter++;
	if(counter>50)
		width=195;

}

var height = 150;

var margin=100;
var padding = 0;

var colorDim = d3.scaleOrdinal()
	.domain([ "urgency", "participation", "inclusiveness","alignment","financing","flexiguidance","quality"])
	.range(["#AB3A2C","#DE6736","#DB8870","#51628E","#2B5275","#1D6962","#d0a039"])







//Settings pearlCharts
var overallwidth=0.9*screenWidth;
var widthBar=0.55*screenWidth;
var heightPearl=60;
var heightBar=90;
var sideMargin=overallwidth/5;
var marginLeft=sideMargin;
var marginRight=sideMargin;

var marginBar=5;
var formatNumber = d3.format(".0f");
var format= d3.format(",.1f");





function pickSector(topicSelected){
	var color;
	indicators_metadata.forEach(function(d){
		if(d.Indicator_code==topicSelected) {
			color= (d.Dimension).toLowerCase();
			}
	})
	return color;
	
};

function returnName(topicSelected){
	var name;
	indicators_metadata.forEach(function(d){
		if(d.Indicator_code==topicSelected) {
			name = d.Indicator;
		}
	})
	return name;
};

var xPearl = d3.scaleLinear()
    .rangeRound([marginLeft, overallwidth-marginRight]);
// end settings pearl charts


var xBar = d3.scaleBand()
    .range([marginBar, widthBar-marginBar])
    .padding(0.1);;

var yBar = d3.scaleLinear()
    .range([heightBar-marginBar, marginBar]);


var tooltip = d3.select("body")
   .append("div")
   .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
	.style("color", "#474747")
    .style("padding", "8px")
    .style("background-color", "#f0f0f0")
	.style("border-radius", "3px")
    .style("font", "11")
	.style("font-family", "Quattrocento Sans")
	.style("text-anchor", "middle")
	.text("");  

var mousemove = function() {
      		return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
  		}

var mouseout = function(){return tooltip.style("visibility", "hidden");} 

var radiusScale = d3.scaleSqrt().domain([0, 1]).range([0, 25])

var forceXSplit = d3.forceX(d => width * ((d.dim === "urgency" || d.dim === "participation" || d.dim === "inclusiveness" ) ? 0.2 : 0.8))
        .strength(0.2);

var forceXCombine = d3.forceX((width)/2).strength(0.1)

var forceCollide = d3.forceCollide(function(d){
		return radiusScale(d.value) + 1
	})
	.iterations(10);

var simulation = d3.forceSimulation()
	.force("x", forceXCombine)
	.force("y", d3.forceY((height / 3) + 10).strength(0.15))
	//.force("center", d3.forceCenter(width / 2, height / 2))
	.force("collide", forceCollide);


//Urgency line
var y = d3.scaleLinear().range([0,8/10*height]).domain([0, 1]);


//Load Indicators guide
var indicators_metadata=[]
d3.tsv("data/indicator_guide.tsv",function(data){
	data.forEach(function(d){
		indicators_metadata.push(d);
	})
})


//Data to load
var urls = {
alignment: "data/alignment_wide.tsv",
financing: "data/financing_wide.tsv",
flexiguidance: "data/flexiguidance_wide.tsv",
inclusiveness: "data/inclusiveness_wide.tsv",
participation: "data/participation_wide.tsv",
quality: "data/quality_wide.tsv",
urgency: "data/urgency_wide.tsv"

};

d3.queue()
.defer(d3.tsv, urls.alignment)
.defer(d3.tsv, urls.financing)
.defer(d3.tsv, urls.flexiguidance)
.defer(d3.tsv, urls.inclusiveness)
.defer(d3.tsv, urls.participation)
.defer(d3.tsv, urls.quality)
.defer(d3.tsv, urls.urgency)
.await(loadData);

var alignment=[];
var financing=[];
var flexiguidance=[];
var inclusiveness=[];
var participation=[];
var quality=[];
var urgency=[];

function loadData(err,alignmentTemp,financingTemp,flexiguidanceTemp,inclusivenessTemp,participationTemp,qualityTemp,urgencyTemp){
alignmentTemp.forEach(function(d){
	alignment.push(d);
})
financingTemp.forEach(function(d){
	financing.push(d);
})
flexiguidanceTemp.forEach(function(d){
	flexiguidance.push(d);
})
inclusivenessTemp.forEach(function(d){
	inclusiveness.push(d);
})
participationTemp.forEach(function(d){
	participation.push(d);
})
qualityTemp.forEach(function(d){
	quality.push(d);
})
urgencyTemp.forEach(function(d){
	urgency.push(d);
})
render(err,alignmentTemp,financingTemp,flexiguidanceTemp,inclusivenessTemp,participationTemp,qualityTemp,urgencyTemp);
}

var dimension=[];

//document.getElementById("country_dropdown").addEventListener("change",function(){console.log("test")})
//document.getElementById("country_dropdown").addEventListener("change",loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency));

function render(err,alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency){


	d3.map(alignment, function(d){return d.Country;}).keys().forEach(function(d){dimension.push({'Country':d});})

	alignment.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.alignment=d.value;
				}
			})
		}
	})
	financing.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.financing=d.value;
				}
			})
		}
	})
	flexiguidance.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.flexiguidance=d.value;
				}
			})
		}
	})
	inclusiveness.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.inclusiveness=d.value;
				}
			})
		}
	})
	participation.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.participation=d.value;
				}
			})
		}
	})
	quality.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.quality=d.value;
				}
			})
		}
	})
	urgency.forEach(function (d){
		if(d.variable=="Total"){
			dimension.forEach(function(k){
				if(k.Country==d.Country){
					k.urgency=d.value;
				}
			})
		}
	})


	dimension.forEach(function(d){

	/// Adding SVG	

		var svg = d3.select("#chart")
			.append("svg")
			.attr("height", height)
			.attr("width", width)
			.append("g")
			.attr("transform", "translate(0,0)")

		var country2display= d.Country
		//var data2display=[{"dim":"alignment","value":d.alignment},{"dim":"financing","value":d.financing},{"dim":"flexiguidance","value":d.flexiguidance},{"dim":"inclusiveness","value":d.inclusiveness},{"dim":"participation","value":d.participation},{"dim":"quality","value":d.quality},{"dim":"urgency","value":d.urgency}]
		var data2display=[{"dim":"alignment","value":d.alignment},{"dim":"financing","value":d.financing},{"dim":"flexiguidance","value":d.flexiguidance},{"dim":"inclusiveness","value":d.inclusiveness},{"dim":"participation","value":d.participation},{"dim":"quality","value":d.quality}] //no urgency



		// Urgency Bar
		if(d.urgency!="NA"){
	      	//Adding the Urgency bars
	      	svg.append("rect")
		      .attr("class", "urgencyBcgd")
		      .attr("x", 0)
		      .attr("y", 0)
		      .attr("width", width  )
		      /**.attr("width", 0.325*width  )**/
		      .attr("height", 	10/10*height)
		      .attr("fill","#afbfc8")
		      //.attr("fill", "url(#svgGradient)")
		      .attr("opacity",0.75);
		    
		    svg.selectAll(".bar")
		      .data([d.urgency]	)
		    	.enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", 0.05 * width )
		      .attr("width", 1.75*width/20)
		      .attr("y", 0)
		      .attr("height", function(d) { return y(d); })
		      .attr("fill","#AB3A2C")
				.on("mouseover", function(d) {

					var explanation
					if (d.value<1/3)
						explanation= country2display + " is among the countries facing the lowest <b>" + "urgency" + "</b>";
					else if((d.value>=2/3))
						explanation= country2display + " is among the countries facing the highest <b>" + "urgency" + "</b>";
					else
						explanation= country2display + " is among the countries facing an average level of <b>" + "urgency" + "</b>";

			              tooltip.html("<br>"+explanation+"<br><br> score: " + d3.format(".2")(d));
			              tooltip.style("visibility", "visible");
			      })
			    .on("mousemove", mousemove)
			   	.on("mouseout", mouseout);
			

		}

		/// Force settings	
		var forceXSplit = d3.forceX(d => width * ((d.dim === "urgency" || d.dim === "participation" || d.dim === "inclusiveness" ) ? 0.3 : 0.7))
		        .strength(0.2);

		var forceXCombine = d3.forceX((1.75*width)/3).strength(0.1)

		var forceCollide = d3.forceCollide(function(d){
				return radiusScale(d.value) + 1
			})
			.iterations(10);

		var simulation = d3.forceSimulation()
			.force("x", forceXCombine)
			.force("y", d3.forceY((height / 3) + 10).strength(0.15))
			//.force("center", d3.forceCenter(width / 2, height / 2))
			.force("collide", forceCollide);

		

		/// Node Creation	
		var circles = svg.selectAll(".dim")
		.data(data2display)
		.enter().append("circle")
		.attr("class", "dimension")
		.attr("r", function(d){
			if(d.value!="NA")
				return radiusScale(parseFloat(d.value))
			else
				return 0
		})
		.style("fill", d => colorDim(d.dim))
		.on("mouseover", function(d) {
			var dimensionSet=d.dim;


			if(d.dim=="participation")
				dimensionSet="coverage"

			if(d.dim=="flexiguidance")
				dimensionSet="flexibility and guidance"

			var explanation
			if (d.value>=2/3)
				explanation= country2display + " is among the top performers in the area of <b>" + dimensionSet + "</b>";
			else if((d.value<1/3))
				explanation= country2display + " is among the bottom performers in the area of <b>" + dimensionSet + "</b>";
			else
				explanation= country2display + " is among the middle performers in the area of <b>" + dimensionSet + "</b>";

	              tooltip.html("<br>"+explanation+"<br><br> score: " + d3.format(".2")(d.value));
	              tooltip.style("visibility", "visible");
	      })
	    .on("mousemove", mousemove)
	   	.on("mouseout", mouseout);

		simulation.nodes(data2display)
			.on('tick', ticked)


		function ticked() {
			circles
				.attr("cx", function(d) {
					return d.x
				})
				.attr("cy", function(d) {
					return d.y
				})
		}	



		/// Country Title	
	 	var countryTitle = svg.append("text")
	 			.attr("class", "titles")
	 			.attr("x", width/2)
	 			.attr("y", (height * (9/10)))
	 			.style("text-anchor", "middle")
	 			.attr("font-family", 'Quattrocento')
	 			.text(country2display)
	 			.on("click",function(){
	 				document.getElementById("countryStatsView").click();
	 				document.getElementById("country_dropdown").value =country2display;
					//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value=country2display;
					//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].innerHTML=country2display;
	 				loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency)
	 			})


	})
	
/// launch storyTelling	
	renderStory(alignment.filter(function(d){return d.variable=="Total"}),financing.filter(function(d){return d.variable=="Total"}),flexiguidance.filter(function(d){return d.variable=="Total"}),inclusiveness.filter(function(d){return d.variable=="Total"}),participation.filter(function(d){return d.variable=="Total"}),quality.filter(function(d){return d.variable=="Total"}),urgency.filter(function(d){return d.variable=="Total"}))		    		
/// launch pearcharts creation
	loopOverIndicators(alignment,financing,flexiguidance,inclusiveness,participation,quality,urgency)
//  
pearlchart("Urgency",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,urgency.filter(function(d){return d.variable=="Total"}))
pearlchart("Coverage",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,participation.filter(function(d){return d.variable=="Total"}))
pearlchart("Inclusiveness",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,inclusiveness.filter(function(d){return d.variable=="Total"}))
pearlchart("Financing",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,financing.filter(function(d){return d.variable=="Total"}))
pearlchart("Quality",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,quality.filter(function(d){return d.variable=="Total"}))
pearlchart("Alignment",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,alignment.filter(function(d){return d.variable=="Total"}))
pearlchart("Flexiguidance",document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value,flexiguidance.filter(function(d){return d.variable=="Total"}))

}
window.onresize = function(){ location.reload(); }

