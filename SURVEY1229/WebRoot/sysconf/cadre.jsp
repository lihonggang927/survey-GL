﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
<script type="text/javascript">
	var flag = 2;
	var peopleTypeId = 2;
</script>
<script type="text/javascript" src="<%=basePath %>sysconf/JS/store/userInfoStore.js"></script>
<script type="text/javascript" src="<%=basePath %>sysconf/JS/store/sysconfStore.js"></script>
<script type="text/javascript" src="<%=basePath %>sysconf/JS/object/lockAndState.js"></script>
<script type="text/javascript">
Ext.onReady(function() {
	Ext.getCmp('hiddenPeopleType').setValue('2');
	Ext.getCmp('unitForFindUK').setValue('干部管理学院');
	Ext.getCmp('unitForFindUK').disable();
});
</script>

<style type="text/css">
.x-grid3-row td,.x-grid3-summary-row td{
	line-height:20px;
	font-size: 12px;
}
</style>
</head>
<body>
</body>
</html>

