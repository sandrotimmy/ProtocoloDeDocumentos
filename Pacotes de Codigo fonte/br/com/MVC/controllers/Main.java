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
        
        UsuariosCtrl ctrl = new UsuariosCtrl();
        
        Usuarios usuario = ctrl.getUsuario(01);
        
        System.out.println(usuario.toString());
        
//        EntityManager em = ConexaoEntityManager.getInstance();
//        
//        Usuarios usuario = em.createQuery("FROM Usuarios" , Usuarios.class).getSingleResult();
//        System.out.println(usuario.toString());
//        em.close();
        
    }


}
