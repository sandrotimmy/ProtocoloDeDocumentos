/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.ItemProtocolo;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class ItemProtocoloDAO {
        private EntityManager em;
    private final ArrayList<ItemProtocolo> listaItemProtocolo;

    public ItemProtocoloDAO() {
        this.listaItemProtocolo = new ArrayList();
    }

    public ItemProtocolo cadastrarItemProtocolo(ItemProtocolo itemProtocolo) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(itemProtocolo);
        em.getTransaction().commit();
        em.close();

        return itemProtocolo;
    }

    public void atualizaItemProtocolo(ItemProtocolo itemProtocolo) {
        if (itemProtocolo != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(itemProtocolo);
            em.getTransaction().commit();
            em.close();
        }
        JOptionPane.showMessageDialog(null, "ItemProtocolo Atualizado com Sucesso!");
    }

    public boolean removeItemProtocolo(int idItemProtocolo) {
        em = ConexaoEntityManager.getInstance();
        ItemProtocolo itemProtocolo = em.find(ItemProtocolo.class, idItemProtocolo);
        try {
            if (itemProtocolo != null) {
                em.getTransaction().begin();
                em.remove(itemProtocolo);
                em.getTransaction().commit();
                em.close();
                JOptionPane.showMessageDialog(null, "ItemProtocolo excluida com Sucesso!");
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este ItemProtocolo\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaItemProtocolo(int codProtocolo) {
        em = ConexaoEntityManager.getInstance();
        List listaItemProtocolo = em.createQuery("FROM ItemProtocolo where protocoloItemProtocolo = " + codProtocolo, ItemProtocolo.class).getResultList();
        return listaItemProtocolo;
    }

    public ItemProtocolo getItemProtocolo(Integer codItemProtocolo) {
        em = ConexaoEntityManager.getInstance();
        ItemProtocolo itemProtocolo = em.find(ItemProtocolo.class, codItemProtocolo);
        return itemProtocolo;
    }
}
