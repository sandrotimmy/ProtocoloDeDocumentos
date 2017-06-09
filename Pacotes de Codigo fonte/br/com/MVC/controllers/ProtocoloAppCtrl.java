/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.DAO.ClientesDAO;
import br.com.MVC.DAO.EmpresaDAO;
import br.com.MVC.DAO.ItemDAO;
import br.com.MVC.DAO.ProtocoloDAO;
import br.com.MVC.models.Clientes;
import br.com.MVC.models.Empresa;
import br.com.MVC.models.Item;
import br.com.MVC.models.Protocolo;
import br.com.MVC.models.Usuarios;
import java.util.List;

/**
 *
 * @author Sandro Machado
 */
public class ProtocoloAppCtrl {

    Usuarios usuario;
    Empresa empresa;
    EmpresaDAO persistEmpresa;
    UsuariosCtrl usuarioCtrl;
    Clientes cliente;
    ClientesDAO persistClientes;
    Item item;
    ItemDAO persistItem;
    Protocolo protocolo;
    ProtocoloDAO persistProtocolo;

    public ProtocoloAppCtrl() {
        usuario = new Usuarios();
        empresa = new Empresa();
        persistEmpresa = new EmpresaDAO();
        usuarioCtrl = new UsuariosCtrl();
        cliente = new Clientes();
        persistClientes = new ClientesDAO();
        item = new Item();
        persistItem = new ItemDAO();
        protocolo = new Protocolo();
        persistProtocolo = new ProtocoloDAO();
    }

    public Usuarios logar(String userName, String password) {
        boolean existe = usuarioCtrl.logar(userName, password);
        if (existe) {
            usuario = usuarioCtrl.logarGetUsuario(userName, password);
            return usuario;
        } else {
            return null;
        }

    }

    public Empresa cadastrarEmpresa(Empresa empresa) {
        empresa = persistEmpresa.cadastrarEmpresa(empresa);
        return empresa;
    }

    public Empresa getEmpresa(Integer codUsuario) {
        return persistEmpresa.getEmpresa(codUsuario);
    }

    public Empresa atualizaEmpresa(Empresa empresa) {
        return persistEmpresa.atualizaEmpresa(empresa);
    }

    public boolean removeEmpresa(int idEmpresa) {
        return persistEmpresa.removeEmpresa(idEmpresa);
    }

    public Clientes cadastrarCliente(Clientes cliente) {
        cliente = persistClientes.cadastrarCliente(cliente);
        return cliente;
    }

    public List getListaClientes(int codEmpresa) {
        return persistClientes.getListaClientes(codEmpresa);
    }

    public boolean atualizaCliente(Clientes cliente) {
        return persistClientes.atualizaCliente(cliente);
    }

    public boolean removeCliente(int idCliente) {
        return persistClientes.removeCliente(idCliente);
    }

    public Item cadastrarItem(Item item) {
        return persistItem.cadastrarItem(item);
    }

    public List getListaItem(int codEmpresa) {
        return persistItem.getListaItem(codEmpresa);
    }

    public boolean atualizaItem(Item item) {
        return persistItem.atualizaItem(item);
    }

    public boolean removeItem(int idItem) {
        return persistItem.removeItem(idItem);
    }
    
    public int getProximoCodProtocolo() {
        return persistProtocolo.getProximoCodProtocolo();
    }
}
