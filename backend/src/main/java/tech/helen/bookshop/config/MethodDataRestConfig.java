package tech.helen.bookshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import tech.helen.bookshop.entity.Product;
import tech.helen.bookshop.entity.Review;

@Configuration
public class MethodDataRestConfig implements RepositoryRestConfigurer {

        private String clientUrl = Environment.host;

        @Override
        public void configureRepositoryRestConfiguration(
                        RepositoryRestConfiguration config,
                        CorsRegistry cors) {

                HttpMethod[] unsupportedActions = {
                                // HttpMethod.POST,
                                // HttpMethod.DELETE,
                                // HttpMethod.PUT
                };

                config.exposeIdsFor(Product.class);
                config.exposeIdsFor(Review.class);

                disableHttpMethods(Product.class, config, unsupportedActions);
                disableHttpMethods(Review.class, config, unsupportedActions);

                cors.addMapping(config.getBasePath() + "/**")
                                .allowedOrigins(clientUrl);
        }

        private void disableHttpMethods(
                        Class<?> self,
                        RepositoryRestConfiguration config,
                        HttpMethod[] unsupportedActions) {
                config.getExposureConfiguration()
                                .forDomainType(self)
                                .withItemExposure(
                                                (metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                                .withCollectionExposure(
                                                (metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
        }
}
