import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExtractFileNamePipe } from './home/item/extract-filename';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { FileInfoComponent } from './home/file-info/file-info.component';
import { SignInComponent } from 'src/app/user/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/user/sign-up/sign-up.component';
import { ItemComponent } from './home/item/item.component';
import { OpenedItemComponent } from './home/opened-item/opened-item.component';
import { CommentsComponent } from './home/opened-item/comments/comments.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { RatingComponent } from './home/item/rating/rating.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        UploadFormComponent,
        HomeComponent,
        ItemComponent,
        ExtractFileNamePipe,
        FileInfoComponent,
        SignInComponent,
        SignUpComponent,
        OpenedItemComponent,
        CommentsComponent,
        NotFoundComponent,
        RatingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    entryComponents: [FileInfoComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
