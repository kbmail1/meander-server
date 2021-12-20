import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, gql } from '@apollo/client';
const GET_WORD_INFO = gql `
  query getWordInfo {
    word
    origin
    phonetic
  }
`;
export const DictResultContent = (props) => {
    const { loading, error, data } = useQuery(GET_WORD_INFO);
    if (data) {
        console.log(data);
        return (_jsxs("span", { style: { display: 'flex', justifyItems: 'flex-start' }, children: [_jsx("h3", { children: props.word }, void 0), "data"] }, void 0));
    }
    else if (loading) {
        return _jsx("div", { children: "Loading..." }, void 0);
    }
    else if (error) {
        console.error(error);
        return _jsx("div", { children: "Error!" }, void 0);
    }
    else {
        return (_jsxs("span", { style: { display: 'flex', justifyItems: 'flex-start' }, children: [_jsx("h3", { children: props.word }, void 0), "data"] }, void 0));
    }
};
//# sourceMappingURL=DictResultContent.js.map