function opacityIndicator(value,country,topicSel){

	var selectedInd=[];

  		data_sort.forEach(function(k) {
    		if (k.Country != "OECD") {
        		selectedInd.push(k[topicSel]);
    		}
		});
	var ref = percentRank(selectedInd,value);
  	//console.log(percentRank(selectedInd,value));
  if(topicSel=="Emp" || topicSel=="EmpFTI" || topicSel=="EarnQual")	{
    if(ref<1/3)
  		return 0.33;
  	else if (ref>=1/3 & ref<2/3)
  		return 0.66;
  	else
  		return 1;
  } else {
      if(ref<1/3)
        return 1;
      else if (ref>=1/3 & ref<2/3)
        return 0.66;
      else
        return 0.33;
  }
}

function percentRank(array, n) {
	//function by scottyli:https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2 + https://gist.github.com/scottyli
    var L = 0;
    var S = 0;
    var N = array.length

    for (var i = 0; i < array.length; i++) {
        if (parseFloat(array[i]) < n) {
            L += 1
        } else if (parseFloat(array[i]) === n) {
            S += 1
        } else {

        }
    }

    var pct = (L + (0.5 * S)) / N

    return pct
}