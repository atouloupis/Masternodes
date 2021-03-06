# Readme

This script is used to automatize masternodes install from a list of known blockchain projects. 

# Processus

The script :
- connect to the VPS provider (scaleway)
- create a small VPS (3$/mo)
- initialize the VPS with the right masternode setup
- run the masternode
- save all information in a mongoDB 

## How to install

For now, just install nodeJS in your personnal environment and run the file launcher.js

    node launcher.js

> Missing : create a dashboard UI to run the script and display informations about the coin/personnal masternode.

## What to do

Before runnning the script you must :
- Install the wallet of the blockchain projet you want to invest, run it and wait for the full blockchain sync
- Buy the necessary collateral (locked cryptocoin) needed to run the masternode. Choose the right exchange to do this
- Send those coin to the wallet
- Create a masternode in the wallet et send the exact amount needed of collateral to the masternode address (depends on the blockchain project)
- In the debug console of the wallet :
	- `masternode genkey`
Keep the result in a temporary text file. It's the masternode private key.

Run the script, it'll be asked the user name (what you want) and the masternode private key generated at the last step. 

Go back to your wallet and activate the masternode.

You're on stage, enjoy. Your reward will appear on the wallet.


> Missing to finish the job : 
> - 10 coin to accept. For now only three coin is available (Axel, StreamIT, Scap coin)
> - Dashboard to monitor & manage MN [In Progress]
> ~~- State of the Masternode after the script ends~~**Done**
> - Watchdog to check masternodes health
> - Automatic cold wallet deploy  :
> 	- Install wallet
> 	- Create cold masternode
> 	- Generate privkey
>   - Display wallet pub key address
> 	- Wait for collateral and TxID
> 	- Update conf and synchronize with the hot masternode
> 	- *Automatic reward convertion to BTC (nice to have)*
>   - *Performance report (nice to have)*
>  - Website & App B2C crypto platform. Need : 
> 	  - KYC
>    - Authent 2FA
>     - Offline cold storage
>      - Design thinking
>      - Payment system
>      - Administration declaration report
>      - strong security & decentralization (to define)
> - *Hardware cold wallet masternode (nice to have)*
 

<!--stackedit_data:
eyJoaXN0b3J5IjpbODYzNjAzNTUwLC0xMTUxNzc1MTY2LDk5Mj
YwNjY4MiwyMTE4NjA2NDc3XX0=
-->