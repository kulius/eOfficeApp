var db;   // 建立全域變數
var db2;   // 建立全域變數
var usernumber;
var userpassword;


$(function()
{
	dbCreate();	// 建立資料庫
	$("#login").bind("click",login); //登入
	$("#out").bind("click",out); //登出
	$("#leaveout").bind("click",out); //登出
	$("#receiveout").bind("click",out); //登出
	$("#receiveout2").bind("click",out); //登出
	$("#home").bind("pageshow", homeread);      // 將 title 欄位資料加入 ListView 清單
	$("#leave").bind("pageshow", leaveread);      // 將 title 欄位資料加入 ListView 清單
	$("#leave_insert").bind("click",leave_insert); //新增
	$("#leave_edit").bind("click",leave_edit); //編輯
	$("#leave_sent").bind("click",leave_sent); //送出簽核
	$("#leave_delete").bind("click",leave_delete); //刪除
	$("#leave_again_delete").bind("click",leave_delete); //刪除
	$("#receive").bind("pageshow", receiveread);
	$("#receive_sent").bind("click",receive_sent); //送出簽核
	$("#receive_back").bind("click",receive_back); //送出簽核
	$("#receive2").bind("pageshow", receiveread2);
	$("#receive2_sent").bind("click",receive2_sent); //送出簽核
	$("#receive2_back").bind("click",receive2_back); //送出簽
	$("#btnDrop").bind("click",dbDrop);     // 刪除資料表
});

// 建立資料庫
function dbCreate()
{  
	db = openDatabase("myDb", "1.0", "eOffice", 2 * 1020 * 1024);           
	if ( db != null )
	{
    	db.transaction(function(t){
        	t.executeSql("create table if not exists eOffice (formid integer primary key ,formdate text ,kind text ,menuitem text ,userid text,username text ,remark text ,remark2 text ,remark3 text ,sdate datetime ,edate datetime ,status text ,checkuser text)");
    	});
	}

}

function showResult(msg) 
{ // 顯示操作訊息
	$("#Result").html(msg+"<br/>");
}
	
function dbDrop() 
{  // 刪除資料表
	db = openDatabase("myDb", "1.0", "eOffice", 2 * 1020 * 1024);
	db.transaction(function(t) {
		t.executeSql("DROP TABLE eOffice");
			showResult("資料表 eOffice 已刪除");
	});
}
	
	
function login() 
{ 
	usernumber = $("#usernumber").val();
	userpassword = $("#userpassword").val();
	
	if (usernumber == "at9001" && userpassword == "1234")
	{		
		$.mobile.changePage("#home", "fade", false, true);
		alert("張小君您好!!");
		$("#usernumber").attr("value", "");
		$("#userpassword").attr("value", "");
	}
	else if (usernumber == "at0101" && userpassword == "1234")
	{		
		$.mobile.changePage("#home", "fade", false, true);
		alert("柯大安您好!!");
		$("#usernumber").attr("value", "");
		$("#userpassword").attr("value", "");
	}
	else if (usernumber == "admin" && userpassword == "1234")
	{		
		$.mobile.changePage("#home", "fade", false, true);
		alert("江老大您好!!");
		$("#usernumber").attr("value", "");
		$("#userpassword").attr("value", "");
	}
	else
	{
		alert("帳號/密碼輸入錯誤!!");
		$("#usernumber").attr("value", "");
		$("#userpassword").attr("value", "");
	}
}


function out()
{
	var flagConfirm=confirm("是否確定登出？"); 
	if(flagConfirm)
	{
		$.mobile.changePage("#index", "slide", false, true);
	}
}

function homeread() {
	var listTitle = $("#homeread");
	var items = [];
	db.transaction(function(t) {
		t.executeSql("select * from eOffice where userid = ? and kind = '請假單' order by formid desc", [usernumber], function(t, result) {	   
				var i, len = result.rows.length,row;
				if (usernumber == "at9001")
				{
					if (len > 0) 
					{
						items.push("<li><a href='#leave'>請假單</a><span class='ui-li-count'>" + len + "</span></li>");
						listTitle.html(items.join('\n'));
						listTitle.listview("refresh");						
					}
					else
					{
						items.push("<li><a href='#leave'>請假單</a><span class='ui-li-count'>0</span></li>");
						listTitle.html(items.join('\n'));
						listTitle.listview("refresh");
					}
				}
		 })
	}); 
	
	db.transaction(function(t) {
		t.executeSql("select * from eOffice where checkuser = ? order by formid desc", [usernumber], function(t, result) {	   
				var i, len2 = result.rows.length,row;
				if (len2 > 0)
				{
					if (usernumber == "admin")
					{
				    	items.push("<li><a href='#receive2'>收件匣</a><span class='ui-li-count'>" + len2 + "</span></li>");
						listTitle.html(items.join('\n'));
						listTitle.listview("refresh");
					}
					else
					{
						items.push("<li><a href='#receive'>收件匣</a><span class='ui-li-count'>" + len2 + "</span></li>");
						listTitle.html(items.join('\n'));
						listTitle.listview("refresh");
					}
				}
				else
				{
					if (usernumber != "at9001")
					{
				    	items.push("<li><a href='#receive2'>收件匣</a><span class='ui-li-count'>0</span></li>");
						listTitle.html(items.join('\n'));
						listTitle.listview("refresh");
					}
				}
		 })	
	});
	/*if (usernumber == "admin")
	{
		items.push("<li><a href='#leave'>請假單</a></li>");
		items.push("<li><a href='#receive2'>收件匣</a></li>");
		listTitle.html(items.join('\n'));
		listTitle.listview("refresh");
	}
	else
	{
		items.push("<li><a href='#leave'>請假單</a></li>");
		items.push("<li><a href='#receive'>收件匣</a></li>");
		listTitle.html(items.join('\n'));
		listTitle.listview("refresh");
	}*/
}

function leaveread()
{
	var listTitle = $("#leaveread");
	var items = [];
	db.transaction(function(t) {
		t.executeSql("select * from eOffice where userid = ? and kind = '請假單' order by formid desc", [usernumber], function(t, result) {	   
				var i, len = result.rows.length,row;
				if (len > 0 ) {
					for (i = 0; i < len; i += 1) {
						row = result.rows.item(i);
						if (row.status == "填寫中")
						{
					    	items.push("<li><a href='#leave_2' data-trnote='" + row.formid + "'>申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");						
						}
						else if (row.status == "呈核")
						{
							items.push("<li><img src='images/view.png' class='ui-li-icon'/><a href='#leave_2_disable' data-trnote='" + row.formid + "'>申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");											
						}
						else if (row.status == "決行")
						{
							items.push("<li><img src='images/yes.png' class='ui-li-icon'/><a href='#leave_2_disable' data-trnote='" + row.formid + "'>申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");											
						}
						else if (row.status == "退文")
						{
							items.push("<li><img src='images/no.png' class='ui-li-icon'/><a href='#leave_2_again' data-trnote='" + row.formid + "'>申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");											
						}
					}
					listTitle.html(items.join('\n'));
					listTitle.listview("refresh");
				}
				else
				{
				items.push("<li><a>目前沒有任何資料</a></li>");
				listTitle.html(items.join('\n'));
				listTitle.listview("refresh");
				}
					// 設定按下 ListView 清單的事件,將 data-trnote 屬性值當作參數傳遞給 getItem()函式，並切換至 display 頁面			
					$("a",listTitle).bind("click", function(e) {					
						leaveget($(this).attr("data-trnote"));
					});		
		 })	 // end of t.executeSql
	}); // end of $.mobile.notesdb
}

function leaveget(formid) {
	db.transaction(function(t) {		
		t.executeSql("select * from eOffice where formid = ?", [formid], function(t, result) {
			var row = result.rows.item(0);
			//$("#display h1").text(row.title);
			if (row.status == "填寫中")
			{
			$("#leaveshow").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "</p>");
			}
			else
			{
				if (row.remark2 == null)
				{
					$("#leaveshow2").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：審核中<br /> 備　　註：暫無<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：簽核流程未達此處<br /> 備　　註：簽核流程未達此處</p>");
				}
				else 
				{
				    if (row.status == "呈核")
					{
						$("#leaveshow2").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：審核中<br /> 備　　註：暫無</p>");
					}
					else if (row.status == "退文" && row.remark3 == null)
					{
						$("#leaveshow2").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：簽核流程未達此處<br /> 備　　註：簽核流程未達此處</p>");
						$("#leaveshow3").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：簽核流程未達此處<br /> 備　　註：簽核流程未達此處</p>");
				    }
					else if (row.status == "決行")
					{
						$("#leaveshow2").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已呈核<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark3 + "</p>");
				    }
					else if (row.status == "退文" && row.remark3 != null)
					{
						$("#leaveshow2").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已呈核<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark3 + "</p>");
						$("#leaveshow3").html("<p>單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "<br /><br />請假單目前簽核狀況：<br />【第一關】<br /> 審核人員：at0101-柯大安<br /> 狀　　態：已呈核<br /> 備　　註：" + row.remark2 + "<br /><br />【第二關】<br /> 審核人員：admin-江老大<br /> 狀　　態：已" + row.status + "<br /> 備　　註：" + row.remark3 + "</p>");
				    }						
				}
			}
			$("#leave_edit ,#leave_delete ,#leave_again_delete ,#leave_sent").attr("data-trnote", formid);
			$("#editmenuitem").val(row.menuitem);
			$("#editsdate").val(row.sdate);
			$("#editedate").val(row.edate);
			$("#editremark").val(row.remark);
		})
	});
}

function leave_insert() 
{ 
	if (usernumber == "at9001")
	{
		var username="張小君"; 
	}
	if (usernumber == "at0101")
	{
		var username="柯大安"; 
	}
	if (usernumber == "admin")
	{
		var username="江老大"; 
	}
	var menuitem=$("#menuitem").val();
	var sdate=$("#sdate").val();
	var edate=$("#edate").val();
	var remark=$("#remark").val();	
	if (menuitem=="請選擇")
	{
		alert("假別尚未選擇!!");
		return false;
	}	
	else if (sdate=="" || edate=="")
	{
		alert("請假日期(起迄)不得為空!!");
		return false;
	}
	else if(sdate > edate)
	{     
        alert("請假日期(起)不得大於請假日期(迄)");     
        return false;       
    }	
	else if (remark=="")
	{
		alert("請假理由不得為空!!");
		return false;	
	}
	else
	{
	db.transaction(function(t) {
		t.executeSql('insert into eOffice (formdate,kind,menuitem,userid,username,remark,sdate,edate,status) VALUES (date("now"),"請假單",?,?,?,?,?,?,"填寫中");',[menuitem,usernumber,username,remark,sdate,edate],
			function() {
				$.mobile.changePage("#leave", "fade", false, true);	//換頁並清除輸入欄位
				//$("#menuitem").val("");
				$("#username").val("");
				$("#sdate").val("");
				$("#edate").val("");
				$("#remark").val("");
			}, 
			null);
		});
	}
}

function leave_edit(formid)
{
	var	formid = $(this).attr("data-trnote");
	var menuitem = $("#editmenuitem").val();
	var sdate = $("#editsdate").val();
	var	edate = $("#editedate").val();
	var	remark = $("#editremark").val();
	if (menuitem=="請選擇")
	{
		alert("假別尚未選擇!!");
		return false;
	}
	else if (sdate=="" || edate=="")
	{
		alert("請假日期(起迄)不得為空!!");
		return false;
	}
	else if(sdate > edate)
	{     
        alert("請假日期(起)不得大於請假日期(迄)");     
        return false;       
    }	
	else if (remark=="")
	{
		alert("請假理由不得為空!!");
		return false;	
	}
	else
	{
		var flagConfirm=confirm("是否確定修改？"); 
		if(flagConfirm)
		{
			db.transaction(function(t) {
				t.executeSql('update eOffice set menuitem = ?, sdate = ?, edate = ?, remark = ? WHERE formid = ?',[menuitem, sdate, edate, remark, formid],$.mobile.changePage("#leave", "fade", false, true),null);
			alert("資料已成功修改!!"); 	
			});
		}
	}
}

function leave_sent(formid)
{
	var flagConfirm=confirm("是否確定送出簽核？"); 
	if(flagConfirm)
	{
		var	formid = $(this).attr("data-trnote");
		db.transaction(function(t) {
			t.executeSql('update eOffice set status = "呈核" ,checkuser = "at0101" ,remark2 = null ,remark3 = null where formid = ?',[formid], $.mobile.changePage("#leave", "fade", false, true),null);
		alert("簽核已成功送往「at0101-柯大安」!!"); 	
		});
	}	
}

function leave_delete(formid)
{
	var flagConfirm=confirm("是否確定刪除？"); 
	if(flagConfirm)
	{
		var formid = $(this).attr("data-trnote");
		db.transaction(function(t) {
			t.executeSql("delete from eOffice where formid = ?", [formid], $.mobile.changePage("#leave", "slide", false, true),null);
		alert("資料已刪除成功!!");				
		});		
	}
	
}

function leave_again_delete(formid)
{
	var flagConfirm=confirm("是否確定刪除？"); 
	if(flagConfirm)
	{
		var formid = $(this).attr("data-trnote");
		db.transaction(function(t) {
			t.executeSql("delete from eOffice where formid = ?", [formid], $.mobile.changePage("#leave", "slide", false, true),null);
		alert("資料已刪除成功!!");				
		});		
	}
	
}

function receiveread() {
	var listTitle = $("#receiveread");
	var items = [];
	db.transaction(function(t) {
		t.executeSql("select * from eOffice where checkuser = ? order by formid desc", [usernumber], function(t, result) {	   
				var i, len = result.rows.length,row;
				if (len > 0 ) {
					for (i = 0; i < len; i += 1) {
						row = result.rows.item(i);
				    	items.push("<li><a href='#receive_2' data-trnote='" + row.formid + "'>單　　別：" + row.kind + "<br />申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");						
					}
					listTitle.html(items.join('\n'));
					listTitle.listview("refresh");
				}
				else
				{
				items.push("<li><a>目前沒有任何資料</a></li>");
				listTitle.html(items.join('\n'));
				listTitle.listview("refresh");
				}
					// 設定按下 ListView 清單的事件,將 data-trnote 屬性值當作參數傳遞給 getItem()函式，並切換至 display 頁面			
					$("a",listTitle).bind("click", function(e) {					
						receiveget($(this).attr("data-trnote"));
					});
		 })	 // end of t.executeSql
	}); // end of $.mobile.notesdb
}

function receiveget(formid) {
	db.transaction(function(t) {		
		t.executeSql("select * from eOffice where formid = ? and checkuser = ?", [formid,usernumber], function(t, result) {
			var row = result.rows.item(0);
			//$("#display h1").text(row.title);
			$("#receiveshow").html("<p>單　　別：" + row.kind + "<br /><br />單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "</p>");
			$("#receive_sent ,#receive_back").attr("data-trnote", formid);
			$("#editmenuitem").val(row.menuitem);
			$("#editsdate").val(row.sdate);
			$("#editedate").val(row.edate);
			$("#editremark").val(row.remark);
		})
	});
}

function receive_sent(formid)
{
	var flagConfirm=confirm("是否確定呈核？"); 
	if(flagConfirm)
	{
		var	formid = $(this).attr("data-trnote");
		var remark2=$("#remark2").val();
		if(remark2=="")
		{
			remark2="無填寫";
		}
		db.transaction(function(t) {
			t.executeSql('update eOffice set status = "呈核" ,remark2 = ? ,checkuser = "admin" where formid = ?',[remark2,formid], $.mobile.changePage("#receive", "fade", false, true),null);		
		$("#remark2").val("");
		alert("簽核已成功送往「admin-江老大」!!");	
		});
	}	 	
}

function receive_back(formid)
{
	var remark2=$("#remark2").val();
	if(remark2==""){
		alert("退文時，請填寫備註(退文原因)!!");
		return false;
	}
	else
	{
		var flagConfirm=confirm("是否確定退文？"); 
		if(flagConfirm)
		{
			var	formid = $(this).attr("data-trnote");
			db.transaction(function(t) {
				t.executeSql('update eOffice set remark2 = ? ,status = "退文" ,checkuser = "" where formid = ?',[remark2,formid], $.mobile.changePage("#receive", "fade", false, true),null);		
			$("#remark2").val("");
			alert("簽核已退文至申請人「at9001-張小君」!!");
			});
		}
	}
}

function receiveread2() {
	var listTitle = $("#receiveread2");
	var items = [];
	db.transaction(function(t) {
		t.executeSql("select * from eOffice where checkuser = ? order by formid desc", [usernumber], function(t, result) {	   
				var i, len = result.rows.length,row;
				if (len > 0 ) {
					for (i = 0; i < len; i += 1) {
						row = result.rows.item(i);
				    	items.push("<li><a href='#receive2_2' data-trnote='" + row.formid + "'>申請人員：" + row.userid + " - " + row.username + "<br />假　　別：" + row.menuitem + "<br />申請日期：" + row.formdate + "<br />請假日期：" + row.sdate + " ~ " + row.edate + "<br />請假理由：" + row.remark + " </a></li>");						
					}
					listTitle.html(items.join('\n'));
					listTitle.listview("refresh");
				}
				else
				{
				items.push("<li><a>目前沒有任何資料</a></li>");
				listTitle.html(items.join('\n'));
				listTitle.listview("refresh");
				}
					// 設定按下 ListView 清單的事件,將 data-trnote 屬性值當作參數傳遞給 getItem()函式，並切換至 display 頁面			
					$("a",listTitle).bind("click", function(e) {					
						receiveget2($(this).attr("data-trnote"));
					});
		 })	 // end of t.executeSql
	}); // end of $.mobile.notesdb
}

function receiveget2(formid) {
	db.transaction(function(t) {		
		t.executeSql("select * from eOffice where formid = ? and checkuser = ?", [formid,usernumber], function(t, result) {
			var row = result.rows.item(0);
			//$("#display h1").text(row.title);
			$("#receiveshow2").html("<p>單　　別：" + row.kind + "<br /><br />單　　號：" + row.formid + "<br /><br />申請人員：" + row.userid + " - " + row.username + "<br /><br />假　　別：" + row.menuitem + "<br /><br />申請日期：" + row.formdate + "<br /><br />請假日期：" + row.sdate + " ~ " + row.edate + "<br /><br />請假理由：" + row.remark + "</p>");
			$("#receive2_sent ,#receive2_back").attr("data-trnote", formid);
			$("#editmenuitem").val(row.menuitem);
			$("#editsdate").val(row.sdate);
			$("#editedate").val(row.edate);
			$("#editremark").val(row.remark);
		})
	});
}

function receive2_sent(formid)
{
	var flagConfirm=confirm("是否確認決行？"); 
	if(flagConfirm)
	{
		var	formid = $(this).attr("data-trnote");
		var remark3=$("#remark3").val();
		if(remark3=="")
		{
			remark3="無填寫";
		}
		db.transaction(function(t) {
			t.executeSql('update eOffice set remark3 = ? ,status = "決行" ,checkuser = "" where formid = ?',[remark3,formid], $.mobile.changePage("#receive2", "fade", false, true),null);		
		$("#remark3").val("");
		alert("簽核已成功決行!!");
		});
	}		
}

function receive2_back(formid)
{
	var remark3=$("#remark3").val();
	if(remark3==""){
		alert("退文時，請填寫備註(退文原因)!!");
		return false;
	}
	else
	{
		var flagConfirm=confirm("是否確定退文？"); 
		if(flagConfirm)
		{
			var	formid = $(this).attr("data-trnote");
			db.transaction(function(t) {
				t.executeSql('update eOffice set remark3 = ? ,status = "退文" ,checkuser = "" where formid = ?',[remark3,formid], $.mobile.changePage("#receive2", "fade", false, true),null);		
			$("#remark3").val("");
			alert("簽核已退文至申請人「at9001-張小君」!!");
			});
		}
	}
}