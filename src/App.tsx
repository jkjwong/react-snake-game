import React from 'react';
import Grid from './components/Grid/Grid';

export default function App() {
    return (
        <div>
            <Grid layout={[8,8]} speed={100} />
        </div>
    )
}