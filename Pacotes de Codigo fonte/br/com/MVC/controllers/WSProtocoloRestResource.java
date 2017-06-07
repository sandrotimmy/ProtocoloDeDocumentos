package br.com.MVC.controllers;

import br.com.MVC.models.Empresa;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author Sandro Machado
 */
@Path("WSProtocoloRest")
public class WSProtocoloRestResource {

    private final UsuariosCtrl usuariosCtrl;
    private final ProtocoloAppCtrl protocoloCtrl;
    private final Gson gson;

    public WSProtocoloRestResource() {
        usuariosCtrl = new UsuariosCtrl();
        protocoloCtrl = new ProtocoloAppCtrl();
        gson = new Gson();
    }

//    @POST
//    @Produces("application/json")
//    @Path("usuarios/cadastrar/{userName}/{email}/{password}")
//    public String cadastrarUsuarios(
//            @PathParam("userName") String userName,
//            @PathParam("email") String email,
//            @PathParam("password") String password) {
//        Usuarios usuario = new Usuarios(userName, email, password);
//        usuario = usuariosCtrl.cadastrarUsuario(usuario);
//        return gson.toJson(usuario);
//    }
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("usuarios/cadastrar")
    public String cadastrarUsuarios(String usuario) {

        Usuarios user = (Usuarios) gson.fromJson(usuario, Usuarios.class);
        user = usuariosCtrl.cadastrarUsuario(user);
        return gson.toJson(user);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("usuarios/logar")
    public String logar(String login) throws JSONException {
        JSONObject loginJson = new JSONObject(login);
        String userName = loginJson.getString("userName");
        String password = loginJson.getString("password");
        Usuarios usuario = protocoloCtrl.logar(userName, password);
        return gson.toJson(usuario);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("empresa/cadastrar")
    public String cadastrarEmpresa(String empresa) {
        Empresa empresaJson = (Empresa) gson.fromJson(empresa, Empresa.class);
        Empresa empresaCadastrada = protocoloCtrl.cadastrarEmpresa(empresaJson);
        String json = gson.toJson(empresaCadastrada);
        return json;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("empresa/atualizar")
    public String atualizaEmpresa(String empresa) {
        Empresa empresaJson = (Empresa) gson.fromJson(empresa, Empresa.class);
        Empresa empresaAtualizada = protocoloCtrl.atualizaEmpresa(empresaJson);
        String json = gson.toJson(empresaAtualizada);
        return json;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("empresa/getEmpresa/{codUsuario}")
    public String getEmpresa(@PathParam("codUsuario") String codUsuario) {
        Empresa empresa = protocoloCtrl.getEmpresa(Integer.parseInt(codUsuario));
        String json = gson.toJson(empresa);
        return json;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("empresa/excluir")
    public String removeEmpresa(String idEmpresa) throws JSONException {
        JSONObject empresaJson = new JSONObject(idEmpresa);
        int idEmpresaJson = empresaJson.getInt("idEmpresa");
        String result = gson.toJson(protocoloCtrl.removeEmpresa(idEmpresaJson));
        return result;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
