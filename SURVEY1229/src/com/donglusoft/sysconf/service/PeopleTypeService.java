package com.donglusoft.sysconf.service;

import com.donglusoft.sysconf.DAO.PeopleTypeDAO;
import com.donglusoft.sysconf.domain.PeopleType;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("peopleTypeService")
public class PeopleTypeService
{

  @Resource
  private PeopleTypeDAO peopleTypeDAO;

  public List<PeopleType> search(PeopleType pt)
    throws Exception
  {
    return this.peopleTypeDAO.search(pt);
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.peopleTypeDAO.del(parameter[i]);
    }
    return true;
  }

  public String saveOrUpdate(String flag, String attribute, String value)
  {
    PeopleType peopleType = new PeopleType();
    createPeopleType(peopleType, attribute, value);
    if (!(flag.equals("")))
    {
      peopleType.setId(flag);
    }
    return this.peopleTypeDAO.saveOrUpdate(attribute, value, peopleType);
  }

  public PeopleType createPeopleType(PeopleType peopleType, String attribute, String value)
  {
    if (attribute.equals("id"))
      peopleType.setId(value);
    else if (attribute.equals("name"))
      peopleType.setName(value);
    else if (attribute.equals("ratio")) {
      peopleType.setRatio(Integer.valueOf(Integer.parseInt(value)));
    }

    return peopleType;
  }
}