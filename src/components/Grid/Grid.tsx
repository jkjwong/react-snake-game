import React, { useState, useEffect, KeyboardEvent } from 'react';
import GridItem from '../GridItem/GridItem';
import './Grid.scss';

function createGrid(layout: number[], snake: number[] | null) {
    const columnLength = layout[0];
    const rowLength = layout[1];
    const gridItems = [];

    for (let i = 0; i < rowLength; i++) {
        const rowItems: any = [];
        for (let j = 0; j < columnLength; j++) {
            const id = (i) * columnLength + j;
            rowItems.push(<GridItem id={id} active={snake?.includes(id)}key={j} />)
        }
        gridItems.push(<div key={i} className="row">{rowItems}</div>)
    }

    return gridItems;
}

function move(snake: number[], layout: number[], direction: string = 'ArrowRight') {
    const newHead = [];
    const head = snake[0];
    const body = snake.slice(0,snake.length - 1);
    const columnLength = layout[0];
    const rowLength = layout[1];

    if (direction === 'ArrowLeft') {
        if (head % columnLength === 0) {
            newHead[0] = head + columnLength - 1;
        } else {
            newHead[0] = head - 1;
        }
    }

    if (direction === 'ArrowRight') {
        if ((head + 1) % columnLength === 0) {
            newHead[0] = head + 1 - columnLength;
        } else {
            newHead[0] = head + 1;
        }
    }

    if (direction === 'ArrowUp') {
        if (head < columnLength) {
            newHead[0] = columnLength*(rowLength - 1) + head;
        } else {
            newHead[0] = head - columnLength;
        }
    }

    if (direction === 'ArrowDown') {
        if (head >= columnLength*(rowLength - 1)) {
            newHead[0] = head % columnLength;
        } else {
            newHead[0] = head + columnLength;
        }
    }

    const nextMove = newHead.concat(body);
    return nextMove;
}

const allowedDirections: any = {
    ArrowLeft: ['ArrowUp', 'ArrowDown'],
    ArrowRight: ['ArrowUp', 'ArrowDown'],
    ArrowUp: ['ArrowLeft', 'ArrowRight'],
    ArrowDown: ['ArrowLeft', 'ArrowRight']
}

type GridProps = {
    layout: number[],
    speed?: number
}

export default function Grid({ layout, speed = 200 }: GridProps) {
    const [snake, setSnake] = useState([3,2,1,0]);
    const [direction, setDirection] = useState('ArrowRight');
    const gridItems = createGrid(layout, snake);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSnake(move(snake, layout, direction));
        }, speed);

        return () => {
            clearInterval(interval);
        }
    });

    function handleKeyUp(e: any) {
        if (allowedDirections[direction].includes(e.key)) {
            setDirection(e.key);
        }
    }

    return(
        <div
            onKeyUp={handleKeyUp}
            tabIndex={0}>
            {gridItems}
        </div>
    )
}