<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>没有权限</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="shortcut icon" href="<%=basePath%>images/favicon.ico">
</head>
<body>
<center>
<script type="text/javascript">
function login(){
window.location.href='<%=basePath%>';
window.location.stop();
return false;
}
</script>
对不起，您没有访问该页面的权限，如果有问题，请和管理员联系<br>
<button onclick="login()" title="返回">返回</button>
</center>
</body>
</html>
