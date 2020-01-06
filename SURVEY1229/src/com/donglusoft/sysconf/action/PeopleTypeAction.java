package com.donglusoft.sysconf.action;

import com.donglusoft.sysconf.domain.PeopleType;
import com.donglusoft.sysconf.service.PeopleTypeService;
import com.opensymphony.xwork2.ActionSupport;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("peopleTypeAction")
@Scope("prototype")
public class PeopleTypeAction extends ActionSupport
{
  private static final long serialVersionUID = 1L;
  private List<PeopleType> peopleTypeItems;
  private PeopleType peopleType;
  private boolean success = false;
  private String attribute;
  private String value;
  private String flag;
  private String delData;

  @Resource
  private PeopleTypeService peopleTypeService;

  public String search()
  {
    try
    {
      this.peopleTypeItems = this.peopleTypeService.search(this.peopleType);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String del() {
    try {
      this.peopleTypeService.del(this.delData);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String saveOrUpdate()
  {
    try
    {
      this.flag = this.peopleTypeService.saveOrUpdate(this.flag, this.attribute, this.value);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public PeopleType getPeopleType()
  {
    return this.peopleType;
  }

  public void setPeopleType(PeopleType peopleType) {
    this.peopleType = peopleType;
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

  public List<PeopleType> getPeopleTypeItems() {
    return this.peopleTypeItems;
  }

  public void setPeopleTypeItems(List<PeopleType> peopleTypeItems) {
    this.peopleTypeItems = peopleTypeItems;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }
}