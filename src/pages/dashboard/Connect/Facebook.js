// FacebookLoginButton.js

import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onFacebookLogin }) => {
    const responseFacebook = (response) => {
        // Handle the Facebook login response
        onFacebookLogin(response);
    };

    return (
        <FacebookLogin
            appId="354456173920674"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
        />
    );
};

export default FacebookLoginButton;
