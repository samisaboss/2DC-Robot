import React from 'react';
import { PageIndex } from '../pages/index';
import { PageAdd } from '../pages/add';
import { PageEdit } from '../pages/edit';
import { PageView } from '../pages/view';
import { Routes, Route } from "react-router-dom";

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<PageIndex />} />
            <Route path="/add/" element={<PageAdd />} />
            <Route path="/edit" element={<PageIndex />} />
            <Route path="/edit/:botId" element={<PageEdit />} />
            <Route path="/view" element={<PageIndex />} />
            <Route path="/view/:botId" element={<PageView />} />
        </Routes>
    );
}