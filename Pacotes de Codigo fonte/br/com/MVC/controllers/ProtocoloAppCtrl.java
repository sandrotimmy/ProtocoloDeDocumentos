/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.DAO.ClientesDAO;
import br.com.MVC.DAO.EmpresaDAO;
import br.com.MVC.DAO.ItemDAO;
import br.com.MVC.DAO.ItemProtocoloDAO;
import br.com.MVC.DAO.ProtocoloDAO;
import br.com.MVC.models.Clientes;
import br.com.MVC.models.Empresa;
import br.com.MVC.models.Item;
import br.com.MVC.models.ItemProtocolo;
import br.com.MVC.models.Protocolo;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Sandro Machado
 */
public class ProtocoloAppCtrl {

    Gson gson;
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
    ItemProtocolo itemProtocolo;
    ItemProtocoloDAO persistItemProtocolo;

    public ProtocoloAppCtrl() {
        gson = new Gson();
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
        itemProtocolo = new ItemProtocolo();
        persistItemProtocolo = new ItemProtocoloDAO();
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

    public boolean cadastrarProtocolo(String protocoloJson) throws JSONException, ParseException {
        System.out.println(protocoloJson);
        JSONObject json = new JSONObject(protocoloJson);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = df.parse(json.getString("data"));
        protocolo.setData(date);
        protocolo.setObservacoes(json.getString("observacoes"));
        JSONObject jsonEmpresaProtocolo = json.getJSONObject("empresaProtocolo");
        Empresa empresaJson = (Empresa) gson.fromJson(jsonEmpresaProtocolo.toString(), Empresa.class);
        protocolo.setEmpresaProtocolo(empresaJson);
        JSONObject jsonClienteProtocolo = json.getJSONObject("clienteProtocolo");
        Clientes clientesJson = (Clientes) gson.fromJson(jsonClienteProtocolo.toString(), Clientes.class);
        protocolo.setClienteProtocolo(clientesJson);
        Protocolo protocoloTemp = persistProtocolo.cadastrarProtocolo(protocolo);
        JSONArray jsonListItensProtocolo = json.getJSONArray("listaItensProtocolo");
        boolean result = cadastrarItemProtocolo(jsonListItensProtocolo, protocoloTemp);
        return result;
    }

    public Clientes getCliente(Integer codClientes) {
        return persistClientes.getCliente(codClientes);
    }

    public List getListaProtocolo(int codProtocolo) {
        return persistProtocolo.getListaProtocolo(codProtocolo);
    }

    public boolean cadastrarItemProtocolo(JSONArray jsonListItensProtocolo, Protocolo protocoloCadastrado) throws JSONException {
        for (int i = 0; i < jsonListItensProtocolo.length(); i++) {
            ItemProtocolo itemProtocoloTemp = (ItemProtocolo) gson.fromJson(jsonListItensProtocolo.getString(i), ItemProtocolo.class);
            ItemProtocolo itemProtocoloPersist = new ItemProtocolo(
                    itemProtocoloTemp.getNome(),
                    itemProtocoloTemp.getTipo(),
                    itemProtocoloTemp.getRetorno(),
                    protocoloCadastrado
            );
            persistItemProtocolo.cadastrarItemProtocolo(itemProtocoloPersist);
        }
        System.out.println(jsonListItensProtocolo.toString());
        System.out.println("");

        return true;
    }

    public boolean removeProtocolo(int idProtocolo) {
        return persistProtocolo.removeProtocolo(idProtocolo);
    }
}
