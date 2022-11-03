/*

  Author: Tyler

  This is the main screen with chat feed 

*/

/*
    TODO: save token and store on user ID, get to work with creating accounts
*/

const MainFeed = () => {
    fetch("http://70.177.34.147:3000/api/users/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': 'jwtToken'
        },
        body: JSON.stringify({
            email: "brandvdo@gmail.com",
            password: "password123"
        })
    })

        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
            //const user_Token = sessionStorage.setItem('jwtToken',JSON.stringify(responseData.token));
           // console.log(user_Token);
        })
        .done();
}

  export default MainFeed;