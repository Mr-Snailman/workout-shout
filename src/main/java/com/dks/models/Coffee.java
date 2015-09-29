package com.dks.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Coffee {

  @Id
  private String _id;
  private String name;
  private String time;
  private String updated;

  public Coffee() {
    this._id = null;
    this.name = "";
    this.time = "";
    this.updated = "";
  }

  public String getId () {
    return this._id;
  }

  public void setId(String id) {
    this._id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTime() {
    return this.time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public String getUpdated() {
    return this.updated;
  }

  public void setUpdated(String updated) {
    this.updated = updated;
  }
}
