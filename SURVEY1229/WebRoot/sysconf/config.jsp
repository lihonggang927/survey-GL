<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.donglusoft.user.domain.UserInfo"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>测评系统后台管理</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script type="text/javascript">
		<%
			UserInfo user = ((UserInfo) session.getAttribute("user"));
			if (user == null) {
		%>
		window.parent.open('<%=basePath%>login.jsp', '_self');
		<%
			} else {
		%>
			var currentUser = '<%=user.getId()%>';
			var basePath = '<%=basePath%>';
			var userInfoUsername = '<%=user.getUsername()%>';
		<%
			}
		%>
		</script>
		<jsp:include page="/public/common.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css"
			href="Demo/Grouptabs/CSS/Portal.css" />
		<link rel="stylesheet" type="text/css"
			href="Demo/Grouptabs/CSS/GroupTab.css" />

		<!-- page specific -->
<style type="text/css">
/* styles for iconCls */
.x-icon-tickets {
	background-image: url('<%=basePath%>images/tickets.png');
}

.x-icon-subscriptions {
	background-image: url('<%=basePath%>images/subscriptions.png');
}

.x-icon-users {
	background-image: url('<%=basePath%>images/group.png');
}

.x-icon-keyboard {
	background-image: url('<%=basePath%>images/keyboard_add.png');
}
.x-icon-key {
	background-image: url('<%=basePath%>images/key_go.png');
}

.x-icon-lock {
	background-image: url('<%=basePath%>images/lock.png');
}

.x-icon-open {
	background-image: url('<%=basePath%>images/lock_open.png');
}

.x-icon-type {
	background-image: url('<%=basePath%>images/award_star_bronze_1.png');
}

.x-icon-templates {
	background-image: url('<%=basePath%>images/templates.png');
}
.x-grid3-row td,.x-grid3-summary-row td{
	line-height:20px;
	font-size: 12px;
}
.required {
	padding-top : 10px;
}
</style>

		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/store/sysconfStore.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/store/userInfoStore.js"></script>
		<script type="text/javascript" src="<%=basePath%>sysconf/JS/util.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/unit.js"></script>
<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/officeInfo.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/surveyStandard.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/people.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/peopleType.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/object/userAndKey.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/GroupTabPanel.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/GroupTab.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/Portal.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/PortalColumn.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/Portlet.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/grouptabs.js"></script>
	</head>

	<body>
	</body>
</html>
