package br.com.MVC.models;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Item.class)
public abstract class Item_ {

	public static volatile SingularAttribute<Item, String> tipo;
	public static volatile SingularAttribute<Item, String> retorno;
	public static volatile SingularAttribute<Item, String> nome;
	public static volatile SingularAttribute<Item, Integer> idItem;
	public static volatile SingularAttribute<Item, Empresa> empresaItem;

}

