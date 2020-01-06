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


<style type="text/css">
</style>
</head>
<body>
<h3>请确认清理测评数据，数据一旦清理，不可恢复。</h3>
<a href="<%=basePath%>clear_unit.action">确认清理</a>

<a href="http://www.w3school.com.cn">W3School</a>
</body>
</html>

