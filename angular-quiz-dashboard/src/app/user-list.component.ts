import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage).subscribe((response: any) => {
      this.users = response.data;
    });
  }

  onNextPage() {
    this.currentPage++;
    this.loadUsers();
  }

  onPreviousPage() {
    this.currentPage--;
    this.loadUsers();
  }
}
