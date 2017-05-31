package br.com.MVC.controllers;

import br.com.MVC.DAO.UsuariosDAO;
import br.com.MVC.models.Usuarios;

/**
 *
 * @author Sandro Machado
 */
public class UsuariosCtrl {

    private UsuariosDAO persistUsuarios;

    public UsuariosCtrl() {
        persistUsuarios = new UsuariosDAO();
    }

    public Usuarios getUsuario(Integer codUsuarios) {
        return persistUsuarios.getUsuario(codUsuarios);
    }

    public boolean cadastrarUsuario(Usuarios usuario) {
        return persistUsuarios.cadastrarUsuario(usuario);
    }
}
