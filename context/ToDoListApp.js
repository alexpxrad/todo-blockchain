import React, {useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

//internal import

import { toDoListAddress, todoListABI } from './constants';

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(toDoListAddress, todoListABI, signerOrProvider);

    export const ToDoListContext = React.createContext();

    export const ToDoListProvider = ({children}) => {
            const [currentAccount, setCurrentAccount] = useState('');
            const [error, setError] = useState('');
            const [allToDoList, setAllToDoList] = useState([]);
            const [myList, setMyList] = useState([]);

            const [allAddress, setAllAddress] = useState([]);


            //--------Connecting Metamask

            const checkIfWalletIsConnect = async() => {
                if(!window.ethereum) return setError("please install metamask")


                const account = await window.ethereum.request({method: "eth_accounts"});

                if(account.length) {
                    setCurrentAccount(account[0])
                    console.log(account[0]);
                } else {
                    setError("Please Install Metamask & connect, reload")
                }
            };

          //---CONNECT WALLET

          const connnectWallet = async( message ) => {
            if(!window.ethereum) return setError("please install metamask")


            const account = await window.ethereum.request({
                method: "eth-requestAccounts"
            });

            setCurrentAccount(account[0]);

          };

          //INTRACTING WITH SMART CONTRACT
          const toDoList = async () => {
            try {

                //connecting with smart contract 
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = await fetchContract(signer);

                const createList = await contract.createList(message);
                createList.wait();

                console.log(createList);
            } catch (error) {
                setError("Something wrong creating list");
            }
          };

          const getToDoList = async() => {
            try {
                  //connecting with smart contract 
                  const web3modal = new Web3Modal();
                  const connection = await web3modal.connect();
                  const provider = new ethers.providers.Web3Provider(connection);
                  const signer = provider.getSigner();
                  const contract = await fetchContract(signer);

                  //GET DATA

             const getAllAddress = await contract.getAddress();
             setAllAddress(getAllAddress);    
             console.log(getAllAddress);

             getAllAddress.map(async (el)=> {
                const getSingleData = await contract.getCreatorData(el);
                allToDoList.push(getToDoList);
                console.log(getSingleData);
             })

             const allMessage = await contract.getMessage();
             setMyList(allMessage);
                
            } catch (error) {
                setError("Something wrong getting data"); 
            }
          };

          //CHANGE STATE OF TODOLIST TO FALSE TO TRUE
          const change = async(address) => {
            try {

                //connecting with smart contract 
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = await fetchContract(signer);

                const state = await contract.toggle(address);
                state.wait();
                console.log(state);
                
            } catch (error) {
                setError("Something wrong changing status"); 
            }
          }

        return (
            <ToDoListContext.Provider value={{
                checkIfWalletIsConnect, 
                connnectWallet, 
                getToDoList, 
                toDoList, 
                change,
                currentAccount, 
                error,
                allToDoList,
                myList,
                allAddress
                 }}>
                {children}
            </ToDoListContext.Provider>
        );
    };


