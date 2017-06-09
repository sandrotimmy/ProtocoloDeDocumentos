/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.models;

import java.io.Serializable;
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
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Clientes implements Serializable {

    @Id
    @GeneratedValue(generator = "s_cliente")
    @GenericGenerator(name = "s_cliente", strategy = "increment")
    private int idCliente;
    @Column(length = 18, nullable = false)
    private String cnpj;
    @Column(length = 255, nullable = false)
    private String nome;
    @Column(length = 255)
    private String endereco;
    @Column(length = 8)
    private String numero;
    @Column(length = 20)
    private String bairro;
    @Column(length = 70)
    private String cidade;
    @Column(length = 10)
    private String cep;
    //empresa
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "empresaCliente", foreignKey = @ForeignKey(name = "fk_empresa_cliente"))
    Empresa empresaCliente;
    //Protocolo
    @OneToMany(mappedBy = "clienteProtocolo", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Protocolo> listProtocolo;

    public Clientes() {
    }

    public Clientes(String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep, Empresa empresaCliente, List<Protocolo> listProtocolo) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.empresaCliente = empresaCliente;
        this.listProtocolo = listProtocolo;
    }

    public Clientes(int idCliente, String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep, Empresa empresaCliente, List<Protocolo> listProtocolo) {
        this.idCliente = idCliente;
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.empresaCliente = empresaCliente;
        this.listProtocolo = listProtocolo;
    }
    public Clientes(String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep, Empresa empresaCliente) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.empresaCliente = empresaCliente;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public String getCnpj() {
        return cnpj;
    }

    public String getNome() {
        return nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getNumero() {
        return numero;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getCep() {
        return cep;
    }

    public Empresa getEmpresaCliente() {
        return empresaCliente;
    }

    public List<Protocolo> getListProtocolo() {
        return listProtocolo;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public void setEmpresaCliente(Empresa empresaCliente) {
        this.empresaCliente = empresaCliente;
    }

    public void setListProtocolo(List<Protocolo> listProtocolo) {
        this.listProtocolo = listProtocolo;
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
