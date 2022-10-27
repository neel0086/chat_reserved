import './App.css';
import AccountProvider from './components/context/AccountProvider';
import GroupProvider from './components/context/GroupProvider';
import UserProvider from './components/context/UserProvider';
import Auth from './components/LoginPage/Auth';
import UserLogin from './components/LoginPage/UserLogin';
import UserPage from './components/MainPage/UserPage';

function App() {
  return (
    <div className="App">
      <AccountProvider >
        <UserProvider>
          <GroupProvider >
          <Auth />
          </GroupProvider>
        </UserProvider>
      </AccountProvider>
    </div>
  );
}

export default App;
