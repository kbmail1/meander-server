import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Jumbotron } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
const XToast = ({ children }) => {
    const [show, toggleShow] = useState(true);
    return (_jsxs(_Fragment, { children: [!show && _jsx(Button, { onClick: () => toggleShow(true), children: "Show Toast" }, void 0), _jsxs(Toast, { show: show, onClose: () => toggleShow(false), children: [_jsx(Toast.Header, { children: _jsx("strong", { className: "mr-auto", children: "React-Bootstrap" }, void 0) }, void 0), _jsx(Toast.Body, { children: children }, void 0)] }, void 0)] }, void 0));
};
const ExampleToast = () => {
    return (_jsxs(Container, { className: "p-3", children: [_jsx("h1", { className: "header", children: "Welcome To React-Bootstrap" }, void 0), _jsxs(XToast, { children: ["We now have Toasts", _jsx("span", { role: "img", "aria-label": "tada", children: "\uD83C\uDF89" }, void 0)] }, void 0)] }, void 0));
};
export default ExampleToast;
//# sourceMappingURL=ExampleToast.js.map