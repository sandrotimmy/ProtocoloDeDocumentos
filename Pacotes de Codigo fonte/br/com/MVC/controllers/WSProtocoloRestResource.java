/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import br.com.MVC.models.Empresa;
import br.com.MVC.models.Usuarios;
import com.google.gson.Gson;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

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

    @POST
    @Produces("application/json")
    @Path("usuarios/cadastrar/{userName}/{email}/{password}")
    public String cadastrarUsuarios(
            @PathParam("userName") String userName,
            @PathParam("email") String email,
            @PathParam("password") String password) {
        Usuarios usuario = new Usuarios(userName, email, password);
        usuario = usuariosCtrl.cadastrarUsuario(usuario);
        return gson.toJson(usuario);
    }

    @POST
    @Produces("application/json")
    @Path("usuarios/logar/{userName}/{password}")
    public String logar(
            @PathParam("userName") String userName,
            @PathParam("password") String password) {
        boolean existe = protocoloCtrl.logar(userName, password);
        String boo = gson.toJson(existe);
        return boo;
    }

    @POST
    @Produces("application/json")
    @Path("empresa/cadastrar/"+
            "{cnpj}/" + 
            "{nome}/" + 
            "{endereco}/" +
            "{numero}/" +
            "{bairro}/" +
            "{cidade}/" +
            "{cep}")
    public String cadastrarEmpresa(
            @PathParam("cnpj") String cnpj,
            @PathParam("nome") String nome,
            @PathParam("endereco") String endereco,
            @PathParam("numero") String numero,
            @PathParam("bairro") String bairro,
            @PathParam("cidade") String cidade,
            @PathParam("cep") String cep) {
        Empresa empresa = new Empresa(cnpj, nome, endereco, numero, bairro, cidade, cep);
        empresa = protocoloCtrl.cadastrarEmpresa(empresa);
        String json = gson.toJson(empresa);
        return json;
    }
    
    

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
