import React from 'react';
import './GridItem.scss';

type GridItemProps = {
    id?: number,
    active?: boolean
}

export default function GridItem({ id, active }: GridItemProps) {
    return(
        <div className={`grid-item ${active ? 'active' : ''}`}></div>
    )
}