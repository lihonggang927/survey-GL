package com.donglusoft.user.service;

import com.donglusoft.sysconf.domain.PeopleType;
import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.user.DAO.UserInfoDAO;
import com.donglusoft.user.domain.UserInfo;
import com.donglusoft.util.Md5;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("userInfoService")
public class UserInfoService
{

  @Resource
  private UserInfoDAO userInfoDAO;

  public boolean update(UserInfo u)
    throws Exception
  {
    UserInfo userForValidate = new UserInfo();
    UserInfo userOfReturn = new UserInfo();
    userForValidate.setId(u.getId());
    userForValidate.setUsername(u.getUsername());
    userForValidate.setDelFlag(u.getDelFlag());
    String password = u.getPassword();
    password = password.split(",")[0];
    userForValidate.setPassword(password);
    System.out.println("密码：" + u.getPassword());
    userOfReturn = this.userInfoDAO.login(userForValidate);
    if (userOfReturn != null) {
      userOfReturn.setPassword(u.getPassword().split(",")[1].trim());
      return true;
    }
    return false;
  }

  public UserInfo login(UserInfo u) {
    Md5 md5 = new Md5();
    UserInfo user = new UserInfo();
    user = this.userInfoDAO.login(u);
    return user;
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.userInfoDAO.del(parameter[i]);
    }
    return true;
  }

  public List<UserInfo> search(UserInfo u)
    throws Exception
  {
    if ((u != null) && (u.getUnit() != null) && (u.getUnit().getId().equals("鲁东大学"))) {
      u.setUnit(null);
    }
    List userInfoList = new ArrayList();
    userInfoList = this.userInfoDAO.search(u);
    return userInfoList;
  }

  public List<UserInfo> print(UserInfo u) throws Exception {
    List<UserInfo> userInfoList = new ArrayList<UserInfo>();
    userInfoList = this.userInfoDAO.search(u);
    for (UserInfo ui : userInfoList) {
      ui.setStateFlag("1");
    }
    return userInfoList;
  }

  public Map<String, Object> createUniqueUsername(int count) {
    Random random = new Random();
    Map usernames = new HashMap();
    for (int i = 0; i < count; ++i) {
      int username = (int)(Math.random() * 10000000000.0D % 100000000.0D);
      if (usernames.containsKey(Integer.valueOf(username))) {
        --i;
      } else {
        int password = (int)(Math.random() * 10000000000.0D % 100000000.0D);
        usernames.put(username, password);
      }
    }
    return usernames;
  }

  public boolean create(UserInfo userInfo) {
    int count = Integer.parseInt(userInfo.getFields1());

    Md5 md5 = new Md5();

    if (!(userInfo.getFields1().equals(""))) {
      Map map = createUniqueUsername(count);
      Iterator it = map.entrySet().iterator();
      while (it.hasNext()) {
        Map.Entry entry = (Map.Entry)it.next();
        Object username = entry.getKey();
        Object password = entry.getValue();
        UserInfo u = new UserInfo();
        u.setDelFlag(Integer.valueOf(1));
        u.setYear(userInfo.getYear());
        u.setUsername(username.toString());

        u.setPassword(password.toString());
        u.setStateFlag("0");
        if ((userInfo.getUnit() != null) && (userInfo.getUnit().getId() != null) && (!(userInfo.getUnit().getId().equals("")))) {
          Unit un = new Unit();
          un.setId(userInfo.getUnit().getId());
          u.setUnit(un);
        }
        if ((userInfo.getPeopleType() != null) && (userInfo.getPeopleType().getId() != null) && (!(userInfo.getPeopleType().getId().equals("")))) {
          PeopleType pe = new PeopleType();
          pe.setId(userInfo.getPeopleType().getId());
          u.setPeopleType(pe);
        }
        this.userInfoDAO.save(u);
      }

    }

    return true;
  }
}