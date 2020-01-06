package com.donglusoft.sysconf.action;

import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.service.PeopleService;
import com.opensymphony.xwork2.ActionSupport;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("peopleAction")
@Scope("prototype")
public class PeopleAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private int start;
	private int limit;
	private People people;
	private boolean success = false;
	private List<People> peopleItems;
	private int totalPeopleItem;
	private String queryConditions;
	private String attribute;
	private String value;
	private String flag;
	private String delData;
	private String sortInfo;
	private String path;

	@Resource
	private PeopleService peopleService;

	public String importFromExcel() {
		try {
			this.peopleService.importFromExcel(this.path);
			setSuccess(true);
		} catch (Exception e) {
			this.success = false;
			e.printStackTrace();
		}
		return "success";
	}

	public String sort() {
		try {
			this.peopleService.sort(this.sortInfo);
			this.success = true;
		} catch (Exception e) {
			this.success = false;
			e.printStackTrace();
		}
		return "success";
	}

	public String del() {
		try {
			this.peopleService.del(this.delData);
			this.success = true;
		} catch (Exception e) {
			this.success = false;
			e.printStackTrace();
		}
		return "success";
	}

	public String searchByCondition() {
		try {
			if (people.getFields1().equals("3")) {// 是群众测评
				peopleItems = peopleService.searchByCondition(people);
				setSuccess(true);
			} else {// 非群众测评
				search();
				setSuccess(true);
			}
		} catch (Exception e) {
			setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public String search() {
		try {
			Map peopleItemMap = this.peopleService.search(this.queryConditions, this.start, this.limit);
			this.peopleItems = ((List) peopleItemMap.get("items"));
			this.totalPeopleItem = Integer.parseInt(peopleItemMap.get("count").toString());
			this.success = true;
		} catch (Exception e) {
			this.success = false;
			e.printStackTrace();
		}
		return "success";
	}

	public String saveOrUpdate() {
		try {
			this.flag = this.peopleService.saveOrUpdate(this.flag, this.attribute, this.value);
			this.success = true;
		} catch (Exception e) {
			this.success = false;
			e.printStackTrace();
		}
		return "success";
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public People getPeople() {
		return this.people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

	public String getSortInfo() {
		return this.sortInfo;
	}

	public void setSortInfo(String sortInfo) {
		this.sortInfo = sortInfo;
	}

	public String getDelData() {
		return this.delData;
	}

	public void setDelData(String delData) {
		this.delData = delData;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getAttribute() {
		return this.attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getQueryConditions() {
		return this.queryConditions;
	}

	public void setQueryConditions(String queryConditions) {
		this.queryConditions = queryConditions;
	}

	public int getStart() {
		return this.start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return this.limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<People> getPeopleItems() {
		return this.peopleItems;
	}

	public void setPeopleItems(List<People> peopleItems) {
		this.peopleItems = peopleItems;
	}

	public int getTotalPeopleItem() {
		return this.totalPeopleItem;
	}

	public void setTotalPeopleItem(int totalPeopleItem) {
		this.totalPeopleItem = totalPeopleItem;
	}
}