import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './UI/App';

const domNode = document.getElementById("react-root") as HTMLElement;
const root = createRoot(domNode);

root.render(<App/>);