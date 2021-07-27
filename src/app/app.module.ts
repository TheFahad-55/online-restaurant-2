import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthService as AuthGuard } from './signup/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DishesComponent } from './dishes/dishes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { FavouriteFoodComponent } from './favourite-food/favourite-food.component';
import { CartComponent } from './cart/cart.component';
import { BillComponent } from './bill/bill.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';

const routes: Routes = [{
  path: '', component: HomeComponent
}, { path: 'signup', component: SignupComponent },
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }
  , { path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'favourites', component: FavouriteFoodComponent, canActivate: [AuthGuard] },
{ path: 'dishes', component: DishesComponent },
{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
{ path: 'bill', component: BillComponent, canActivate: [AuthGuard] },
{ path: 'reset-password/:token', component: ResetPasswordComponent },
{ path: '**', component: NotFoundComponent }
]



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DishesComponent,
    SpinnerComponent,
    LogoutComponent,
    FavouriteFoodComponent,
    CartComponent,
    BillComponent,
    NotFoundComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
