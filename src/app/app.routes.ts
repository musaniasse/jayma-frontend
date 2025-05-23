import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {ProductListComponent} from './pages/product/product-list/product-list.component';
import {ProductDetailComponent} from './pages/product/product-detail/product-detail.component';
import {ProductEditComponent} from './pages/product/product-edit/product-edit.component';
import {ProductCreateComponent} from './pages/product/product-create/product-create.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AdminComponent} from './pages/admin/admin.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {BoutiqueComponent} from './pages/boutique/boutique.component';
import {ClientComponent} from './pages/client/client.component';
import {CommandeComponent} from './pages/commande/commande.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Accueil'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'boutique',
        component: BoutiqueComponent,
      },
      {
        path: 'client',
        component: ClientComponent
      },
      {
        path: 'command',
        component: CommandeComponent
      }
    ]
  }
  /*{
    path: 'product',
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'add',
        component: ProductCreateComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  }*/,
  {
    path: '**',
    component: NotFoundComponent
  }
];
