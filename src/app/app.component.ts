import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AddressDetails } from '../entities/addressDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address = '';
  addressToSend = '';
  error = '';
  moneyerror = '';
  addressDetails: AddressDetails;
  selectedTab = 'Address';

  constructor(private _http: Http) {
    this.addressDetails = new AddressDetails();
  }

  public showContent(event: any, selected: string) {
    this.selectedTab = selected;
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    event.currentTarget.className += ' active';
  }


  private getDetails() {
    if (this.address === '') {
      this.error = 'Address field cannot be empty';
      return;
    }
    document.getElementById('loader').style.display = 'block';
    this.addressDetails = new AddressDetails();
    this.error = '';
    this._http.get('http://blocktrail-api.azurewebsites.net/getAddressInfo/' + this.address).map((res: Response) => res.json())
    .subscribe(data => {
           console.log(data);
           document.getElementById('loader').style.display = 'none';
           if (data.addressDetails.msg !== undefined) {
              this.error = data.addressDetails.msg;
           } else {
              this.error = '';
              this.addressDetails = data.addressDetails;
              this.addressDetails.transactionsList = data.transactions.data;
              console.log(this.addressDetails.transactionsList);

              this.addressDetails.transactionsList.forEach(element => {
                element.estimated_value = this.convertToBitcoin(element.estimated_value);
                element.total_input_value = this.convertToBitcoin(element.total_input_value);
                element.total_output_value = this.convertToBitcoin(element.total_output_value);
                element.total_fee = this.convertToBitcoin(element.total_fee);
                element.estimated_change = this.convertToBitcoin(element.estimated_change);
              });

              this.addressDetails.balance = this.convertToBitcoin(this.addressDetails.balance);
              this.addressDetails.unconfirmed_sent = this.convertToBitcoin(this.addressDetails.unconfirmed_sent);
              this.addressDetails.received = this.convertToBitcoin(this.addressDetails.received);
              this.addressDetails.sent = this.convertToBitcoin(this.addressDetails.sent);
              this.addressDetails.unconfirmed_received = this.convertToBitcoin(this.addressDetails.unconfirmed_received);
              if (this.addressDetails.first_seen === null) {
                this.addressDetails.first_seen = 'Never';
              }
              if (this.addressDetails.last_seen === null) {
                this.addressDetails.last_seen = 'Never';
              }
          }
   });
  }

  private convertToBitcoin(amount: number): number {
    return amount / 100000000;
  }

  private sendCoins() {
    if (this.addressToSend === '') {
      this.moneyerror = 'Address field cannot be empty';
      return;
    }
    this.moneyerror = '';
    document.getElementById('loader1').style.display = 'block';
    this._http.get('http://blocktrail-api.azurewebsites.net/sendMoney/' + this.addressToSend + '/0.001').map((res: Response) => res.json())
    .subscribe(data => {
           console.log(data);
           document.getElementById('loader1').style.display = 'none';
           if (data.error === null) {
             this.moneyerror = '0.001 Testcoins successfully transfered to Address: ' + this.addressToSend;
           } else {
             this.moneyerror = data.error.message;
           }
    });
  }

}

