/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Protocolo implements Serializable {

    @Id
    @GeneratedValue(generator = "s_protocolo")
    @GenericGenerator(name = "s_protocolo", strategy = "increment")
    private int idProtocolo;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date data;
    @Column(length = 255)
    private String observacoes;
    //Empresa
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "empresaProtocolo", foreignKey = @ForeignKey(name = "fk_empresa_protocolo"))
    Empresa empresaProtocolo;
    //Cliente
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "clienteProtocolo", foreignKey = @ForeignKey(name = "fk_cliente_protocolo"))
    Clientes clienteProtocolo;
//    //ItemProtocolo
//    @OneToMany(mappedBy = "protocoloItemProtocolo", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//    private List<ItemProtocolo> protocoloItemProtocolo;

    public Protocolo() {
    }

    public Protocolo(Date data, String observacoes, Empresa empresaProtocolo, Clientes clienteProtocolo) {
        this.data = data;
        this.observacoes = observacoes;
        this.empresaProtocolo = empresaProtocolo;
        this.clienteProtocolo = clienteProtocolo;
    }

    public Protocolo(int idProtocolo, Date data, String observacoes, Empresa empresaProtocolo, Clientes clienteProtocolo) {
        this.idProtocolo = idProtocolo;
        this.data = data;
        this.observacoes = observacoes;
        this.empresaProtocolo = empresaProtocolo;
        this.clienteProtocolo = clienteProtocolo;
    }

    public int getIdProtocolo() {
        return idProtocolo;
    }

    public Date getData() {
        return data;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Empresa getEmpresaProtocolo() {
        return empresaProtocolo;
    }

    public Clientes getClienteProtocolo() {
        return clienteProtocolo;
    }

    public void setIdProtocolo(int idProtocolo) {
        this.idProtocolo = idProtocolo;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setEmpresaProtocolo(Empresa empresaProtocolo) {
        this.empresaProtocolo = empresaProtocolo;
    }

    public void setClienteProtocolo(Clientes clienteProtocolo) {
        this.clienteProtocolo = clienteProtocolo;
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
