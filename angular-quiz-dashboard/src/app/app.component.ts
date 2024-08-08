// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'angular-quiz-dashboard';
// }
import { Component } from '@angular/core';
import { UserService } from './user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$ = this.userService.loading$;

  constructor(private userService: UserService, private router: Router) {}

  onSearch(userId: string) {
    this.userService.getUserById(Number(userId)).subscribe((response: any) => {
      if (response.data) {
        this.router.navigate(['/user', userId]);
      }
    });
  }
}


