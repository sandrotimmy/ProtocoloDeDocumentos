/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.MVC.controllers;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

@WebService(serviceName = "WSProtocolo")
public class WSProtocolo {

    @WebMethod(operationName = "soma")
    public String soma(@WebParam(name = "x") Integer x, @WebParam(name = "y") Integer y) {

        return "{parametro1: 25, parametro2: 5}";
    }
}