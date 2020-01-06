package com.donglusoft.log.action;

import com.donglusoft.log.domain.LoggingEvent;
import com.donglusoft.log.service.LoggingEventService;
import com.opensymphony.xwork2.ActionSupport;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("loggingEventAction")
@Scope("prototype")
public class LoggingEventAction extends ActionSupport
{
  private String startTime;
  private String endTime;
  private String logType;
  private boolean success;
  private Integer start;
  private Integer limit;
  private Long results;
  private String userName;
  private List<LoggingEvent> items;
  private LoggingEvent loggingEvent;

  @Resource
  private LoggingEventService loggingEventService;

  public String query()
  {
    this.success = false;
    HashMap map = this.loggingEventService.scan();
    this.items = ((List)map.get("items"));
    this.results = ((Long)map.get("count"));
    this.success = true;
    return "success"; }

  public String findByCriteria() {
    this.success = false;
    HashMap map = this.loggingEventService.findByCriteria(this.start, this.limit, this.startTime, this.endTime, this.logType, this.userName);
    this.items = ((List)map.get("items"));
    this.results = ((Long)map.get("count"));
    this.success = true;
    return "success";
  }

  public boolean isSuccess() {
    return this.success; }

  public void setSuccess(boolean success) {
    this.success = success; }

  public Integer getStart() {
    return this.start; }

  public void setStart(Integer start) {
    this.start = start; }

  public Integer getLimit() {
    return this.limit; }

  public void setLimit(Integer limit) {
    this.limit = limit; }

  public LoggingEvent getLoggingEvent() {
    return this.loggingEvent; }

  public void setLoggingEvent(LoggingEvent loggingEvent) {
    this.loggingEvent = loggingEvent;
  }

  public List<LoggingEvent> getItems() {
    return this.items; }

  public void setItems(List<LoggingEvent> items) {
    this.items = items;
  }

  public Long getResults() {
    return this.results; }

  public void setResults(Long results) {
    this.results = results;
  }

  public String getStartTime() {
    return this.startTime; }

  public void setStartTime(String startTime) {
    this.startTime = startTime; }

  public String getEndTime() {
    return this.endTime; }

  public void setEndTime(String endTime) {
    this.endTime = endTime; }

  public String getLogType() {
    return this.logType; }

  public void setLogType(String logType) {
    this.logType = logType;
  }

  public String getUserName() {
    return this.userName; }

  public void setUserName(String userName) {
    this.userName = userName;
  }
}