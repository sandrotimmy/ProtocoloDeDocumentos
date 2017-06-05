package br.com.MVC.models;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Clientes.class)
public abstract class Clientes_ {

	public static volatile SingularAttribute<Clientes, String> cidade;
	public static volatile SingularAttribute<Clientes, Integer> idCliente;
	public static volatile SingularAttribute<Clientes, String> endereco;
	public static volatile SingularAttribute<Clientes, String> numero;
	public static volatile SingularAttribute<Clientes, String> bairro;
	public static volatile SingularAttribute<Clientes, Empresa> empresaCliente;
	public static volatile ListAttribute<Clientes, Protocolo> listProtocolo;
	public static volatile SingularAttribute<Clientes, String> nome;
	public static volatile SingularAttribute<Clientes, String> cnpj;
	public static volatile SingularAttribute<Clientes, String> cep;

}

