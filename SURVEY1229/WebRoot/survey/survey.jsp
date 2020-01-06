<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.donglusoft.user.domain.UserInfo"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>处级干部考核民主测评</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="测评系统">
		<meta http-equiv="description" content="测评系统">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>survey/CSS/main.css">
		<script type="text/javascript" src="<%=basePath%>JS/HashMap.js"></script>
		<script type="text/javascript">
		var surveyDataMap=new HashMap();
		var surveyStandardItems=[];
		<s:iterator value="surveyStandardItems" id="ssi" status="status">
		surveyStandardItems.push('<s:property value="#ssi.id" />');
		</s:iterator>
		var surveyStandardItemsSize=surveyStandardItems.length;
	function document.onkeydown()
{
  if (  window.event.keyCode==37||   //屏蔽 Alt+ 方向键 ←
       window.event.keyCode==39)   //屏蔽 Alt+ 方向键 →
  {
     event.returnValue=false;
  }	
}
	function clickDIV(id)
	{
		var newId=id.substring(0,66);
		var peopleID=id.substring(66,id.length);
		//判断上一行是不是全部选择
		if(peopleID!='')
		{
				checkUpLine(peopleID);
		}
		//渲染文字
		renderText(newId);
		//评选结果放入储值MAP
		surveyDataMap.put(''+newId,1);
		//alert(surveyDataMap.keys());
	}
	
	function checkUpLine(peopleID)
	{
		var count=0;
		for(var i=0;i<surveyStandardItemsSize;i++){
			if(surveyDataMap.containsKey(peopleID+":"+surveyStandardItems[i]+"Y"))
			{
				
				count++;
				continue;
			}
			if(surveyDataMap.containsKey(peopleID+":"+surveyStandardItems[i]+"L"))
			{
				count++;
				continue;
			}
			if(surveyDataMap.containsKey(peopleID+":"+surveyStandardItems[i]+"Z"))
			{
				count++;
				continue;
			}
			if(surveyDataMap.containsKey(peopleID+":"+surveyStandardItems[i]+"C"))
			{
				count++;
			}
		}
		if(count!=surveyStandardItemsSize)
		{
			alert("上一行有未填写的内容");
		}
	}

	function renderText(id)
	{//去重，并且渲染div内的文字
		var idShort=id.substring(0,id.length-1);
		var flag=id.substring(id.length-1);
		var DivID=""+id;
		if(flag=='Y'){
			surveyDataMap.remove(idShort+'L');
			surveyDataMap.remove(idShort+'Z');
			surveyDataMap.remove(idShort+'C');
			document.getElementById(idShort+'L').innerHTML='';
			document.getElementById(idShort+'Z').innerHTML='';
			document.getElementById(idShort+'C').innerHTML='';
			document.getElementById(DivID).innerHTML='好';
			}
		if(flag=='L'){
			surveyDataMap.remove(idShort+'Y');
			surveyDataMap.remove(idShort+'Z');
			surveyDataMap.remove(idShort+'C');
			document.getElementById(idShort+'Y').innerHTML='';
			document.getElementById(idShort+'Z').innerHTML='';
			document.getElementById(idShort+'C').innerHTML='';
			document.getElementById(DivID).innerHTML='较好';
			}
		if(flag=='Z'){
			surveyDataMap.remove(idShort+'L');
			surveyDataMap.remove(idShort+'Y');
			surveyDataMap.remove(idShort+'C');
			document.getElementById(idShort+'L').innerHTML='';
			document.getElementById(idShort+'Y').innerHTML='';
			document.getElementById(idShort+'C').innerHTML='';
			document.getElementById(DivID).innerHTML='一般';
			}
		if(flag=='C'){
			surveyDataMap.remove(idShort+'L');
			surveyDataMap.remove(idShort+'Z');
			surveyDataMap.remove(idShort+'Y');
			document.getElementById(idShort+'L').innerHTML='';
			document.getElementById(idShort+'Z').innerHTML='';
			document.getElementById(idShort+'Y').innerHTML='';
			document.getElementById(DivID).innerHTML='较差';
			}
	}
	</script>
	</head>
	<body>
		<div class="bigdiv">
			<div id="header">
				<div id="header_top" onclick="aaa()">
					鲁东大学处级干部测评系统
				</div>
			</div>
			<div class="surveyStandard">
				<div class="surveySpace">
					测评项目
				</div>
				<s:iterator value="surveyStandardItems" id="ssi">

					<div class="surveyStandardName">
						<s:property value="#ssi.name" />
					</div>

				</s:iterator>
			</div>

			<div class="surveySort">
				<div class="surveySpace">
					测评标准
				</div>
				<s:iterator value="surveyStandardItems" status="status">
					<div class="surveyStandardNameDetail">
						好
					</div>
					<div class="surveyStandardNameDetail">
						较好
					</div>
					<div class="surveyStandardNameDetail">
						一般
					</div>
					<div class="surveyStandardNameDetail">
						差
					</div>
				</s:iterator>
			</div>


			<div class="surveyDIV">
				<s:iterator value="peopleItems" id="pi" status="Pstatus">
					<div id="<s:property value="#pi.id" />" class="people">
						<div class="peopleNUM">
							<s:property value="#Pstatus.index+1" />
						</div>
						<div class="peopleName">
							<s:property value="#pi.name" />
						</div>
						<div class="peoplePosition">
							<s:property value="#pi.position" />
						</div>
						<s:iterator value="surveyStandardItems" id="ssi" status="status">
							<div class="surveyStandardBlock">
								<div
									onclick="clickDIV('<s:property value="#pi.id" />:<s:property value="#ssi.id" />Y<s:property value="peopleItems[#Pstatus.index-1].id" />')"
									class="surveyStandard<s:property value="#status.even" />"
									id="<s:property value="#pi.id" />:<s:property value="#ssi.id" />Y"></div>
								<div
									onclick="clickDIV('<s:property value="#pi.id" />:<s:property value="#ssi.id" />L<s:property value="peopleItems[#Pstatus.index-1].id" />')"
									class="surveyStandard<s:property value="#status.even" />"
									id="<s:property value="#pi.id" />:<s:property value="#ssi.id" />L"></div>
								<div
									onclick="clickDIV('<s:property value="#pi.id" />:<s:property value="#ssi.id" />Z<s:property value="peopleItems[#Pstatus.index-1].id" />')"
									class="surveyStandard<s:property value="#status.even" />"
									id="<s:property value="#pi.id" />:<s:property value="#ssi.id" />Z"></div>
								<div
									onclick="clickDIV('<s:property value="#pi.id" />:<s:property value="#ssi.id" />C<s:property value="peopleItems[#Pstatus.index-1].id" />')"
									class="surveyStandard<s:property value="#status.even" />"
									id="<s:property value="#pi.id" />:<s:property value="#ssi.id" />C"></div>
							</div>
						</s:iterator>

					</div>
					<!-- id="people"结束 -->
				</s:iterator>
			</div>

		</div>
		<!-- bigdiv结束 -->


	</body>
</html>
