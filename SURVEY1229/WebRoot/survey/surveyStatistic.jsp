<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>测评统计</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="/public/common.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>survey/CSS/cell.css">
	<script type="text/javascript" src="<%=basePath %>JS/HashMap.js"></script>
	<script type="text/javascript" src="<%=basePath %>sysconf/JS/store/sysconfStore.js"></script>
	<script type="text/javascript" src="<%=basePath %>sysconf/JS/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>survey/JS/surveyStore.js"></script>
	<script type="text/javascript" src="<%=basePath %>survey/JS/surveyStatistic.js"></script>
  </head>
  
  <body id="docbody">
  </body>
</html>
