import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useSelector, useDispatch } from 'react-redux';
import CustomLoading from 'components/common/loading/custom-loading';
import { initLoading, updateAuth } from 'store/actions';
import { getUserModel } from 'contracts/index';
import { ADMIN_ADDRESS } from 'constants/index';
import Dashboard from '../dashboard';
import Login from '../login';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '4c8fa4b88350483eb9fc06fb7d66ad4e',
    },
  },
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});

function Routes() {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);
  const globalReducer = useSelector((state) => state.global);
  const { walletAddress } = authReducer;

  const getAccountInfo = async (address) => {
    const accountInfo = await getUserModel(address);
    return accountInfo;
  };

  const onUpdateAuth = async (_walletAddress) => {
    const accountInfo = await getAccountInfo(_walletAddress);
    dispatch(
      updateAuth({
        walletAddress: _walletAddress,
        accountInfo,
        isAdmin: _walletAddress.toLowerCase() === ADMIN_ADDRESS.toLowerCase(),
      })
    );
  };

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    const web3Object = await new Web3(provider);
    const accounts = await web3Object.eth.getAccounts();
    if (accounts.length > 0) {
      onUpdateAuth(accounts[0]);
    }

    provider.on('accountsChanged', (_accounts) => {
      onUpdateAuth(_accounts[0]);
    });
  };

  useEffect(() => {
    dispatch(initLoading());
  }, [dispatch]);

  return (
    <div className="app">
      <CustomLoading loading={globalReducer.loading} />
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => {
              if (walletAddress) {
                return <Dashboard onConnect={onConnect} />;
              }
              return <Login onConnect={onConnect} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
