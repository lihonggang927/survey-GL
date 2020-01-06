package com.donglusoft.user.action;

import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.sysconf.service.OfficeInfoService;
import com.donglusoft.user.domain.UserInfo;
import com.donglusoft.user.service.UserInfoService;
import com.donglusoft.util.FileNameGenerate;
import com.opensymphony.xwork2.ActionSupport;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

@Controller("printUserInfoAction")
@Scope("prototype")
public class PrintUserInfoAction extends ActionSupport
  implements SessionAware
{
  private static final long serialVersionUID = 1L;
  private Map<String, Object> session;
  private List<UserInfo> list;
  private Map<String, Object> map;
  private UserInfo userInfo;

  @Resource
  private UserInfoService userInfoService;
  @Resource 
  private OfficeInfoService  officeInfoService;
  public String print()
  {
    try
    {
      this.list = this.userInfoService.print(this.userInfo);
      for (UserInfo ui : this.list) {
        if (ui.getUnit() == null) {
          Unit u = new Unit();
          u.setName(FileNameGenerate.schoolName);
          ui.setUnit(u);
        }
        else if ((ui != null) && (ui.getUnit() != null) && (ui.getUnit().getOffice() != null) && (!("".equals(ui.getUnit().getOffice())))) {
//          if (ui.getUnit().getOffice().equals("1")) {
//            ui.getUnit().setName("机关第一党总支");
//          }
//          if (ui.getUnit().getOffice().equals("2")) {
//            ui.getUnit().setName("机关第二党总支");
//          }
//          if (ui.getUnit().getOffice().equals("3")) {
//            ui.getUnit().setName("机关第三党总支");
//          }
        	String name = officeInfoService.findNameById(ui.getUnit().getOffice());
        	if(null != name)
        	ui.getUnit().setName(name);
        }
      }

    }
    catch (Exception e)
    {
      e.printStackTrace();
    }

    return "success";
  }

  public UserInfo getUserInfo() {
    return this.userInfo;
  }

  public void setUserInfo(UserInfo userInfo) {
    this.userInfo = userInfo;
  }

  public List<UserInfo> getList() {
    return this.list;
  }

  public void setList(List<UserInfo> list) {
    this.list = list;
  }

  public Map<String, Object> getMap() {
    return this.map;
  }

  public void setMap(Map<String, Object> map) {
    this.map = map;
  }

  public Map<String, Object> getSession() {
    return this.session;
  }

  public void setSession(Map<String, Object> session) {
    this.session = session;
  }
}