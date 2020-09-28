// Data Receiving

var dataObj = recieve_data();
function recieve_data()
{
	let dataObj = JSON.parse(localStorage.getItem("myObj1"));
	// localStorage.clear();
	return dataObj;
}

console.log(dataObj);

window.onload = function(){

	for(let i=0;i<dataObj.init_obj.queCount;i++)
	{
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id","chartContainer" + (i+1).toString());
		canvas.setAttribute("style","height: 300px; width: 100%;");
		document.getElementById("start").appendChild(canvas);
	}
	var chartDataObjArr = new Array();
	var chartDataObj = new Object();

	for(let i=0;i<dataObj.init_obj.queCount;i++)
	{
		for(let j = 0;j<dataObj.init_obj.no_option_arr[i];j++)
		{
			chartDataObj.y = dataObj.userAnswers[i][j].toString();
			chartDataObj.indexLabel = dataObj.init_obj.qa[i][1+j];0
		}
		chartDataObjArr.push(chartDataObj);
	}

	for(let i=0;i<dataObj.init_obj.queCount;i++)
	{	
		var chart = new CanvasJS.Chart("chartContainer" + (i+1).toString(),
		{
			title:{
				text: ("Q" + (i+1).toString())
			},
			legend: {
				maxWidth: 350,
				itemWidth: 120
			},
			data: [
			{
				type: "pie",
				showInLegend: true,
				legendText: "{indexLabel}",
				dataPoints: chartDataObjArr
			}
			]
		});
		chart.render();
	}
}

