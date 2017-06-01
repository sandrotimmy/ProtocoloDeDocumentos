/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Usuarios;

/**
 *
 * @author Sandro Machado
 */
public class ProtocoloAppCtrl {

    Usuarios usuario;
    UsuariosCtrl usuarioCtrl;

    public ProtocoloAppCtrl() {
    }

    public ProtocoloAppCtrl(Usuarios usuario, UsuariosCtrl usuarioCtrl) {
        this.usuario = usuario;
        this.usuarioCtrl = usuarioCtrl;
    }

    public boolean logar(String userName, String password) {
        boolean existe = usuarioCtrl.logar(userName, password);
        if (existe) {
            usuario = usuarioCtrl.logarGetUsuario(userName, password);
        }
        return existe;
    }
}
