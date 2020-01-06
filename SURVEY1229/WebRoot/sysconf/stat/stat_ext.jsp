<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.donglusoft.user.domain.UserInfo"%>
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
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script type="text/javascript">
			<%UserInfo user = ((UserInfo) session.getAttribute("user"));
			if (user == null) {%>
			window.parent.open('<%=basePath%>login.jsp', '_self');
			<%} else {%>
			
			var currentUser = '<%=user.getId()%>';
			var basePath = '<%=basePath%>';
			var year = '<%=user.getYear()%>';
			var windowForCloseFlag = '1';
			
			<%
			}
			%>
			
		</script>

		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>ExtJs/ghost.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>ExtJs/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>survey/CSS/cell.css">
		<script type="text/javascript"
			src="<%=basePath%>ExtJs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>ExtJs/ext-all-debug.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>ExtJs/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" 
			src="<%=basePath %>ExtJs/ghost.js"></script>
		<script type="text/javascript" src="<%=basePath%>JS/HashMap.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/JS/store/sysconfStore.js"></script>
		<script type="text/javascript" src="<%=basePath%>sysconf/JS/util.js"></script>
		<script type="text/javascript" src="<%=basePath%>sysconf/stat/JS/util.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>sysconf/stat/JS/statStore.js"></script>
		<script type="text/javascript" src="<%=basePath%>sysconf/stat/JS/stat.js"></script>
		
<style type="text/css">
.x-grid3-row td,.x-grid3-summary-row td {
	line-height: 30px;
	font-size: 15px;
	/**vertical-align:center;单元格垂直居中**/
	/**border-right: 2px solid #eceff6 !important;控制表格列线**/
	/**border-top: 2px solid #eceff6 !important;控制表格行线*/ /
	border-left: 2px solid #ffffff !   import;
	border-right: 2px solid #ffffff !   import;
	border-top: 2px solid #ffffff !   import;
	border-bottom: 1px solid #ffffff !   import;
}

.x-grid3-cell-inner,.x-grid3-hd-inner {
	white-space: normal !important;
	line-height: 30px;
	font-size: 15px;
}

.required {
	padding-top: 10px;
}
</style>
	</head>

	<body>
	</body>
</html>
