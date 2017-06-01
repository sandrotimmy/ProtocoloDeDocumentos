/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Usuarios;
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
        UsuariosCtrl usuariosCtrl  = new UsuariosCtrl();

        boolean existe = usuariosCtrl.logar("sandro", "033238");
        
        System.out.println(existe);
    }


}
