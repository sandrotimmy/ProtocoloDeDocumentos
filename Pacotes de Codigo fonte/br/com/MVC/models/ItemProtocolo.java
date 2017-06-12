package br.com.MVC.models;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class ItemProtocolo implements Serializable {

    @Id
    @GeneratedValue(generator = "s_itemProtocolo")
    @GenericGenerator(name = "s_itemProtocolo", strategy = "increment")
    private int idItem;
    @Column(length = 150, nullable = false)
    private String nome;
    @Column(length = 255, nullable = false)
    private String tipo;
    @Column(length = 4, nullable = false)
    private String retorno;
    //Protocolo
    @ManyToOne
    @JoinColumn(name = "protocoloItemProtocolo", foreignKey = @ForeignKey(name = "fk_protocolo_itemProtocolo"))
    Protocolo protocoloItemProtocolo;

    public ItemProtocolo() {
    }

    public ItemProtocolo(String nome, String tipo, String retorno, Protocolo protocoloItemProtocolo) {
        this.nome = nome;
        this.tipo = tipo;
        this.retorno = retorno;
        this.protocoloItemProtocolo = protocoloItemProtocolo;
    }

    public ItemProtocolo(int idItem, String nome, String tipo, String retorno, Protocolo protocoloItemProtocolo) {
        this.idItem = idItem;
        this.nome = nome;
        this.tipo = tipo;
        this.retorno = retorno;
        this.protocoloItemProtocolo = protocoloItemProtocolo;
    }

    public int getIdItem() {
        return idItem;
    }

    public String getNome() {
        return nome;
    }

    public String getTipo() {
        return tipo;
    }

    public String getRetorno() {
        return retorno;
    }

    public Protocolo getProtocoloItemProtocolo() {
        return protocoloItemProtocolo;
    }

    public void setIdItem(int idItem) {
        this.idItem = idItem;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setRetorno(String retorno) {
        this.retorno = retorno;
    }

    public void setProtocoloItemProtocolo(Protocolo protocoloItemProtocolo) {
        this.protocoloItemProtocolo = protocoloItemProtocolo;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int hashCode() {
        return super.hashCode(); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String toString() {
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }
}
