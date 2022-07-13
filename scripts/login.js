function login()
{
debugger;
    localStorage.clear();
    const userEmail = document.getElementById("email").value;
    const userName = document.getElementById("name").value;
    localStorage.setItem('name', userName);
    localStorage.setItem('email', userEmail);

//location.replace(parent.window.location.href.replace('/login.html?','')+'/gusessing/page/index.html')
}