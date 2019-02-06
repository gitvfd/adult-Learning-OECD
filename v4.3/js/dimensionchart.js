function createDashboard(urgencyData, participationData, inclusivenessData, financingData, qualityData, alignmentData, flexiguidanceData){

    /////////////////////////////////////
    /////////////////////////////////////
    /**        Set up SVGs            **/
    /////////////////////////////////////
    /////////////////////////////////////

    chartDash = d3.select("#viz")
        .append("svg")
        .attr("width", overallwidthDash);

    titleDash = d3.select("#title")
        .append("svg")
        .attr("width", overallwidthDash)
        .attr("height", window.innerHeight / 12.5)
        .style("background","none");



    var dataDash=[];
    urgencyData.forEach(function(d){
        dataDash.push({ 'Country': d.Country })
    })

    dataDash.forEach(function(d){
        urgencyData.forEach(function(k){
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.urgencyData = k.value;
                else
                    d.urgencyData = "0";
            }
        })
        
        participationData.forEach(function (k) {
            if (k.Country == d.Country){
                if(k.value!="NA")
                    d.participationData = k.value;
                else
                    d.participationData = "0";
            }
        })
        inclusivenessData.forEach(function (k) {
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.inclusivenessData = k.value;
                else
                    d.inclusivenessData = "0";
            }
        })
        financingData.forEach(function (k) {
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.financingData = k.value;
                else
                    d.financingData = "0";
            }
        })
        qualityData.forEach(function (k) {
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.qualityData = k.value;
                else
                    d.qualityData = "0";
            }
        })
        alignmentData.forEach(function (k) {
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.alignmentData = k.value;
                else
                    d.alignmentData = "0";
            }
        })
        flexiguidanceData.forEach(function (k) {
            if (k.Country == d.Country) {
                if (k.value != "NA")
                    d.flexiguidanceData = k.value;
                else
                    d.flexiguidanceData = "0";
            }
        })

    })
    
    /** Set up scales **/
    xUrgency.domain([0, d3.max(urgencyData, function (d) { return parseFloat(d.value); })]);
    xCoverage.domain([0, d3.max(participationData, function (d) { return parseFloat(d.value); })]);
    xInclusiveness.domain([0, d3.max(inclusivenessData, function (d) { return parseFloat(d.value); })]);
    xFinancing.domain([0, d3.max(financingData, function (d) { return parseFloat(d.value); })]);
    xQuality.domain([0, d3.max(qualityData, function (d) { return parseFloat(d.value); })]);
    xAlignment.domain([0, d3.max(alignmentData, function (d) { return parseFloat(d.value); })]);
    xFlexiguidance.domain([0, d3.max(flexiguidanceData, function (d) { return parseFloat(d.value); })]);
     
    var maxLengthDash = d3.max([urgencyData.length, participationData.length, inclusivenessData.length, financingData.length, qualityData.length, alignmentData.length, flexiguidanceData.length])
    barHeightDash = window.innerHeight / (1.5*maxLengthDash);
    chartDash.attr("height", barHeightDash * maxLengthDash);


    /** rectangle to underline selected country**/
    chartDash.append("rect")
        .attr("class", "highlight")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", overallwidthDash)
        .attr("height", barHeightDash)
        .attr("fill", selCounColor)
        .attr("opacity", 0.75)
        .attr("visibility", "hidden");
        
    var barDash = chartDash.selectAll("bar")
        .data(dataDash)
        .enter();


    barDash.append("text")
        .attr("class", "Name")
        .attr("id", function (d) { return d.Country; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("dy", "0.75em")
        .text(function (d) { return d.Country; })

    barDash.append("rect")
        .attr("class", function (d) { return "UrgencyDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 1 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) { 
            if (d.urgencyData!="NA") 
                return xUrgency(parseFloat(d.urgencyData)); 
            else 
                return 0; 
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Urgency");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });


    barDash.append("rect")
        .attr("class", function (d) { return "CoverageDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 2 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.participationData != "NA")
                return xCoverage(parseFloat(d.participationData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Coverage");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });
        
    barDash.append("rect")
        .attr("class", function (d) { return "InclusivenessDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 3 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.inclusivenessData != "NA")
                return xInclusiveness(parseFloat(d.inclusivenessData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Inclusiveness");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });

    barDash.append("rect")
        .attr("class", function (d) { return "FlexiguidanceDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 4 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.flexiguidanceData != "NA")
                return xFlexiguidance(parseFloat(d.flexiguidanceData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Flexiguidance");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });


    barDash.append("rect")
        .attr("class", function (d) { return "AligmentDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 5 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.alignmentData != "NA")
                return xAlignment(parseFloat(d.alignmentData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Alignment");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });
        
    barDash.append("rect")
        .attr("class", function (d) { return "QualityDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 6 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.qualityData != "NA")
                return xAlignment(parseFloat(d.qualityData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Quality");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });


    barDash.append("rect")
        .attr("class", function (d) { return "FinancingDash" + " " + d.Country.replace(/\s+/g, ''); }) //remove space fro name to facilitate selection
        .attr("x", 7 * widthDash)
        .attr("y", function (d, i) { return i * barHeightDash; })
        .attr("width", function (d) {
            if (d.financingData != "NA")
                return xFinancing(parseFloat(d.financingData));
            else
                return 0;
        })
        .attr("height", barHeightDash - 1)
        .attr("fill", function (d) {
            if (d.Country == "OECD") {
                return "#0B1E2D"
            } else {
                return colorDim("Financing");
            }
        })
        .attr("opacity", function (d) {
            //return opacityIndicator(d.Emp, d.Country, "Emp");
        });


    addTitle(); // add the indicators title
    sortchartDash("Country"); //Start with


    barDash.selectAll("rect")
        .on("mouseover",function (d){

            d3.selectAll(".highlight")
                .attr("y", d3.select(this).attr("y"))
                .attr("visibility", "visible");

            var indicator = d3.select(this).attr("class")
            indicator = indicator.split(' ')[0]
            var value;
            if (indicator == "UrgencyDash") value = d.urgencyData;
            if (indicator == "CoverageDash") value = d.participationData;
            if (indicator == "InclusivenessDash") value = d.inclusivenessData;
            if (indicator == "FinancingDash") value = d.financingData;
            if (indicator == "QualityDash") value = d.qualityData;
            if (indicator == "AligmentDash") value = d.alignmentData;
            if (indicator == "FlexiguidanceDash") value = d.flexiguidanceData;
            tooltip.html("<div style='font-size: 11px; text-align: center;'><span style='font-weight:bold'>" + d.Country + "</span><br/><span><i>" + Math.round(value*100)/100 + "</i><span ></div>");
            tooltip.style("visibility", "visible");
        })

        .on("mousemove", mousemove)
        .on("mouseout", function (d){

            d3.selectAll(".highlight")
                .attr("visibility", "hidden");

            tooltip.style("visibility", "hidden")
        });
}













/////////////////////////////////////
/////////////////////////////////////
/**         Add Titles            **/
/////////////////////////////////////
/////////////////////////////////////

function addTitle() {


    d3.json("data/def.json", function (data) {
        var headers = titleDash.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", function (d) {
                return d.code;
            })
            .attr("transform", function (d, i) { return "translate(" + i * widthDash + "," + marginDash + ")"; });


         headers.append("rect")
            .attr("class", function (d) {
                return d.code + " " + "headingTitleBox";
            })
            .attr("width", widthDash - 2 * marginDash)
            .attr("height", "2.5em")
            .attr("fill", function (d) {
                if(d.dim=='Country')
                    return "#fff"
                else if (d.dim == 'Participation')
                    return colorDim('Coverage')
                else
                    return colorDim(d.dim)
            })
            .attr("opacity", 0.65);


        var Titles;

        if (!Modernizr.svgforeignobject) {

            Titles = headers.append("text")
                .attr("class", "headingTitle")

                .append('tspan')
                .attr('x', 0)
                .attr('y', "1em")
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', window.innerHeight / 10)
                .text(function (d, i) { return d.dim.split(" ")[0]; })
                .append('tspan')
                .attr('x', 0)
                .attr('y', "2em")
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', window.innerHeight / 10)
                .text(function (d, i) { return d.dim.split(" ")[1]; })
                .append('tspan')
                .attr('x', 0)
                .attr('y', "3em")
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', window.innerHeight / 10)
                .text(function (d, i) { return d.dim.split(" ")[2]; })
                .append('tspan')
                .attr('x', 0)
                .attr('y', "4em")
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', window.innerHeight / 10)
                .text(function (d, i) { return d.dim.split(" ")[3]; })
                .append('tspan')
                .attr('x', 0)
                .attr('y', "5em")
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', window.innerHeight / 10)
                .text(function (d, i) { return d.dim.split(" ")[4]; });



        } else {
            Titles = headers.append('foreignObject')
                .attr("class", "headingTitle")
                //.attr('x', 0)
                //.attr('y', 0)
                .attr('width', widthDash - 2 * marginDash)
                .attr('height', "1em")
                //.attr("requiredFeatures","http://www.w3.org/1999/xhtml")
                //.append("xhtml:body")
                //.attr("xmlns","http://www.w3.org/1999/xhtml")
                //.append("p")
                .attr("class", "headingTitle")
                .text(function (d, i) { return d.dim; });
        }

        headers.append("image")
            .attr('x', 0.98 * (widthDash - 2 * marginDash) - widthDash / 5)
            .attr('y', "0.5em")
            .attr("xlink:href", function (d) {
                if (d.code != "cou")
                    return "img/chevron-small-down.svg";
            })
            .attr("fill", "#979797")
            .attr("width", widthDash / 5)
            .attr("height", widthDash / 5)

        headers.selectAll("foreignObject")
            .on("mouseover", function (d){

                tooltip.html("<div style='font-size: 13px; text-align: center;'><span style='font-weight:bold'>" + d.dim + "</span><br/><span><i>" + d.Definition + "</i><span ></div>");
                tooltip.style("visibility", "visible");
            })
            .on("mousemove", mousemove)
            .on("mouseout", mouseout);


        headers.selectAll("rect")
            .on("click", function (d) {
                if (d.code != "cou")
                    sortchartDash(d.code)
            });

        headers.selectAll("foreignObject")
            .on("click", function (d) {
                if (d.code != "cou")
                    sortchartDash(d.code)
            });


        headers.selectAll("image")
            .on("click", function (d) {
                if (d.code != "cou")
                    sortchartDash(d.code)
            });

    });





}

