// Data Receiving

var dataObj = recieve_data();
function recieve_data()
{
	let dataObj = JSON.parse(localStorage.getItem("myObj"));
	// localStorage.clear();
	return dataObj;
}

// Logic for take_test creation start's here...

//initializing array 2-D for storing choices...
var finalAnswerArray = new Array(dataObj.queCount);
var k = 0;

for(k=0;k<dataObj.queCount;k++)
{
	finalAnswerArray[k] = new Array(dataObj.no_option_arr[k]);
}

for(let i =0;i<dataObj.queCount;i++)
{
	for(let j=0;j<dataObj.no_option_arr[i];j++)
	{
		finalAnswerArray[i][j] = 0;
	}
}

//candidate count...

var candidate_cnt = 0;

//creating questions...

var i = 0;
var j = 0;
console.log(dataObj);

for(i=0;i<dataObj.queCount;i++)
{
	var form = document.createElement("form");
	// var span = document.createElement("span");
	// span.innerHTML = "Q" + (i+1).toString() + " ";
	// form.appendChild(span);

	var question = document.createElement("p");
	question.innerHTML = "Q" + (i+1).toString() + "> " + dataObj.qa[i][0];
	form.appendChild(question);

	for(j=0;j<dataObj.no_option_arr[i];j++)
	{
		var option = document.createElement("input");
		option.setAttribute("type","radio");
		option.setAttribute("name","r_btns" + (i+1).toString());
		option.setAttribute("id","O" + (j+1).toString());
		form.appendChild(option);

		var label = document.createElement("label");
		label.setAttribute("for","O" + (j+1).toString());
		label.innerHTML = dataObj.qa[i][1+j];
		form.appendChild(label);

		var newLine = document.createElement("br");
		form.appendChild(newLine);
	}

	document.getElementById("start").appendChild(form);
}


// submit answers 

document.getElementById("submit_answer_form_btn").addEventListener("click",calSendVotes);

function calSendVotes()
{
	var i = 0;
	var j = 0;
	candidate_cnt++;
	for(i=0;i<document.forms.length;i++)
	{
		for(j=0;j<document.forms[i].length;j++)
		{
			if(document.forms[i][j].checked)
			{
				var str_choice_no = document.forms[i][j].nextSibling.htmlFor;
				finalAnswerArray[i][parseInt(str_choice_no.trim().slice(1))-1] += 1;
			}
		}
	}
	// console.log(finalAnswerArray);
	for(i=0;i<document.forms.length;i++)
	{
		document.forms[i].reset();
	}
	// console.log(candidate_cnt);

	//converting into JSON Object...
	var obj_convert = new Object();
	obj_convert.userAnswers = finalAnswerArray;
	obj_convert.no_candidates = candidate_cnt;
	obj_convert.init_obj = dataObj;
	send_data(obj_convert);
}

function send_data(obj)
{
	// console.log(obj);
	let serializedObj = JSON.stringify(obj);
	localStorage.setItem("myObj1",serializedObj);
}