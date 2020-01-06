<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'object.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="/public/common.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath %>Demo/createObject/JS/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>Demo/createObject/JS/sysconfStore.js"></script>
	<script type="text/javascript" src="<%=basePath %>Demo/createObject/JS/people.js"></script>
	<script type="text/javascript" src="<%=basePath %>Demo/createObject/JS/object.js"></script>
  </head>
  
  <body>
    This is my JSP page. <br>
  </body>
</html>
