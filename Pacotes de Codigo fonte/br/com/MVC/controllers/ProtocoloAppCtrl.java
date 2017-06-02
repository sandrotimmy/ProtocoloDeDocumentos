/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.DAO.EmpresaDAO;
import br.com.MVC.models.Empresa;
import br.com.MVC.models.Usuarios;

/**
 *
 * @author Sandro Machado
 */
public class ProtocoloAppCtrl {

    Usuarios usuario;
    Empresa empresa;
    EmpresaDAO persistEmpresa;
    UsuariosCtrl usuarioCtrl;

    public ProtocoloAppCtrl() {
        usuario = new Usuarios();
        empresa = new Empresa();
        persistEmpresa = new EmpresaDAO();
        usuarioCtrl = new UsuariosCtrl();
        
        
    }

    public boolean logar(String userName, String password) {
        boolean existe = usuarioCtrl.logar(userName, password);
        if (existe) {
            usuario = usuarioCtrl.logarGetUsuario(userName, password);
        }
        return existe;
    }
    
    public Empresa cadastrarEmpresa(Empresa empresa) {
        empresa.setUsuarioEmpresa(usuario);
        empresa = persistEmpresa.cadastrarEmpresa(empresa);
        return empresa;
    }
}
