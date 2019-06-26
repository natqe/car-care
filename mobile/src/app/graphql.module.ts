import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { environment } from '../environments/environment'

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({
            uri: `${environment.serverUrl}/graphql`,
            withCredentials: true
          }),
          cache: new InMemoryCache()
        }
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
