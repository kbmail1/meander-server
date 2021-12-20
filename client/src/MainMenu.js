import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Sonnet from './resources/Sonnet';
import Dictionary from './dict/Dictionary';
// import { Jumbotron } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function MainMenu() {
    const [key, setKey] = useState('dictionary');
    return (_jsxs(Tabs, { id: "controlled-tab-example", activeKey: key, onSelect: (k) => setKey(k), className: "mb-3", children: [_jsx(Tab, { eventKey: "dictionary", title: "Dictionary", children: _jsx(Dictionary, {}, void 0) }, void 0), _jsx(Tab, { eventKey: "profile", title: "Profile", children: _jsx(Sonnet, {}, void 0) }, void 0), _jsx(Tab, { eventKey: "contact", title: "Contact", disabled: true, children: _jsx(Sonnet, {}, void 0) }, void 0)] }, void 0));
}
export default MainMenu;
//# sourceMappingURL=MainMenu.js.map