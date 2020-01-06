<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.donglusoft.user.domain.UserInfo"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>系统开关</title>
	<script type="text/javascript" src="<%=basePath %>JS/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>JS/switchBox.js"></script>
	
	<style>
	#container {
		width: 310px;
		margin: 50px auto;
		padding: 15px;
		background: #f8f8f8;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		-webkit-box-shadow: inset 0 0 2px rgba(190,190,190,0.75),
		inset 0 1px 2px rgba(0,0,0,0.2);
		-moz-box-shadow: inset 0 0 2px rgba(190,190,190,0.75),
		inset 0 1px 2px rgba(0,0,0,0.2);
		box-shadow: inset 0 0 2px rgba(190,190,190,0.75),
		inset 0 1px 2px rgba(0,0,0,0.2);
		
	}

</style>
<link rel="stylesheet" href="<%=basePath %>CSS/switchBox.css" type="text/css" media="screen" charset="utf-8"></link>
	<script>
	$(document).ready (function () {
		//alert('出现什么？');
		$('input[type=checkbox]').EMSwitchBox({onLabel : 'On', offLabel : 'Off'});
	});
	</script>
</head>

<body>
	<div id="container">
		<input type="checkbox" name="chkTest"></input><br />
		<input type="checkbox" name="chkTest" value="30"></input><br />
		<input type="checkbox" name="chkTest" value="5"></input><br />
	</div>

</body>
</html>

