
package br.com.MVC.DAO;

import br.com.MVC.controllers.ConexaoEntityManager;
import br.com.MVC.models.Usuarios;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import javax.persistence.RollbackException;
import javax.swing.JOptionPane;

/**
 *
 * @author Sandro Machado
 */
public class UsuariosDAO {

    private EntityManager em;
    private final ArrayList<Usuarios> listaUsuarios;

    public UsuariosDAO() {
        this.listaUsuarios = new ArrayList();
    }

    public Usuarios cadastrarUsuario(Usuarios usuario) {

        em = ConexaoEntityManager.getInstance();
        em.getTransaction().begin();
        em.persist(usuario);
        em.getTransaction().commit();
        em.close();

        return usuario;
    }

    public void atualizaUsuario(Usuarios usuario) {
        if (usuario != null) {
            em = ConexaoEntityManager.getInstance();
            em.getTransaction().begin();
            em.merge(usuario);
            em.getTransaction().commit();
            em.close();
        }
        JOptionPane.showMessageDialog(null, "Usuario Atualizado com Sucesso!");
    }

    public boolean removeUsuario(int idUsuario) {
        em = ConexaoEntityManager.getInstance();
        Usuarios usuario = em.find(Usuarios.class, idUsuario);
        try {
            if (usuario != null) {
                em.getTransaction().begin();
                em.remove(usuario);
                em.getTransaction().commit();
                em.close();
                JOptionPane.showMessageDialog(null, "Usuario excluida com Sucesso!");
            }
        } catch (RollbackException e) {
            JOptionPane.showMessageDialog(null, "Não é possivel Excluir este Usuario\nEstá vinculado a outro Processo!");
            return false;
        }
        return true;
    }

    public List getListaUsuarios() {
        em = ConexaoEntityManager.getInstance();
        List listaUsuarios = em.createQuery("FROM Usuarios", Usuarios.class).getResultList();
        return listaUsuarios;
    }

    public Usuarios getUsuario(Integer codUsuarios) {
        em = ConexaoEntityManager.getInstance();
        Usuarios usuario = em.find(Usuarios.class, codUsuarios);
        return usuario;
    }

    @Override
    public String toString() {
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int hashCode() {
        return super.hashCode(); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final UsuariosDAO other = (UsuariosDAO) obj;
        if (!Objects.equals(this.em, other.em)) {
            return false;
        }
        return Objects.equals(this.listaUsuarios, other.listaUsuarios);
    }
}
