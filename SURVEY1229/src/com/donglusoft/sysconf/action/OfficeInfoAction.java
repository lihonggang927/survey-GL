package com.donglusoft.sysconf.action;

import com.donglusoft.survey.DAO.DAOUtils;
import com.donglusoft.sysconf.domain.OfficeInfo;
import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.sysconf.service.OfficeInfoService;
import com.donglusoft.sysconf.service.UnitService;
import com.opensymphony.xwork2.ActionSupport;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("officeInfoAction")
@Scope("prototype")
public class OfficeInfoAction extends ActionSupport
{
  private static final long serialVersionUID = 1L;
  private List<OfficeInfo> unitItems;
  private int totalUnitItem;
  private boolean success = false;
  private String attribute;
  private String value;
  private String flag;
  private String delData;

  @Resource
  private OfficeInfoService officeInfoService;

  
  
  public String del()
  {
    try
    {
      this.officeInfoService.del(this.delData);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String searchOffice() {
    try {
      this.unitItems = this.officeInfoService.findAll();
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String search() {
    try {
      this.unitItems = this.officeInfoService.findAll();
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String saveOrUpdate()
  {
    try {
      this.flag = this.officeInfoService.saveOrUpdate(this.flag, this.attribute, this.value);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String getDelData() {
    return this.delData;
  }

  public void setDelData(String delData) {
    this.delData = delData;
  }

  public String getAttribute() {
    return this.attribute;
  }

  public void setAttribute(String attribute) {
    this.attribute = attribute;
  }

  public String getValue() {
    return this.value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getFlag() {
    return this.flag;
  }

  public void setFlag(String flag) {
    this.flag = flag;
  }

  public int getTotalUnitItem() {
    return this.totalUnitItem;
  }

  public void setTotalUnitItem(int totalUnitItem) {
    this.totalUnitItem = totalUnitItem;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public List<OfficeInfo> getUnitItems() {
    return this.unitItems;
  }

  public void setUnitItems(List<OfficeInfo> unitItems) {
    this.unitItems = unitItems;
  }
}