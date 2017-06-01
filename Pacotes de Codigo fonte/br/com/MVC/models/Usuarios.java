/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.models;


import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import org.hibernate.annotations.GenericGenerator;


@Entity
public class Usuarios implements Serializable {

    @Id
    @GeneratedValue(generator = "s_usuarios")
    @GenericGenerator(name = "s_usuarios", strategy = "increment")
    private int idUsuarios;
    @Column(length = 100, nullable = false)
    private String userName;
    @Column(length = 100, nullable = false)
    private String email;
    @Column(length = 100, nullable = false)
    private String password;

    public Usuarios() {
    }

    public Usuarios(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    public Usuarios(int idUsuarios, String userName, String email, String password) {
        this.idUsuarios = idUsuarios;
        this.userName = userName;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
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

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Cod: "+idUsuarios+" User: "+userName+" Email: "+email+" senha: "+password; //To change body of generated methods, choose Tools | Templates.
    }
    
    
    
    

}
