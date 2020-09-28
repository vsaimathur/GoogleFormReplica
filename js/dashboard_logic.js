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
	var chartDataArr = new Array();
	var chartLabelArr = new Array();

	for(let i=0;i<dataObj.init_obj.queCount;i++)
	{
		var tempDataArr = new Array();
		var tempLabelArr = new Array();
		for(let j = 0;j<dataObj.init_obj.no_option_arr[i];j++)
		{
			tempDataArr.push(dataObj.userAnswers[i][j].toString());
			tempLabelArr.push(dataObj.init_obj.qa[i][1+j]);
		}
		chartDataArr.push(tempDataArr);
		chartLabelArr.push(tempLabelArr);
	}

	for(let i=0;i<dataObj.init_obj.queCount;i++)
	{	
		var ctx = document.getElementById("chartContainer" + (i+1).toString()).getContext('2d');
		var mychart = new Chart(ctx,
		{
			type : "pie",
			data : 
			{
				labels : chartLabelArr[i],
				datasets : [{
				
					data : chartDataArr[i],
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255, 99, 132, 1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
				}]
			},
			options: {
		        title: {
		            display: true,
		            text: "Q" + (i+1).toString() + " Poll Results"
		        }
    }

		});
	}
}

