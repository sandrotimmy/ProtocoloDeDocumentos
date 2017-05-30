
package br.com.MVC.controllers_client;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.Action;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.11-b150120.1832
 * Generated source version: 2.2
 * 
 */
@WebService(name = "WSProtocolo", targetNamespace = "http://controllers.MVC.com.br/")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface WSProtocolo {


    /**
     * 
     * @param x
     * @param y
     * @return
     *     returns java.lang.Double
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "soma", targetNamespace = "http://controllers.MVC.com.br/", className = "br.com.MVC.controllers_client.Soma")
    @ResponseWrapper(localName = "somaResponse", targetNamespace = "http://controllers.MVC.com.br/", className = "br.com.MVC.controllers_client.SomaResponse")
    @Action(input = "http://controllers.MVC.com.br/WSProtocolo/somaRequest", output = "http://controllers.MVC.com.br/WSProtocolo/somaResponse")
    public Double soma(
        @WebParam(name = "x", targetNamespace = "")
        Double x,
        @WebParam(name = "y", targetNamespace = "")
        Double y);

}
