import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-cuentas-admin',
  templateUrl: './cuentas-admin.component.html',
  styleUrls: ['./cuentas-admin.component.scss']
})
export class CuentasAdminComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account;

  constructor(private accountService: AccountService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
   /* this.accountService.getAllAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
      },
      error => {
        console.error('Error loading accounts: ', error);
      }
    );*/
  }

  addAccount(account: Account) {
    this.accountService.createAccount(account).subscribe(
      newAccount => {
        this.accounts.push(newAccount);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account added successfully' });
      },
      error => {
        console.error('Error adding account: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding account' });
      }
    );
  }

  updateAccount(account: Account) {
    this.accountService.updateAccount(account.id, account).subscribe(
      updatedAccount => {
        const index = this.accounts.findIndex(a => a.id === updatedAccount.id);
        if (index !== -1) {
          this.accounts[index] = updatedAccount;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account updated successfully' });
      },
      error => {
        console.error('Error updating account: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating account' });
      }
    );
  }
  

  deleteAccount(account: Account) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(account.id).subscribe(
        () => {
          this.accounts = this.accounts.filter(a => a.id !== account.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account deleted successfully' });
        },
        error => {
          console.error('Error deleting account: ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting account' });
        }
      );
    }
  }

  selectAccount(account: Account) {
    this.selectedAccount = account;
    this.messageService.add({ severity: 'info', summary: 'Account Selected', detail: account.id.toString() });
  }

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Account Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Account Unselected', detail: event.data.name });
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }

}
