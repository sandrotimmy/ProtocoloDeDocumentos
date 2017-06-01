/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.Protocolo;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class ProtocoloDAO {
        private EntityManager em;
    private final ArrayList<Protocolo> listaProtocolo;

    public ProtocoloDAO() {
        this.listaProtocolo = new ArrayList();
    }

    public Protocolo cadastrarProtocolo(Protocolo protocolo) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(protocolo);
        em.getTransaction().commit();
        em.close();

        return protocolo;
    }

    public void atualizaProtocolo(Protocolo protocolo) {
        if (protocolo != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(protocolo);
            em.getTransaction().commit();
            em.close();
        }
        JOptionPane.showMessageDialog(null, "Protocolo Atualizado com Sucesso!");
    }

    public boolean removeProtocolo(int idProtocolo) {
        em = ConexaoEntityManager.getInstance();
        Protocolo protocolo = em.find(Protocolo.class, idProtocolo);
        try {
            if (protocolo != null) {
                em.getTransaction().begin();
                em.remove(protocolo);
                em.getTransaction().commit();
                em.close();
                JOptionPane.showMessageDialog(null, "Protocolo excluida com Sucesso!");
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Protocolo\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaProtocolo() {
        em = ConexaoEntityManager.getInstance();
        List listaProtocolo = em.createQuery("FROM Protocolo", Protocolo.class).getResultList();
        return listaProtocolo;
    }

    public Protocolo getProtocolo(Integer codProtocolo) {
        em = ConexaoEntityManager.getInstance();
        Protocolo protocolo = em.find(Protocolo.class, codProtocolo);
        return protocolo;
    }
}
