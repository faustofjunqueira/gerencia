package br.ufrj.dcc.gerencia.domain.base;

import javax.naming.Name;

/**
 * Created by fausto on 4/3/16.
 */

public abstract class LCIModel {

  private String id;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public abstract <TReturn extends LciModelVO> TReturn toVO();
  public abstract <TReturn extends LciModelPO> TReturn toPO();
}


