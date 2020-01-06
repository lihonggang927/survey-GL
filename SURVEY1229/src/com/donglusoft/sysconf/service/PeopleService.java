package com.donglusoft.sysconf.service;

import com.donglusoft.sysconf.DAO.PeopleDAO;
import com.donglusoft.sysconf.DAO.UnitDAO;
import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.Unit;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

@Service("peopleService")
public class PeopleService
{

  @Resource
  private PeopleDAO peopleDAO;

  @Resource
  private UnitDAO unitDAO;

  public List<People> searchByCondition(People p)
    throws Exception
  {
    return this.peopleDAO.searchByCondition(p);
  }

  public Unit createUnit(String name) {
    Unit u = new Unit();
    u.setName(name);
    Map unitMap = this.unitDAO.search(u);
    List unitList = (List)unitMap.get("items");
    int size = unitList.size();
    if (1 == size) {
      return ((Unit)unitList.get(0));
    }
    u.setOffice("0");
    u.setDelFlag(Integer.valueOf(1));
    return this.unitDAO.save(u);
  }

  public boolean importFromExcel(String path) throws Exception
  {
    try
    {
      FileInputStream is = new FileInputStream(new File(path));
      HSSFWorkbook wb = new HSSFWorkbook(is);
      int sheetNum = wb.getNumberOfSheets();
      for (int i = 0; i < sheetNum; ++i) {
        HSSFSheet childSheet = wb.getSheetAt(i);
        int rowNum = childSheet.getLastRowNum();

        for (int j = 1; j < rowNum + 1; ++j) {
          People people = new People();
          HSSFRow row = childSheet.getRow(j);
          int cellNum = row.getLastCellNum();
          for (int k = 0; k < cellNum; ++k) {
            String s = new String();
            try {
              row.getCell(k).setCellType(1);
              s = row.getCell(k).toString();
            } catch (NullPointerException e) {
              s = " ";

              e.printStackTrace();
            }
            if (k == 0) {
              people.setName(s);
            } else if (1 == k) {
              Unit unit = createUnit(s);
              people.setUnit(unit);
            } else if (2 == k) {
              people.setPosition(s);
            }

          }

          people.setDelFlag(Integer.valueOf(1));
          this.peopleDAO.save(people);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    return true;
  }

  public boolean sort(String params) throws Exception
  {
    String[] parameter = params.split(",");
    this.peopleDAO.sort(parameter);

    return true;
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.peopleDAO.del(parameter[i]);
    }
    return true;
  }

  public Map<String, Object> search(String property, int start, int limit) throws Exception {
    String[] properties = (String[])null;
    if ((property != null) && (!(property.equals("")))) {
      properties = property.split(" ");
    }
    return this.peopleDAO.search(properties, start, limit);
  }

  public String saveOrUpdate(String flag, String attribute, String value)
    throws Exception
  {
    People people = new People();
    createPeople(people, attribute, value);
    if (!(flag.equals("")))
    {
      people.setId(flag);
    }
    return this.peopleDAO.saveOrUpdate(attribute, value, people);
  }

  public People createPeople(People people, String attribute, String value) throws Exception
  {
    if (attribute.equals("id")) {
      people.setId(value);
    } else if (attribute.equals("unit")) {
      Unit unit = new Unit();
      unit.setId(value);
      people.setUnit(unit);
    } else if (attribute.equals("name")) {
      people.setName(value);
    } else if (!(attribute.equals("level")))
    {
      if (attribute.equals("position"))
        people.setPosition(value);
      else if (!(attribute.equals("delFlag")))
      {
        if (attribute.equals("fields1"))
          people.setFields1(value);
        else if (attribute.equals("fields2")) {
          people.setFields2(value);
        }
      }
    }
    return people;
  }
}