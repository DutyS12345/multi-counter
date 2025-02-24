import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react"

import styles from './Counter.module.css';

type CounterProps = {
    label: string,
    setLabel: Dispatch<SetStateAction<string>>,
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
}
export function BlockCounter({ label, setLabel, count, setCount }: CounterProps) {
    return (<div className={styles["block-counter"]}>
        <input className={styles["block-counter__label"]} type="text" value={label} onChange={e => setLabel(e.target.value)} />
        <input className={styles["block-counter__counter"]} type="text" value={count} onChange={e => setCount(parseInt(e.target.value) || 0)} />
        <div className={styles["horizontal-input"]}>
            <button className={styles.increment} onClick={() => setCount(c => c + 1)}>+</button>
            <button className={styles.decrement} onClick={() => setCount(c => c - 1)}>-</button>
        </div>
    </div >)
}