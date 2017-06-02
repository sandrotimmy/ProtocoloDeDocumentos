/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Empresa;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import java.sql.SQLException;
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
        Empresa empresa = new Empresa("516546", "sdfsdfsdf", "fgdfgfd", "fgdgfd", "fdfgdf", "fdgdfg", "dfgdf");
        empresa = p.cadastrarEmpresa(empresa);
        Gson gson = new Gson();
        String json = gson.toJson(empresa);
        
    }
}
