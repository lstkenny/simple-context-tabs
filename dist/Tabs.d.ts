import React, { ReactNode } from 'react';
export interface TabsProps {
    children: ReactNode;
}
export interface TabPanelProps {
    title: string;
    hidden?: boolean;
    active?: boolean;
    children: ReactNode;
}
export declare const Tabs: React.FC<TabsProps>;
export declare const TabPanel: React.FC<TabPanelProps>;
