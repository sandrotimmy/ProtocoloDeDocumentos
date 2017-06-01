/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.Clientes;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class ClientesDAO {
        private EntityManager em;
    private final ArrayList<Clientes> listaClientes;

    public ClientesDAO() {
        this.listaClientes = new ArrayList();
    }

    public Clientes cadastrarCliente(Clientes cliente) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(cliente);
        em.getTransaction().commit();
        em.close();

        return cliente;
    }

    public void atualizaCliente(Clientes cliente) {
        if (cliente != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(cliente);
            em.getTransaction().commit();
            em.close();
        }
        JOptionPane.showMessageDialog(null, "Cliente Atualizado com Sucesso!");
    }

    public boolean removeCliente(int idCliente) {
        em = ConexaoEntityManager.getInstance();
        Clientes cliente = em.find(Clientes.class, idCliente);
        try {
            if (cliente != null) {
                em.getTransaction().begin();
                em.remove(cliente);
                em.getTransaction().commit();
                em.close();
                JOptionPane.showMessageDialog(null, "Cliente excluida com Sucesso!");
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Cliente\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaClientes() {
        em = ConexaoEntityManager.getInstance();
        List listaClientes = em.createQuery("FROM Clientes", Clientes.class).getResultList();
        return listaClientes;
    }

    public Clientes getCliente(Integer codClientes) {
        em = ConexaoEntityManager.getInstance();
        Clientes cliente = em.find(Clientes.class, codClientes);
        return cliente;
    }
}
