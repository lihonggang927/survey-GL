package com.donglusoft.sysconf.service;

import com.donglusoft.sysconf.DAO.OfficeInfoDAO;
import com.donglusoft.sysconf.domain.OfficeInfo;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("officeInfoService")
public class OfficeInfoService
{

  @Resource
  private  OfficeInfoDAO  officeInfoDAO;

  public Map<String, Object> search(OfficeInfo u)
  {
    this.officeInfoDAO = new OfficeInfoDAO();
    return this.officeInfoDAO.search(u);
  }

  public List<OfficeInfo> findAll() throws Exception {
    return this.officeInfoDAO.findAll();
  }

  public String findNameById(String id)
  {
	  OfficeInfo office = officeInfoDAO.findById(id);
	  if(null != office)
		  return office.getName();
	  return null;
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.officeInfoDAO.del(parameter[i]);
    }
    return true;
  }

  public OfficeInfo saveOrUpdate(OfficeInfo u) {
    return this.officeInfoDAO.save(u);
  }

  public String saveOrUpdate(String flag, String attribute, String value)
  {
	  OfficeInfo unit = new OfficeInfo();
    createOfficeInfo(unit, attribute, value);
    if (!(flag.equals("")))
    {
      unit.setId(flag);
    }
    return this.officeInfoDAO.saveOrUpdate(attribute, value, unit);
  }

  public OfficeInfo createOfficeInfo(OfficeInfo unit, String attribute, String value) {
    if (attribute.equals("id"))
      unit.setId(value);
    else if (attribute.equals("name"))
      unit.setName(value);
   

    return unit;
  }
}