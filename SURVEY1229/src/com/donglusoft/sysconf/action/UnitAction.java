package com.donglusoft.sysconf.action;

import com.donglusoft.survey.DAO.DAOUtils;
import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.sysconf.service.UnitService;
import com.opensymphony.xwork2.ActionSupport;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("unitAction")
@Scope("prototype")
public class UnitAction extends ActionSupport
{
  private static final long serialVersionUID = 1L;
  private List<Unit> unitItems;
  private int totalUnitItem;
  private boolean success = false;
  private String attribute;
  private String value;
  private String flag;
  private String delData;

  @Resource
  private UnitService unitService;

  public String clear()
  {
   System.out.println("clear is called");
   try
   {
   DAOUtils.clearSurveyData();
   } catch (Exception e) {
	      this.success = false;
	      e.printStackTrace();
	    }
    return "success";
  }
  
  public String del()
  {
    try
    {
      this.unitService.del(this.delData);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String searchOffice() {
    try {
      this.unitItems = this.unitService.findOffice();
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String search() {
    try {
      this.unitItems = this.unitService.findAll();
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
      this.flag = this.unitService.saveOrUpdate(this.flag, this.attribute, this.value);
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

  public List<Unit> getUnitItems() {
    return this.unitItems;
  }

  public void setUnitItems(List<Unit> unitItems) {
    this.unitItems = unitItems;
  }
}