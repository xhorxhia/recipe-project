package recipes.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;
import org.springframework.util.unit.DataSize;

@Component
public class TomcatContainerConfig implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {
    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        factory.addConnectorCustomizers(
            (connector) -> {
                // This particular configuration setting ensures that an HTTP Post can contain up to 30MB worth of data.
                // It ensures that the Client can send to the large files in a Base64 format.
                connector.setMaxPostSize(Math.toIntExact(DataSize.parse("30MB").toBytes()));
                // I've set the limit to be 30MB. This can be changed to better suit our needs.
            });
    }

}
