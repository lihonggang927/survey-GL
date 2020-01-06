<%@ page language="java" pageEncoding="utf-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<%
	response.setDateHeader("Expires", 0);
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
%>
<%
	String prjpath = request.getContextPath();//项目根路径
	request.setAttribute("basePath", basePath);
%>

<script type="text/javascript">
	var basePath = '<%=basePath%>';
</script>
<jsp:include page="/public/right.jsp"></jsp:include>
<%-- 通用的js与css --%>
<link rel="stylesheet" type="text/css" href="<%=basePath%>ExtJs/ghost.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>ExtJs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="<%=basePath %>ExtJs/resources/css/summary.css">
<link id="extjsStyle" rel="stylesheet" type="text/css"	href="<%=basePath%>ExtJs/icon.css">	
<link id="extjsStyle" rel="stylesheet" type="text/css" href="<%=basePath%>public/CSS/FormLayout.css">
<script type="text/javascript" src="<%=basePath%>ExtJs/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath%>ExtJs/ext-all-debug.js"></script>
<script type="text/javascript" src="<%=basePath%>ExtJs/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath %>ExtJs/JsonReader.js"></script>
<script type="text/javascript" src="<%=basePath %>ExtJs/GroupSummary.js"></script>	
<script type="text/javascript" src="<%=basePath %>ExtJs/ghost.js"></script>	
<script type="text/javascript" src="<%=basePath%>ExtJs/PageComboResizer/PageComboResizer.js"></script>
<script type="text/javascript" src="<%=basePath %>JS/pluigin/PinyinFilter.js"></script>
<script type="text/javascript" src="<%=basePath %>JS/pluigin/PinyinCombo.js"></script>
<!-- <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico"/> -->
