import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { NotificationManager } from 'react-notifications';

var currentUserSubject;
var currentUser;

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (localStorage.getItem('currentUser') === '' || localStorage.getItem('currentUser') === 'undefined') {
    console.log('\tremoving item');
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
  }

  useEffect(() => {
    console.log("-------------------------------------- auth effect ----------------------------------------");

    if (!isLoggedIn) {
      if (!!localStorage.getItem('currentUser')) {
        console.log('\tsetting values');
        currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        currentUser = currentUserSubject.asObservable();
        setIsLoggedIn(true);
        console.log('\tsetting logged to true ');
      } else {
        console.log("nie mam currenUsera w localStorage / wylogowany");
      }
      
      console.log(currentUser);
    } else {
      console.log('auth, logged in', isLoggedIn);
    }
    
  }, [isLoggedIn])
  
  function login(user) {
    console.log("-------------------------------------- LOGIN ----------------------------------------");
    if (!!user && !isLoggedIn && !currentUserSubject) {
      console.log('\tauth login proceed');
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
      currentUserSubject.next(user);
      setIsLoggedIn(true);
    } else {
      NotificationManager.error("No user data to log in", 'Error!');
    }
  };
  
  function currentUserValue() {
    console.log("-------------------------------------- CURENT USER VALUE ----------------------------------------");
    
    console.log(currentUserSubject);
    console.log(currentUser);
    console.log(isLoggedIn);
    
    return currentUserSubject && currentUserSubject.value ? currentUserSubject.value : null;
  }
  
  function logout() {
    console.log("-------------------------------------- LOGOUT ----------------------------------------");
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    setIsLoggedIn(false)
  };

  return [isLoggedIn, login, logout, currentUserValue];
}

export default useAuth;
