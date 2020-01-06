<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.donglusoft.user.domain.UserInfo"%>
<%@page import="javax.annotation.Resource"%>
<%@ page import="org.springframework.context.ApplicationContext"%>
<%@ page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.slf4j.Logger"%>
<%@page import="org.slf4j.LoggerFactory"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

	</head>

	<body>
		<script type="text/javascript">
 
//struts2拦截器  调用方法
  var  reLogin = function (){ 
    	window.parent.open('<%=basePath%>login.jsp', '_self');
    	window.location.stop();
    	}//登录窗口  
  	var toError = function(){
  		window.location.href='<%=basePath%>error.jsp';
 		window.location.stop();
 		//catch到exception调到错误页面
    }
    //Ext.Ajax.on('requestcomplete', function(conn, response, options, e){  
    //    var returnVal=response.responseText;  
    //    if(returnVal == "rightUserIsNull"){   
    //        alert("您太长时间没有操作系统，为了保证您的账号安全，请重新登录");
    //        reLogin();
    //    }else if(returnVal == "systemHaveException"){
    //        toError();
  	//	}
    //}); 
  //struts2拦截器  调用方法
    
    //验证 权限   url   是 js页面上传过来的参数，如果该用户能够查看的菜单的url中有  与该参数 equels的，该用户可以查看该页面；否则返回登录页面。
		var haveRight = function (url){
			<%
				UserInfo user = (UserInfo)session.getAttribute("user");
				if(user == null){
					%>
				window.parent.open('<%=basePath%>login.jsp', '_self');
				window.location.stop();
					<%
				}else{
			 	}
					%>
			};
	</script>
	</body>
</html>
