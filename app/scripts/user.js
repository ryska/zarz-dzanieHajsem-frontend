class User {
  constructor() {
    if (localStorage.login !== undefined) {
      console.log( localStorage.login);
      this.login(localStorage.login, localStorage.token, localStorage.report == 'true');
    }
  }

  login(login, token, report) {
    console.log(login, report);
    this._login = login;
    this._token = token;
    this._report = report;

    localStorage.setItem('login', login);
    localStorage.setItem('token', token);
    localStorage.setItem('report', report);

    Vue.http.headers.common['Authorization'] = token;
    bus.$emit('user-loggedin');
  }

  logout() {
    this._report = false;
    this._token = undefined;
    this._login = undefined;

    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('report');
    delete Vue.http.headers.common['Authorization'];
    bus.$emit('user-loggedout');
  }

  getReport() {
    return this._report;
  }

  setReport(report) {
    this._report = report;
    localStorage.setItem('report', report);
  }

  isLoggedIn() {
    return this._login !== undefined;
  }

  getToken() {
    return this._token;
  }

  getLogin() {
    return this._login;
  }

}

window.User = new User();
