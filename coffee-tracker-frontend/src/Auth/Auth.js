import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  scopes;
  requestedScopes = 'openid profile write:coffee';

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    audience: 'coffee-tracker',
    scope: this.requestedScopes
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("first bit of handleAuthentication");
        console.log("authResult immediately after handleAuthentication " , authResult);
        this.setSession(authResult);
      } else if (err) {
        history.replace('/admin');
        console.log(err);
        console.log("second bit of handleauthentication");
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    console.log("the authResult in setSession", authResult);
    // Set the users scopes
    this.scopes = authResult.scope || this.requestedScopes || '';
    console.log("the scopes in setSession" , this.scopes);

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    console.log("The expiresAt in setSession", expiresAt);
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    console.log("The id token in setSession", this.idToken);
    this.expiresAt = expiresAt;

    // navigate to the home route
    history.replace('/admin');
  }

  renewSession() {
    console.log("Renew Session fired");
    //this used to be this.auth0.checkSession which didn't work - the authResult was undefined - I should look more into this
      //I need checkSession - parseHash only works on the initial authentication, so I need to get the authResult again - also gives an authResult of null
      //I've tried a couple of things in the audience bit - anything other than this returns an error that the service doesn't exist
      //this current returns an error saying login is required and stil gets no authResult - {error: "login_required", error_description: "Login required"}
      //if I use a non google log in the error I get is {error: "consent_required", error_description: "Consent required"} - I can however login again without going through the lock screen
      //in production, you time out after 1 minute rather than immediately. if you refresh or logout, you have to click login again, but you get taken right in. after 1 minute you get the error message - Could not get a new token (timeout: Timeout during executing web_message communication).
// this.auth0.checkSession({audience: 'https://coffee-tracker.eu.auth0.com/api/v2/'}, (err, authResult) => {
    this.auth0.checkSession({}, (err, authResult) => {
      console.log(this);
      debugger;
       if (authResult && authResult.accessToken && authResult.idToken) {
         console.log("This first bit of renewSession should work");
         this.setSession(authResult);
       } else if (err) {
         // this.logout();
         console.log(err);
         console.log("This second bit renewSession is working instead");
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }


  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // Remove user profile
    this.userProfile = null;

    // navigate to the home route
    history.replace('/admin');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

userHasScopes(scopes) {
  const grantedScopes = this.scopes.split(' ');
  return scopes.every(scope => grantedScopes.includes(scope));
}

}
