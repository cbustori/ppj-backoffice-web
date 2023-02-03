import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { Router } from '@angular/router';
import { SecurityService } from './shared/security/security.service';
import { DefaultOptions } from 'apollo-client';

const uriPPJ = 'https://dev.plaplajour.fr/graphql';
//const uriPPJ = 'http://localhost:40027/graphql';
export function createApollo(
    httpLink: HttpLink,
    securityService: SecurityService,
    router: Router
) {
    const http = httpLink.create({ uri: uriPPJ });

    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (securityService.getLoggedUser()) {
            operation.setContext({
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + securityService.getLoggedUser().accessToken),
            });
        }
        return forward(operation);
    });

    const link = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
                console.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                );
                //router.navigate(['/error']);
            });
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
            router.navigate(['/error']);
        }
    });

    // Disable cache
    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    return {
        link: from([authMiddleware, link, http]),
        cache: new InMemoryCache(),
        defaultOptions
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, SecurityService, Router],
        },
    ],
})
export class GraphQLModule { }
