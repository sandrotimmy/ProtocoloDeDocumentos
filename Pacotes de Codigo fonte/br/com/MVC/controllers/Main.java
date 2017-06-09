/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Clientes;
import br.com.MVC.models.Empresa;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.lang.reflect.Modifier;
import java.sql.SQLException;
import java.util.List;
import javax.persistence.EntityManager;

/**
 *
 * @author Sandro
 */
public class Main {

    /**
     * @param args the command line arguments
     * @throws java.sql.SQLException
     */
    public static void main(String[] args) throws SQLException {
        ProtocoloAppCtrl p = new ProtocoloAppCtrl();
        Gson g = new Gson();
        Empresa empresa = p.getEmpresa(9);
        String json = g.toJson(empresa);

        System.out.println(g.toJson(empresa));
        System.out.println("");
        System.out.println("");
        System.out.println("");
    }
}
