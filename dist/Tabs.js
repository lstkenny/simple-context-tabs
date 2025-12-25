var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, createContext, useEffect, useCallback } from 'react';
// --- Components ---
var TabsContext = createContext(undefined);
export var Tabs = function (_a) {
    var children = _a.children;
    var _b = useState(''), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState([]), tabs = _c[0], setTabs = _c[1];
    var registerTab = useCallback(function (tab) {
        setTabs(function (prevTabs) {
            if (prevTabs.find(function (item) { return item.title === tab.title; })) {
                return prevTabs;
            }
            return __spreadArray(__spreadArray([], prevTabs, true), [tab], false);
        });
    }, [setTabs]);
    var unregisterTab = useCallback(function (title) {
        setTabs(function (prevTabs) { return prevTabs.filter(function (item) { return item.title !== title; }); });
    }, [setTabs]);
    var setHidden = useCallback(function (title, hidden) {
        setTabs(function (prevTabs) {
            var _a;
            if (hidden && activeTab === title) {
                // switch to the next visible tab
                setActiveTab(((_a = prevTabs.find(function (item) { return !item.hidden && item.title !== title; })) === null || _a === void 0 ? void 0 : _a.title) || '');
            }
            return prevTabs.map(function (item) { return item.title === title ? __assign(__assign({}, item), { hidden: hidden }) : item; });
        });
    }, [setTabs, setActiveTab, activeTab]);
    var value = {
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        setHidden: setHidden,
        registerTab: registerTab,
        unregisterTab: unregisterTab,
    };
    useEffect(function () {
        var _a;
        if (!activeTab) {
            // set first active tab
            var firstTab = (_a = tabs.find(function (item) { return !item.hidden; })) === null || _a === void 0 ? void 0 : _a.title;
            if (firstTab) {
                setActiveTab(firstTab);
            }
        }
    }, [activeTab, setActiveTab, tabs]);
    return (_jsx(TabsContext.Provider, __assign({ value: value }, { children: _jsxs("div", __assign({ className: "tabs" }, { children: [_jsx(TabList, { tabs: tabs }), _jsx("div", __assign({ className: "tab-panels" }, { children: children }))] })) })));
};
function TabList(_a) {
    var tabs = _a.tabs;
    var context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabList must be used within a Tabs component');
    }
    var activeTab = context.activeTab, setActiveTab = context.setActiveTab;
    return (_jsx("ul", __assign({ className: "tab-list" }, { children: tabs.map(function (_a) {
            var title = _a.title, hidden = _a.hidden;
            return hidden ? null : (_jsx("li", __assign({ className: "tab ".concat(activeTab === title ? 'active' : ''), onClick: function () { return setActiveTab(title); } }, { children: title }), title));
        }) })));
}
export var TabPanel = function (_a) {
    var title = _a.title, _b = _a.hidden, hidden = _b === void 0 ? false : _b, _c = _a.active, active = _c === void 0 ? false : _c, children = _a.children;
    var context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabPanel must be used within a Tabs component');
    }
    var activeTab = context.activeTab, setActiveTab = context.setActiveTab, registerTab = context.registerTab, setHidden = context.setHidden, unregisterTab = context.unregisterTab;
    useEffect(function () {
        registerTab({ title: title });
        return function () {
            unregisterTab(title);
        };
    }, [registerTab, unregisterTab, title]);
    useEffect(function () {
        setHidden(title, hidden);
    }, [setHidden, title, hidden]);
    useEffect(function () {
        if (active && activeTab !== title) {
            setActiveTab(title);
        }
    }, [setActiveTab, title, active]);
    return hidden || (activeTab !== title) ? null : (_jsx("div", __assign({ className: "tab-panel" }, { children: children })));
};
