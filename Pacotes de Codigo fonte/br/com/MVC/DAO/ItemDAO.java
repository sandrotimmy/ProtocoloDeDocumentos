/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.Item;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class ItemDAO {
        private EntityManager em;
    private final ArrayList<Item> listaItem;

    public ItemDAO() {
        this.listaItem = new ArrayList();
    }

    public Item cadastrarItem(Item item) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(item);
        em.getTransaction().commit();
        em.close();

        return item;
    }

    public void atualizaItem(Item item) {
        if (item != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(item);
            em.getTransaction().commit();
            em.close();
        }
        JOptionPane.showMessageDialog(null, "Item Atualizado com Sucesso!");
    }

    public boolean removeItem(int idItem) {
        em = ConexaoEntityManager.getInstance();
        Item item = em.find(Item.class, idItem);
        try {
            if (item != null) {
                em.getTransaction().begin();
                em.remove(item);
                em.getTransaction().commit();
                em.close();
                JOptionPane.showMessageDialog(null, "Item excluida com Sucesso!");
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Item\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaItem() {
        em = ConexaoEntityManager.getInstance();
        List listaItem = em.createQuery("FROM Item", Item.class).getResultList();
        return listaItem;
    }

    public Item getItem(Integer codItem) {
        em = ConexaoEntityManager.getInstance();
        Item item = em.find(Item.class, codItem);
        return item;
    }
}
