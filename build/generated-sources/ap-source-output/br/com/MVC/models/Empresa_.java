package br.com.MVC.models;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Empresa.class)
public abstract class Empresa_ {

	public static volatile SingularAttribute<Empresa, String> cidade;
	public static volatile SingularAttribute<Empresa, String> endereco;
	public static volatile SingularAttribute<Empresa, String> numero;
	public static volatile SingularAttribute<Empresa, String> bairro;
	public static volatile SingularAttribute<Empresa, Integer> idEmpresa;
	public static volatile SingularAttribute<Empresa, String> nome;
	public static volatile SingularAttribute<Empresa, String> cnpj;
	public static volatile SingularAttribute<Empresa, Usuarios> usuarioEmpresa;
	public static volatile SingularAttribute<Empresa, String> cep;

}

