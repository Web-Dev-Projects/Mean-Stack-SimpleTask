import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { OpenedItemComponent } from './home/opened-item/opened-item.component';
import { AuthGaurd } from './common/guards/auth.guard';
import { ReSigninGuard } from './common/guards/resignin.guard';
import { NotFoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'home/:itemId', component: OpenedItemComponent },
    { path: 'upload', component: UploadFormComponent, canActivate: [AuthGaurd] },
    { path: 'signin', component: SignInComponent, canActivate: [ReSigninGuard] },
    { path: 'signup', component: SignUpComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' },
]


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
