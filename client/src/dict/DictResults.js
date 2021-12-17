import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './DictResults.scss';
import * as parser from './DictResultParser';
const DictResults = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState({});
    const Tabs = ['meaning', 'synonyms', 'antonyms'];
    return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "dict-results__content", children: ["Results for word: ", props.word, JSON.stringify(parser.parseResult(props.source), null, 2), props.children] }, void 0), _jsxs("span", { className: "dict-results__menu", children: [_jsx("button", { className: "dict-results__menu-button", children: "Meaning" }, void 0), _jsx("button", { className: "dict-results__menu-button", children: "Synonyms" }, void 0), _jsx("button", { className: "dict-results__menu-button", children: "Antonyms" }, void 0)] }, void 0)] }, void 0));
};
export default DictResults;
//# sourceMappingURL=DictResults.js.map