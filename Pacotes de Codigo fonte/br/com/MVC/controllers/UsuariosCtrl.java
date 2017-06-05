package br.com.MVC.controllers;

import br.com.MVC.DAO.UsuariosDAO;
import br.com.MVC.models.Usuarios;
import java.util.List;

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

    public Usuarios cadastrarUsuario(Usuarios usuario) {
        return persistUsuarios.cadastrarUsuario(usuario);
    }

    public boolean logar(String userName, String password) {
        List<Usuarios> listaUsuarios = persistUsuarios.getListaUsuarios();
        boolean existe = false;
        for (int i = 0; i < listaUsuarios.size(); i++) {
            String usuarioTemp = listaUsuarios.get(i).getUserName();
            String senhaTemp = listaUsuarios.get(i).getPassword();
            if (usuarioTemp.equalsIgnoreCase(userName) && senhaTemp.equalsIgnoreCase(password)) {
                existe = true;
                break;
            }
        }
        return existe;
    }
    
        public Usuarios logarGetUsuario (String userName, String password) {
        List<Usuarios> listaUsuarios = persistUsuarios.getListaUsuarios();

        for (int i = 0; i < listaUsuarios.size(); i++) {
            String usuarioTemp = listaUsuarios.get(i).getUserName();
            String senhaTemp = listaUsuarios.get(i).getPassword();
            if (usuarioTemp.equalsIgnoreCase(userName) && senhaTemp.equalsIgnoreCase(password)) {
                return listaUsuarios.get(i);
            }
        }
        return null;
    }
}
