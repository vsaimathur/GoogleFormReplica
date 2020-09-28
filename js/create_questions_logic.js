var add_question = document.getElementById('add_q');
var q_count = 0;
var n_optionArr = new Array();
var correctOption = new Array();
// Adding Question

add_question.addEventListener("click",createQuestion);

function createQuestion()
{
	q_count += 1;
	n_optionArr.push(0);
	n_optionArr.push(0);
	var form = document.createElement("form");
	
	var span = document.createElement("span");
	span.innerHTML = "Q" + q_count + " ";
	form.appendChild(span);

	var input = document.createElement("input");
	input.setAttribute("id","Q"+q_count);
	input.setAttribute("type","text");
	input.setAttribute("name","question");

	form.appendChild(input);

	var span1 = document.createElement("span");
	span1.className = "";
	span1.className += "fa fa-plus-circle";
	span1.setAttribute("id","b_plus"+q_count);

	form.appendChild(span1); 

	document.getElementById("start").appendChild(form);

	//creating option when clicked on plus sign span
	span1.addEventListener("click",createOption);

}

function createOption(event)
{
	cur_qno_string = event.currentTarget.parentNode.firstChild.innerHTML;
	// console.log(cur_qno_string);
	cur_qno = parseInt(cur_qno_string.trim().slice(1));
	n_optionArr[cur_qno]++;

	var newline = document.createElement("br");
	event.currentTarget.parentNode.appendChild(newline);

	var radio_b = document.createElement("input");
	radio_b.setAttribute("type","radio");
	radio_b.setAttribute("name","r_btns");
	event.currentTarget.parentNode.appendChild(radio_b);

	var option = document.createElement("input");
	option.setAttribute("id","O"+(n_optionArr[cur_qno]).toString());
	option.setAttribute("type","text");
	event.currentTarget.parentNode.appendChild(option);
	
}


//**VIP -> didn't exactly understand why confirm_send() is working & confirm_send is not for input button.
document.getElementById("create_form_submit_btn").addEventListener("click",confirm_send);
	
	
function confirm_send()
{
	if(confirm("Are You Sure?"))
	{
		var finalObj = store_q_o();
		send_data(finalObj);
		window.location.href = "take_test.html"
	}
}
function store_q_o()
{
	var i = 0;
	// console.log(document.forms[0].question.value);
	// console.log(document.forms[0].value);
	
	//storing option selected 
	for(i=0;i<document.forms.length;i++)
	{
		for(j=0;j<document.forms[i].length;j++)
		{
			if(document.forms[i][j].checked)
			{
				var str_option_no = document.forms[i][j].nextSibling.id;
				// console.log(str_option_no);
				correctOption[i] = parseInt(str_option_no.trim().slice(1));
			}
		}
	}
	// console.log(correctOption);

	//storing questions & options
	var finalArray = new Array();
	for(i=0;i<document.forms.length;i++)
	{
		let question = document.forms[i].question.value;
		// console.log(document.forms[i].question.value);
		let qaSetArray = new Array();
		qaSetArray.push(question);
		for(j=0;j<document.forms[i].length;j++)
		{	
			// console.log(document.forms[i][j].value);
			// console.log(document.forms[i][j].type);

			if(document.forms[i][j].type == "text" && document.forms[i][j].id.trim().slice(0,1) == "O")
			{
				// console.log(document.forms[i][j].value);
				qaSetArray.push(document.forms[i][j].value);
			}
		}
		finalArray.push(qaSetArray);
	}
	// console.log(finalArray);

	// making JSON Object
	var obj_convert = new Object();
	obj_convert.qa = finalArray;
	obj_convert.correct_options = correctOption;
	
	// deleting 1st and last position in array as we dont use them. (as their values are 0 anyway).
	n_optionArr.pop();
	n_optionArr.shift();

	obj_convert.no_option_arr = n_optionArr;	
	obj_convert.queCount = q_count;
	return obj_convert;
}	



function send_data(obj)
{
	// console.log(obj);
	let serializedObj = JSON.stringify(obj);
	localStorage.setItem("myObj",serializedObj);
}