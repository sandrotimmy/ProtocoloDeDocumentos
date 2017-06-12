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

    public ProtocoloDAO() {

    }

        //Métodos do Cadastro de Historicos
    public int getProximoCodProtocolo() {
        em = ConexaoEntityManager.getInstance();
        int posicao;
        Object ultimo;
        ultimo = em.createNativeQuery("SELECT max(idProtocolo) as idProtocolo from protocolo").getSingleResult();
        if (ultimo == null) {
            posicao = 1;
        } else {
            posicao = Integer.parseInt(ultimo.toString()) + 1;
        }
        return posicao;
    }
    
    public Protocolo cadastrarProtocolo(Protocolo protocolo) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(protocolo);
        em.getTransaction().commit();
        em.close();

        return protocolo;
    }

    public Protocolo atualizaProtocolo(Protocolo protocolo) {
        if (protocolo != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(protocolo);
            em.getTransaction().commit();
            em.close();
        }
        return protocolo;
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
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Protocolo\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaProtocolo(int codProtocolo) {
        em = ConexaoEntityManager.getInstance();
        List listaProtocolo = em.createQuery("FROM Protocolo where empresaProtocolo = " + codProtocolo, Protocolo.class).getResultList();
        
        return listaProtocolo;
    }

    public Protocolo getProtocolo(Integer codProtocolo) {
        em = ConexaoEntityManager.getInstance();
        Protocolo protocolo = em.find(Protocolo.class, codProtocolo);
        return protocolo;
    }
}
