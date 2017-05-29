/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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
        Connection con = (Connection) new ConexaoEntityManager().getConnection();
    if (con != null) {
            System.out.println("Conexao estabelecida!");
   
} else {
            System.out.println("Não conectado!");
}

    String sql = "insert into usuarios (username, email, senha) values (?,?,?)";
    
     PreparedStatement stmt = con.prepareStatement(sql);
     stmt.setString(1, "sandro");
     stmt.setString(2, "sandro");
     stmt.setString(3, "sandro");
     stmt.execute();
     stmt.close();
    
    }

}
