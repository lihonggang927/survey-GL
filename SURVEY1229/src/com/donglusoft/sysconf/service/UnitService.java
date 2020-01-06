package com.donglusoft.sysconf.service;

import com.donglusoft.sysconf.DAO.UnitDAO;
import com.donglusoft.sysconf.domain.Unit;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("unitService")
public class UnitService
{

  @Resource
  private UnitDAO unitDAO;

  public Map<String, Object> search(Unit u)
  {
    this.unitDAO = new UnitDAO();
    return this.unitDAO.search(u);
  }

  public List<Unit> findAll() throws Exception {
    return this.unitDAO.findAll();
  }

  public List<Unit> findOffice() throws Exception {
    List uList = this.unitDAO.findOffice();
    return this.unitDAO.findAll();
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.unitDAO.del(parameter[i]);
    }
    return true;
  }

  public Unit saveOrUpdate(Unit u) {
    return this.unitDAO.save(u);
  }

  public String saveOrUpdate(String flag, String attribute, String value)
  {
    Unit unit = new Unit();
    createUnit(unit, attribute, value);
    if (!(flag.equals("")))
    {
      unit.setId(flag);
    }
    return this.unitDAO.saveOrUpdate(attribute, value, unit);
  }

  public Unit createUnit(Unit unit, String attribute, String value) {
    if (attribute.equals("id"))
      unit.setId(value);
    else if (attribute.equals("name"))
      unit.setName(value);
    else if (attribute.equals("address"))
      unit.setAddress(value);
    else if (attribute.equals("legalPerson"))
      unit.setLegalPerson(value);
    else if (attribute.equals("peopleCount"))
      unit.setPeopleCount(Integer.valueOf(Integer.parseInt(value)));
    else if (attribute.equals("office"))
      unit.setOffice(value);
    else if (attribute.equals("lockFlag")) {
      unit.setLockFlag(value);
    }

    return unit;
  }
}