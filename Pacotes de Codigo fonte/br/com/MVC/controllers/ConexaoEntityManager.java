package br.com.MVC.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class ConexaoEntityManager {

    public Connection getConnection() {
        try {
            return DriverManager.getConnection(
          "jdbc:mysql://localhost/protocoloDB", "root", "masterkey");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
