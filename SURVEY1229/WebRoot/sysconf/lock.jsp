<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.donglusoft.user.domain.UserInfo"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  >
<head>
<script type="text/javascript">
		<%
			UserInfo user = ((UserInfo) session.getAttribute("user"));
			if (user == null) {
		%>
		window.parent.open('<%=basePath%>login.jsp', '_self');
		<%
			} else {
		%>
		
		<%
			}
		%>
</script>
<jsp:include page="/public/common.jsp"></jsp:include>
<script type="text/javascript" src="<%=basePath %>JS/jquery.js"></script>
<script type="text/javascript" src="<%=basePath %>sysconf/JS/store/sysconfStore.js"></script>
<script type="text/javascript" src="<%=basePath %>sysconf/JS/object/lock.js"></script>

<style type="text/css">

.x-icon-lock {
	background-image: url('<%=basePath%>images/lock.png');
}

.x-icon-open {
	background-image: url('<%=basePath%>images/lock_open.png');
}
</style>
</head>
<body style="width : 100%; height : 100%">
<center>
<div style="width : 100%; height : 100%">
    <div id="demo1" style="width : 100%; height : 30%">
    </div>
    <div id="demo2" style="width : 100%; height : 30%">
    </div>
    <div id="demo3" style="width : 100%; height : 30%">
    </div>
</div>
</center>
</body>
</html>

