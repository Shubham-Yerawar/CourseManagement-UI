import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

// import client from './graphql.client';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://10.29.9.53:4100/graphql' }),
      cache: new InMemoryCache()
    });
  }

}
