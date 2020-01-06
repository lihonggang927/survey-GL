<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'grouptabs.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="/public/common.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="Demo/Grouptabs/CSS/Portal.css" />
    <link rel="stylesheet" type="text/css" href="Demo/Grouptabs/CSS/GroupTab.css" />
    
	<!-- page specific -->
    <style type="text/css">
        /* styles for iconCls */
        .x-icon-tickets {
            background-image: url('<%=basePath %>images/tickets.png');
        }
        .x-icon-subscriptions {
            background-image: url('<%=basePath %>images/subscriptions.png');
        }
        .x-icon-users {
            background-image: url('<%=basePath %>images/group.png');
        }
        .x-icon-key {
            background-image: url('<%=basePath %>images/key_go.png');
        }
        .x-icon-templates {
            background-image: url('<%=basePath %>images/templates.png');
        }
    </style>
    
	<script type="text/javascript" src="<%=basePath %>Demo/Grouptabs/JS/GroupTabPanel.js"></script>
	<script type="text/javascript" src="<%=basePath %>Demo/Grouptabs/JS/GroupTab.js"></script>
	<script type="text/javascript" src="<%=basePath %>Demo/Grouptabs/JS/grouptabs.js"></script>
  </head>
  
  <body>
  </body>
</html>
