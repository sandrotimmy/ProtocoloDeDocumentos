/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.models;

/**
 *
 * @author Sandro Machado
 */
public class Usuarios {
    private int idUsuarios;
    private String userName;
    private String email;
    private String senha;

    public Usuarios(int idUsuarios, String userName, String email, String senha) {
        this.idUsuarios = idUsuarios;
        this.userName = userName;
        this.email = email;
        this.senha = senha;
    }

    public Usuarios() {
    }

    public int getIdUsuarios() {
        return idUsuarios;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public void setIdUsuarios(int idUsuarios) {
        this.idUsuarios = idUsuarios;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
    
}
