import { useState, createContext } from 'react';
import { createTheme } from '@stitches/react';
import { styled } from 'wasp/core/stitches.config';
import { LoginSignupForm } from './internal/common/LoginSignupForm';
import { MessageError, MessageSuccess } from './internal/Message';
const logoStyle = {
    height: '3rem'
};
const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
});
// Note about using !important with some of the components:
// This is a workaround for CSS generated by Stitches not being specific enough
// and thus being overridden by Tailwind CSS. https://github.com/wasp-lang/wasp/issues/1764
// Long term we want to move away from Stitches and this is an acceptable workaround for now.
const HeaderText = styled('h2', {
    fontSize: '1.875rem !important',
    fontWeight: '700 !important',
    marginTop: '1.5rem !important'
});
// PRIVATE API
export const AuthContext = createContext({
    isLoading: false,
    setIsLoading: (isLoading) => { },
    setErrorMessage: (errorMessage) => { },
    setSuccessMessage: (successMessage) => { },
});
function Auth({ state, appearance, logo, socialLayout = 'horizontal', additionalSignupFields }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // TODO(matija): this is called on every render, is it a problem?
    // If we do it in useEffect(), then there is a glitch between the default color and the
    // user provided one.
    const customTheme = createTheme(appearance !== null && appearance !== void 0 ? appearance : {});
    const titles = {
        login: 'Log in to your account',
        signup: 'Create a new account',
    };
    const title = titles[state];
    const socialButtonsDirection = socialLayout === 'vertical' ? 'vertical' : 'horizontal';
    return (<Container className={customTheme}>
      <div>
        {logo && (<img style={logoStyle} src={logo} alt='Your Company'/>)}
        <HeaderText>{title}</HeaderText>
      </div>

      {errorMessage && (<MessageError>
          {errorMessage.title}{errorMessage.description && ': '}{errorMessage.description}
        </MessageError>)}
      {successMessage && <MessageSuccess>{successMessage}</MessageSuccess>}
      <AuthContext.Provider value={{ isLoading, setIsLoading, setErrorMessage, setSuccessMessage }}>
        {(state === 'login' || state === 'signup') && (<LoginSignupForm state={state} socialButtonsDirection={socialButtonsDirection} additionalSignupFields={additionalSignupFields}/>)}
      </AuthContext.Provider>
    </Container>);
}
// PRIVATE API
export default Auth;
//# sourceMappingURL=Auth.jsx.map