package br.com.MVC.models;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Protocolo.class)
public abstract class Protocolo_ {

	public static volatile SingularAttribute<Protocolo, String> observacoes;
	public static volatile SingularAttribute<Protocolo, Date> data;
	public static volatile SingularAttribute<Protocolo, Clientes> clienteProtocolo;
	public static volatile SingularAttribute<Protocolo, Empresa> empresaProtocolo;
	public static volatile SingularAttribute<Protocolo, Integer> idProtocolo;
	public static volatile ListAttribute<Protocolo, ItemProtocolo> protocoloItemProtocolo;

}

