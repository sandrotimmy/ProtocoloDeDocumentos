package br.com.MVC.models;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Usuarios.class)
public abstract class Usuarios_ {

	public static volatile SingularAttribute<Usuarios, String> password;
	public static volatile SingularAttribute<Usuarios, String> userName;
	public static volatile SingularAttribute<Usuarios, Empresa> empresa;
	public static volatile SingularAttribute<Usuarios, Integer> idUsuarios;
	public static volatile SingularAttribute<Usuarios, String> email;

}

