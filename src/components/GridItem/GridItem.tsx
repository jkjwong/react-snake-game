import React from 'react';
import './GridItem.scss';

type GridItemProps = {
    id?: number,
    active?: boolean,
    fruit?: boolean
}

export default function GridItem({ id, active, fruit }: GridItemProps) {
    return(
        <div className={`grid-item ${active ? 'active' : ''} ${fruit ? 'fruit' : ''}`}></div>
    )
}