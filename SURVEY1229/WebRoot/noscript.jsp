<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<base href="<%=basePath%>"></base>

		<title>检测浏览器是否启用脚本功能</title>

		<meta http-equiv="pragma" content="no-cache"></meta>
		<meta http-equiv="cache-control" content="no-cache"></meta>
		<meta http-equiv="expires" content="0"></meta>
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"></meta>
		<meta http-equiv="description" content="This is my page"></meta>
		<style type="text/css">
		* {
			margin: 10px;
			padding: 0px;
			list-style-type: none;
		}
		</style>
		<script type="text/javascript">
			
		</script>
	</head>
	<body>
		<div style="text-align: left; width: 900px; margin-left: 200px;">
		<div>测评用户您好，检测到您的浏览器没有启用脚本功能。</div><br />
		<div>若不启用脚本功能，您将无法测评。请按以下步骤启用浏览器的脚本功能:</div><br />
		<div>(1) 在浏览器的顶端，点击“工具(T)”</div><br />
		<div>(2) 选择“Internet 选项(O)”</div><br />
		<div>(3) 在弹出的小窗口的顶端，点击“安全”</div><br />
		<div>(4) 在这个窗口的底部，点击“自定义级别(C)”</div><br />
		<div>(5) 在弹出的窗口底部找到“重置自定义设置”，在“重置为(R)”右面的输入框中选择“安全级 - 中”，选择完成后，点击“重置”按钮</div><br />
		<div>(6) 当点击“重置”按钮后，在弹出的小窗口中点击“是”</div><br />
		<div>(7) 依次点击窗口底部的“确定”按钮，完成设置</div>	<br /><br />
		<div>设置完成？<a href="<%=basePath%>login.jsp" style="color: red; font-size: 22px; text-decoration: none;">点击进入鲁东大学处级干部测评系统</a></div>	
		</div>
	</body>
</html>
