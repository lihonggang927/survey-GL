package com.donglusoft.user.action;

import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.sysconf.service.OfficeInfoService;
import com.donglusoft.user.domain.UserInfo;
import com.donglusoft.user.domain.UserInfoForExcle;
import com.donglusoft.user.service.UserInfoService;
import com.donglusoft.util.FileNameGenerate;
import com.donglusoft.util.Grid2excel;
import com.opensymphony.xwork2.ActionSupport;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("userInfoAction")
@Scope("prototype")
public class UserInfoAction extends ActionSupport
  implements SessionAware
{
  private boolean success = false;
  private List<UserInfo> userInfoItems;
  private int totalUserInfoItem;
  private String delData;
  private UserInfo ui;
  private Map<String, Object> session;
  @Resource 
  private OfficeInfoService  officeInfoService;
  @Resource
  private UserInfoService userInfoService;

  public String update()
  {
    try
    {
      this.success = this.userInfoService.update(this.ui);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String importToExcel() {
    try {
      setSuccess(false);
      List listForExcel = new ArrayList();
      this.userInfoItems = this.userInfoService.search(this.ui);
      for (UserInfo userInfo : this.userInfoItems) {
        UserInfoForExcle uife = new UserInfoForExcle();
        uife.setZhangHao("账号");
        uife.setZhangHaoValue(userInfo.getUsername());
        uife.setMima("密码");
        uife.setMimaValue(userInfo.getPassword());
        listForExcel.add(uife);
      }

      setSuccess(true);
      String[][] excelString = { { "zhangHao", "账号", "string" }, { "zhangHaoValue", "账号", "string" }, { "mima", "密码", "string" }, 
        { "mimaValue", "密码", "string" } };

      Grid2excel grid2excel = new Grid2excel();
      grid2excel.excelGenerate(excelString, listForExcel);
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
      return "error";
    }
    return "success";
  }

  public String login()
  {
    try {
      setSuccess(false);
      UserInfo u = this.userInfoService.login(this.ui);
      if (u != null) {
        this.session.put("user", u);
        setUserInfo(u);
        setSuccess(true);
      }
    }
    catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String del() {
    try {
      this.userInfoService.del(this.delData);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String searchOffice()
  {
    try {
      setSuccess(false);
      this.userInfoItems = this.userInfoService.search(this.ui);
      for (UserInfo ui : this.userInfoItems) {
        if (ui.getUnit() == null)
        {
          Unit u = new Unit();
          u.setName(FileNameGenerate.schoolName);
          ui.setUnit(u);
        }
        else if ((ui != null) && (ui.getUnit() != null) && (ui.getUnit().getOffice() != null) && (!("".equals(ui.getUnit().getOffice())))) {
            String name = officeInfoService.findNameById(ui.getUnit().getOffice());
          	if(null != name)
          		ui.getUnit().setName(name);
            
        }
      }

      this.totalUserInfoItem = this.userInfoItems.size();
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String search()
  {
    try {
      setSuccess(false);
      this.userInfoItems = this.userInfoService.search(this.ui);
      for (UserInfo ui : this.userInfoItems) {
        if (ui.getUnit() != null)
          continue;
        Unit u = new Unit();
        u.setName(FileNameGenerate.schoolName);
        ui.setUnit(u);
      }

      this.totalUserInfoItem = this.userInfoItems.size();
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String create()
  {
    try {
      setSuccess(false);
      this.userInfoService.create(this.ui);

      setSuccess(true);
    }
    catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public Map getSession() {
    return this.session;
  }

  public void setSession(Map session) {
    this.session = session;
  }

  public String getDelData() {
    return this.delData;
  }

  public void setDelData(String delData) {
    this.delData = delData;
  }

  public UserInfo getUserInfo() {
    return this.ui;
  }

  public void setUserInfo(UserInfo userInfo) {
    this.ui = userInfo;
  }

  public int getTotalUserInfoItem() {
    return this.totalUserInfoItem;
  }

  public void setTotalUserInfoItem(int totalUserInfoItem) {
    this.totalUserInfoItem = totalUserInfoItem;
  }

  public List<UserInfo> getUserInfoItems() {
    return this.userInfoItems;
  }

  public void setUserInfoItems(List<UserInfo> userInfoItems) {
    this.userInfoItems = userInfoItems;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }
}