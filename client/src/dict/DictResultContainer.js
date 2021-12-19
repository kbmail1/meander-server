import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './DictResultContainer.scss';
const DictResultContainer = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState({});
    const Tabs = ['meaning', 'synonyms', 'antonyms'];
    return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "dict-results__content", children: [_jsx("h3", { children: props.word }, void 0), props.wordInfo, "Should the above been stringified???"] }, void 0), _jsxs("span", { className: "dict-results__menu", children: [_jsx("button", { className: "dict-results__menu-button", children: "Meaning" }, void 0), _jsx("button", { className: "dict-results__menu-button", children: "Synonyms" }, void 0), _jsx("button", { className: "dict-results__menu-button", children: "Antonyms" }, void 0)] }, void 0)] }, void 0));
};
export default DictResultContainer;
//# sourceMappingURL=DictResultContainer.js.map