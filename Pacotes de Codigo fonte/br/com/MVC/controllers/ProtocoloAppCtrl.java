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

    public Usuarios logar(String userName, String password) {
        boolean existe = usuarioCtrl.logar(userName, password);
        if (existe) {
            usuario = usuarioCtrl.logarGetUsuario(userName, password);
            return usuario;
        } else {
            return null;
        }

    }

    public Empresa cadastrarEmpresa(Empresa empresa) {
        empresa = persistEmpresa.cadastrarEmpresa(empresa);
        return empresa;
    }

    public Empresa getEmpresa(Integer codEmpresa) {
        return persistEmpresa.getEmpresa(codEmpresa);
    }

    public Empresa atualizaEmpresa(Empresa empresa) {
        return persistEmpresa.atualizaEmpresa(empresa);
    }

    public boolean removeEmpresa(int idEmpresa) {
        return persistEmpresa.removeEmpresa(idEmpresa);
    }
}
