import { Component, OnInit } from '@angular/core';
import { faPowerOff, faEnvelope, faFileAlt, faUser, faHome, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  powerIcon = faPowerOff;
  mailIcon = faEnvelope;
  fileIcon = faFileAlt;
  userIcon = faUser;

  homeIcon = faHome;
  setaBaixoIcon = faSortDown;

  nomeUsuario: string;

  constructor(
    public authService: LoginService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
