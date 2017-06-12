/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.models;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Item implements Serializable {

    @Id
    @GeneratedValue(generator = "s_item")
    @GenericGenerator(name = "s_item", strategy = "increment")
    private int idItem;
    @Column(length = 150, nullable = false)
    private String nome;
    @Column(length = 255, nullable = false)
    private String tipo;
    @Column(length = 4, nullable = false)
    private String retorno;
    //Empresa
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "empresaItem", foreignKey = @ForeignKey(name = "fk_empresa_item"))
    Empresa empresaItem;

    public Item() {
    }

    public Item(String nome, String tipo, String retorno, Empresa empresaItem) {
        this.nome = nome;
        this.tipo = tipo;
        this.retorno = retorno;
        this.empresaItem = empresaItem;
    }

    public Item(int idItem, String nome, String tipo, String retorno, Empresa empresaItem) {
        this.idItem = idItem;
        this.nome = nome;
        this.tipo = tipo;
        this.retorno = retorno;
        this.empresaItem = empresaItem;
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

    public Empresa getEmpresaItem() {
        return empresaItem;
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

    public void setEmpresaItem(Empresa empresaItem) {
        this.empresaItem = empresaItem;
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
