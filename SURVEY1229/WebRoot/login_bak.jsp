<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

		<title>用户登录</title>
		<link rel="shortcut icon" href="<%=basePath%>images/favicon.ico">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<style type="text/css">
.panel {
	background-image: url(images/login/login_07.gif);
}
</style>
		<script type="text/javascript">
function keyConvert() {
	if (event.keyCode == 13 && event.srcElement.type != "button") {
		event.keyCode = 9;
	}
};
var basePath = '<%=basePath%>';
 </script>
		<jsp:include page="public/common.jsp"></jsp:include>
		<script type="text/javascript" src="<%=basePath%>JS/login.js"></script>
	</head>

	<body>
	<div id="loginDiv" style="height: 127; width: 225"></div>
	</body>
</html>
