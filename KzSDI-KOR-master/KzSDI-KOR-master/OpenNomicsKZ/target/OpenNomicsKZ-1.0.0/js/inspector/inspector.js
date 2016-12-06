$(document).ready(function() {
	selectInspectorList();
});


function selectInspectorList(no){
		var pageNum = 1;
		if(no!=null){
			pageNum=no;
		}
		
		var url=CONTEXT+"/receipt/selectInspectorList.ajax";
		var params ={
			pageNum : pageNum	
		};
		sendJsonRequest(url, params, insListCallback);
}

var insList = null;
function insListCallback(result) {
		insList = result.list;
		var pageCounts = result.count;
		closePop();
		$('#tableBody > tr').remove();
		$('#pageCountView > a').remove();
		for ( var obj in insList) {
			if(insList[obj].stts==1){
			$('#tableBody').append(
					"<tr>" +
					"<td>" + insList[obj].rid + "</td>" +
					"<td>" + insList[obj].uid + "</td>" +
					"<td>" + insList[obj].utype + "</td>" +
					"<td>" + insList[obj].jname + "</td>" +
					"<td>" + insList[obj].jcontent + "</td>"+ 
					"<td>" + foo(insList[obj].cdate) + "</td>"+ 
					"<td>" + "<input type='button' class='bigButton' name='btnQA"+obj+"' id ='btnQA"+obj+"'value='확인' onclick='qaMapLoad("+""+obj+""+")';>" + "</td>"+				
					"</tr>");
			}
			else{
			$('#tableBody').append(
					"<tr>" +
					"<td>" + insList[obj].rid + "</td>" +
					"<td>" + insList[obj].uid + "</td>" +
					"<td>" + insList[obj].utype + "</td>" +
					"<td>" + insList[obj].jname + "</td>" +
					"<td>" + insList[obj].jcontent + "</td>"+ 
					"<td>" + foo(insList[obj].cdate) + "</td>"+ 
					"<td>" + "<input type='button' class='bigButton' name='btnQA"+obj+"' id ='btnQA"+obj+"'value='확인' disabled='disabled' style='background-color: rgb(154, 160, 167)' onclick='qaMapLoad("+""+obj+""+")';>" + "</td>"+				
					"</tr>");
			}
		}
		for (var i = 1; i <= pageCounts; i++) {
			$('#pageCountView').append(
					"<a href='javascript:selectInspectorList(" + i + ")'>" + "<font size='3px' style='padding-right:10px'>" + i + "</font>" + "</a>");
		}
}

function qaMapLoad(obj){
	var params = {
			rid : insList[obj].rid,
			tname : insList[obj].tname
		};
		getToUrl(CONTEXT + "/layer/qaStart.do", params, "_self");
}


