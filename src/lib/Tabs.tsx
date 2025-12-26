import React, { useState, useContext, createContext, useEffect, useCallback, ReactNode } from 'react';

// --- Type Definitions ---

interface Tab {
    title: string;
    hidden?: boolean;
}

interface TabsContextType {
    activeTab: string;
    setActiveTab: (title: string) => void;
    registerTab: (tab: Tab) => void;
    unregisterTab: (title: string) => void;
    setHidden: (title: string, hidden: boolean) => void;
}

export interface TabsProps {
    children: ReactNode;
}

interface TabListProps {
    tabs: Tab[];
}

export interface TabPanelProps {
    title: string;
    hidden?: boolean;
    active?: boolean;
    children: ReactNode;
}

// --- Components ---

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<string>('');
    const [tabs, setTabs] = useState<Tab[]>([]);

    const registerTab = useCallback((tab: Tab) => {
        setTabs((prevTabs) => {
            if (prevTabs.find(item => item.title === tab.title)) {
                return prevTabs;
            }
            return [...prevTabs, tab];
        });
    }, [setTabs]);

    const unregisterTab = useCallback((title: string) => {
        setTabs((prevTabs) => prevTabs.filter(item => item.title !== title));
    }, [setTabs]);

    const setHidden = useCallback((title: string, hidden: boolean) => {
        setTabs((prevTabs) => {
            if (hidden && activeTab === title) {
                // switch to the next visible tab
                setActiveTab(prevTabs.find(item => !item.hidden && item.title !== title)?.title || '');
            }
            return prevTabs.map(item => item.title === title ? { ...item, hidden } : item)

        });
    }, [setTabs, setActiveTab, activeTab]);

    const value: TabsContextType = {
        activeTab,
        setActiveTab,
        setHidden,
        registerTab,
        unregisterTab,
    };

    useEffect(() => {
        if (!activeTab) {
            // set first active tab
            const firstTab = tabs.find(item => !item.hidden)?.title;
            if (firstTab) {
                setActiveTab(firstTab);
            }
        }
    }, [activeTab, setActiveTab, tabs]);

    return (
        <TabsContext.Provider value={value}>
            <div className="sct-tabs">
                <TabList tabs={tabs} />
                <div className="sct-tab-panels">
                    {children}
                </div>
            </div>
        </TabsContext.Provider>
    );
}

function TabList({ tabs }: TabListProps) {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabList must be used within a Tabs component');
    }
    const { activeTab, setActiveTab } = context;

    return (
        <ul className="sct-tab-list">
            {tabs.map(({ title, hidden }) => hidden ? null : (
                <li
                    key={title}
                    className={`sct-tab ${activeTab === title ? 'active' : ''}`}
                    onClick={() => setActiveTab(title)}
                >
                    {title}
                </li>
            ))}
        </ul>
    );
}

export const TabPanel: React.FC<TabPanelProps> = ({ title, hidden = false, active = false, children }) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabPanel must be used within a Tabs component');
    }
    const {
        activeTab,
        setActiveTab,
        registerTab,
        setHidden,
        unregisterTab,
    } = context;

    useEffect(() => {
        registerTab({ title });
        return () => {
            unregisterTab(title);
        };
    }, [registerTab, unregisterTab, title]);

    useEffect(() => {
        setHidden(title, hidden);
    }, [setHidden, title, hidden]);

    useEffect(() => {
        if (active && activeTab !== title) {
            setActiveTab(title);
        }
    }, [setActiveTab, title, active]);

    return hidden || (activeTab !== title) ? null : (
        <div className="sct-tab-panel">
            {children}
        </div>
    );
}