import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'src/environments/environment';
import Web3 from "web3";
declare var $: any;
declare var global: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        display: 'block',
        transform:'translateX(0%)'
      })),
      state('closed', style({
        
        transform: 'translateX(20%)',
        display: 'none'
      })),
      transition( 'open => closed', [
        animate('0.3s ease-out')
      ]),
      transition('closed => open', [
        animate( '0.1s ease-in')
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  isHamburguer = false;
  panel = false
  provider: any;
  image = '../../assets/images/hamburger.svg'
  ethereum: any;
  contract:any;
  userAccountAddress: string = "";
  isWalletConnected:boolean = false;
  smartContractAddress: string = environment.smartContractAddress;
  smartContractLink: string = environment.smartContractLink;
  cakeCount: number = 0;
  doughCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.connectWallet(this.isWalletConnected);
  }
  
  openMenu() {
    this.isHamburguer = !this.isHamburguer;
    if(this.isHamburguer){
      this.image = '../../assets/images/cross.svg'
    }else{
      this.image = '../../assets/images/hamburger.svg'
    }
  }
  openPanel(){
    this.panel = !this.panel
  }
  async walletscript(){
      // Modern dapp browsers...
      if (global.ethereum) {
        this.provider = new Web3(global.ethereum);
        try {
          // Request account access if needed
          await global.ethereum.request({ method: 'eth_requestAccounts' });
          //alert("ethereum enabled");
          var acc = await this.provider.eth.getAccounts();
          this.userAccountAddress = acc[0];
          this.isWalletConnected = true;
          console.log('acc: ',this.userAccountAddress);
          this.initializeContract();
        } catch (error) {
          // User denied account access...
          this.isWalletConnected = false;
        }
      } else if (global.web3) {
        this.provider = new Web3(global.currentProvider);
        var acc = await this.provider.eth.getAccounts();
        this.initializeContract();
      }
      // Non-dapp browsers...
      else {
        this.isWalletConnected = false;
        /* this.toastr.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        ); */
      }
 
    try {
      if (global.ethereum) {
       
      } else {
        /* this.toastr.error("Please connect to Metamask"); */
         this.isWalletConnected = false;
      }
      global.ethereum.on("accountsChanged", async (accounts:any) => {
        //this.getAccount();
        var acc = await this.provider.eth.getAccounts();
        this.isWalletConnected = true;
        this.initializeContract();
        if (acc !== this.userAccountAddress) {
          window.location.reload();
        }
      });
    } catch (err) {
      // console.log("error: ", err);
    }
  }
  connectWallet(isWalletConnected:any) {
  
    if(isWalletConnected){
      this.provider = null;
      /* this.isWalletConnected = false; */
      
    }else{
      this.walletscript();
    }
    //this.isWalletConnected = true;
  }
    async initializeContract() {
    var abi = environment.contractAbi;
    var address = this.smartContractAddress;
    this.contract = await new this.provider.eth.Contract(abi, address);
    await this.contractInfo();
    await this.getUserInfo(this.userAccountAddress);
    
    setInterval(async() => {
      //await this.contractInfo();
      //await this.getUserInfo(this.userAccountAddress);
    }, 5000);
  }
  async contractInfo() {
    try {
      //var getTotalDividendsDistributed = await this.contract.methods.getTotalDividendsDistributed().call();
      //this.doughCount = getTotalDividendsDistributed[0] / ( 10 ** 18 );
      //this.cakeCount = getTotalDividendsDistributed[1] / ( 10 ** 18 );
      //console.log('getTotalDividendsDistributed:   ',getTotalDividendsDistributed);
    } catch (error) {
       console.log(error);
    }
  }
  async getUserInfo(address:any) {
    try {
        //address= '0x5ea19D9C781028EEDc4570E6eB45D260472cC46e';
        //var dough_getAccountDividendsInfo = await this.contract.methods.getAccountDividendsInfo(address,0).call();
        //var cake_getAccountDividendsInfo = await this.contract.methods.getAccountDividendsInfo(address,1).call();
         //this.doughCount = getTotalDividendsDistributed[0] / ( 10 ** 18 );
      //this.cakeCount = getTotalDividendsDistributed[1] / ( 10 ** 18 );
        //console.log('dough_getAccountDividendsInfo:   ',dough_getAccountDividendsInfo[4]/(10**18));
        //console.log('cake_getAccountDividendsInfo:   ',cake_getAccountDividendsInfo[4]/(10**18));
        //console.log('withdrawable_dough_getAccountDividendsInfo:   ',dough_getAccountDividendsInfo);
        //console.log('withdrawable_cake_getAccountDividendsInfo:   ',cake_getAccountDividendsInfo);
    } catch (err) {
      //console.log(err);
    }
  }
  async claimRewards() {
    try {
     var txn = await this.contract.methods.claim().send({
       from: this.userAccountAddress,
     });
     //console.log("txn:  ", txn);
   } catch (err) {
     console.log(err);
     /* this.toastr.error(err); */
     }
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

}
