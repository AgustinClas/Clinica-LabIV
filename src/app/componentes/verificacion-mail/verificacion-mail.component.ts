import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';

@Component({
  selector: 'app-verificacion-mail',
  templateUrl: './verificacion-mail.component.html',
  styleUrls: ['./verificacion-mail.component.css']
})
export class VerificacionMailComponent implements OnInit {

  constructor(private auth:AuthFirebaseService) { }

  ngOnInit(): void {
    
  }

  EnviarMail(){
    this.auth.sendVerificationEmail();
    console.log("!!!!!!!!");
  }

}
