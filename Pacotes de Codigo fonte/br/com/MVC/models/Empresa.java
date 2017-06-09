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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Empresa implements Serializable {

    @Id
    @GeneratedValue(generator = "s_empresa")
    @GenericGenerator(name = "s_empresa", strategy = "increment")
    private int idEmpresa;
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
    //Usuario
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "usuarioEmpresa", foreignKey = @ForeignKey(name = "fk_usuario_empresa"))
    private Usuarios usuarioEmpresa;
//    //cliente
//    @OneToMany(mappedBy = "empresaCliente", fetch = FetchType.EAGER)
//    private List<Clientes> listClientes;
    //Protocolo
    @OneToMany(mappedBy = "empresaProtocolo", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Protocolo> listProtocolos;
//    //Item
//    @OneToMany(mappedBy = "empresaItem", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//    private List<Item> listItens;

    public Empresa() {
    }

    public Empresa(String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
    }

    public Empresa(int idEmpresa, String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep) {
        this.idEmpresa = idEmpresa;
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
    }

    public Empresa(int idEmpresa, String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep, Usuarios usuarioEmpresa, List<Protocolo> listProtocolos) {
        this.idEmpresa = idEmpresa;
        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.usuarioEmpresa = usuarioEmpresa;
        this.listProtocolos = listProtocolos;
    }

    public Empresa(String cnpj, String nome, String endereco, String numero, String bairro, String cidade, String cep, Usuarios usuarioEmpresa, List<Protocolo> listProtocolos) {

        this.cnpj = cnpj;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.usuarioEmpresa = usuarioEmpresa;
        this.listProtocolos = listProtocolos;

    }

    public int getIdEmpresa() {
        return idEmpresa;
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

    public Usuarios getUsuarioEmpresa() {
        return usuarioEmpresa;
    }

    public List<Protocolo> getListProtocolos() {
        return listProtocolos;
    }

    public void setIdEmpresa(int idEmpresa) {
        this.idEmpresa = idEmpresa;
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

    public void setUsuarioEmpresa(Usuarios usuarioEmpresa) {
        this.usuarioEmpresa = usuarioEmpresa;
    }

    public void setListClientes(List<Clientes> listClientes) {
//        this.listClientes = listClientes;
    }

    public void setListProtocolos(List<Protocolo> listProtocolos) {
        this.listProtocolos = listProtocolos;
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
