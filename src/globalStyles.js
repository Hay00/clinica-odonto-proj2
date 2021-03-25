import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline:0;
}
html {
    min-height: 100%;
    background: var(--clr-bg);
}
*, button, input, a {
    border: 0;
    background: none;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;;
    color: #000;
    transition: color .2s ease-out;
}
ul {
    list-style: none;
}
body{
    /* padding-top: 64px */
}
:root {
// Colocar cores aqui!
--clr-primary: #03a9f4;
--clr-bg: #f6f6f6;
--clr-error: #d32f2f;

}
`;
