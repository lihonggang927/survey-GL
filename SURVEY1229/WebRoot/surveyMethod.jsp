<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<base href="<%=basePath%>"></base>

		<title>测评方法步骤</title>

		<meta http-equiv="pragma" content="no-cache"></meta>
		<meta http-equiv="cache-control" content="no-cache"></meta>
		<meta http-equiv="expires" content="0"></meta>
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"></meta>
		<meta http-equiv="description" content="This is my page"></meta>
	</head>
	<body>
		<center>
			<div style="background-image: url('images/surveyMethod.JPG'); width: 819px; height: 528px; ">
			</div>
			<div style="background-image: url('images/methodBottom.JPG'); width: 819px; background-position: bottom;">
				<br />
				<div style="border-color:green; border-style:groove; border-width:2px; width: 380px; height: 35px; text-align: center;">
					<a href="<%=basePath%>login.jsp" style="color: red; font-size: 22px; text-decoration: none;">进入干部管理学院处级干部测评系统</a>
				</div>
				<br/>
			</div>
		</center>
	</body>
</html>
