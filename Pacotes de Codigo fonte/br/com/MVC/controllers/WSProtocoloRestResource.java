/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Sandro Machado
 */
@Path("WSProtocoloRest")
public class WSProtocoloRestResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of WSProtocoloRestResource
     */
    public WSProtocoloRestResource() {
    }

    /**
     * Retrieves representation of an instance of br.com.MVC.controllers.WSProtocoloRestResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
       return "Nome: Sandro, Sobre: Machado";
    }

    /**
     * PUT method for updating or creating an instance of WSProtocoloRestResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
