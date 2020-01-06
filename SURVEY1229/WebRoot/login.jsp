<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>"></base>
    
    <title>用户登录</title>
   
	<meta http-equiv="pragma" content="no-cache"></meta>
	<meta http-equiv="cache-control" content="no-cache"></meta>
	<meta http-equiv="expires" content="0"></meta>
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"></meta>
	<meta http-equiv="description" content="This is my page"></meta>
	<noscript><meta HTTP-EQUIV='REFRESH' CONTENT="0;URL=noscript.jsp"></noscript>
	<link href="<%=basePath %>CSS/login.css" rel="stylesheet" type="text/css" />
	
	<link rel="stylesheet" type="text/css" href="<%=basePath%>ExtJs/resources/css/ext-all.css"/>
	<script type="text/javascript" src="<%=basePath%>ExtJs/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=basePath%>ExtJs/ext-all.js"></script>
	<script type="text/javascript" src="<%=basePath%>ExtJs/locale/ext-lang-zh_CN.js"></script>
    
	<script type="text/javascript" >
function keyConvert() {
	if (event.keyCode == 13 && event.srcElement.type != "button") {
		event.keyCode = 9;
	}
};

var basePath = '<%=basePath%>';
 </script>
 
    <script type="text/javascript" src="<%=basePath%>JS/login.js"></script>
    
  </head>
 <body>
	<div id="box">
	  	<div class="login" id="formPanel">
	  	</div> 
	</div>
  </body>
</html>
