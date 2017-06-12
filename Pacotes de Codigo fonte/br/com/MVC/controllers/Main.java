/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Clientes;
import br.com.MVC.models.Empresa;
import br.com.MVC.models.Protocolo;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.lang.reflect.Modifier;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;
import javax.persistence.EntityManager;
import org.json.JSONException;

/**
 *
 * @author Sandro
 */
public class Main {

    /**
     * @param args the command line arguments
     * @throws java.sql.SQLException
     */
    public static void main(String[] args) {
        ProtocoloAppCtrl protocoloCtrl = new ProtocoloAppCtrl();
        Protocolo protocolo = protocoloCtrl.getProtocolo(Integer.parseInt("1"));
        Gson g = new Gson();
        String temp = g.toJson(protocolo);
        System.out.println(temp);
    }
}
