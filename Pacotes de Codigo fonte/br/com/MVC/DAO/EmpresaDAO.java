/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.Empresa;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class EmpresaDAO {

    private EntityManager em;
    private final ArrayList<Empresa> listaEmpresa;

    public EmpresaDAO() {
        this.listaEmpresa = new ArrayList();
    }

    public Empresa cadastrarEmpresa(Empresa empresa) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(empresa);
        em.getTransaction().commit();
        em.close();

        return empresa;
    }

    public Empresa atualizaEmpresa(Empresa empresa) {
        if (empresa != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(empresa);
            em.getTransaction().commit();
            em.close();
        }
        return empresa;
    }

    public boolean removeEmpresa(int idEmpresa) {
        em = ConexaoEntityManager.getInstance();
        Empresa empresa = em.find(Empresa.class, idEmpresa);
        try {
            if (empresa != null) {
                em.getTransaction().begin();
                em.remove(empresa);
                em.getTransaction().commit();
                em.close();
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Empresa\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaEmpresa() {
        em = ConexaoEntityManager.getInstance();
        List listaEmpresa = em.createQuery("FROM Empresa", Empresa.class).getResultList();
        return listaEmpresa;
    }

    public Empresa getEmpresa(Integer codUsuario) {
        try {
            em = ConexaoEntityManager.getInstance();
            Empresa empresa = em.createQuery("FROM Empresa where usuarioEmpresa = " + codUsuario, Empresa.class).getSingleResult();
            return empresa;
        } catch (NoResultException e) {
            return null;
        }
    }
}
