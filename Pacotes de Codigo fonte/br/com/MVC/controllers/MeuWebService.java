/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;


import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author Sandro
 */
@WebService(serviceName = "WebService")
public class MeuWebService {

    /**
     * This is a sample web service operation
     */
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }

    /**
     * Operação de Web service
     */
    @WebMethod(operationName = "cadastraUsuario")
    public String cadastraUsuario(@WebParam(name = "nomeusuario") String nomeusuario, @WebParam(name = "email") String email, @WebParam(name = "senha") String senha) {
        //TODO write your implementation code here:
        return null;
    }
}
