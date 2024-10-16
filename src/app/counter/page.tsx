"use client";

import { useReducer, useState } from "react";
import BlockCounter from "./Counter";
import JsonInput, { updateLabelState } from "./JsonInput";

import styles from "./page.module.css";

type CounterState = {
    [index: string]: number,
}
type CounterStateUpdate = {
    key: string,
    value: number | ((oldValue: number) => number),
}
function updateCounterState(state: CounterState, action: CounterStateUpdate): CounterState {
    var newState;
    var newValue;
    if (typeof action.value === "number") {
        newValue = action.value as number;
    } else {
        newValue = (action.value as (oldValue: number) => number)(state[action.key])
    }
    newState = {
        ...state,
        [action.key]: newValue,
    }
    if (action.key === "counters") {
        let oldValue = state["counters"];
        if (newValue > oldValue) {
            for (let i = oldValue; i < newValue; i++) {
                newState[i.toString()] = 0;
            }
        } else if (newValue < oldValue) {
            for (let i = newValue; i < oldValue; i++) {
                delete newState[i.toString()];
            }
        }
    }
    return newState;
}


export default function CounterPage() {
    const [labels, setLabels] = useReducer(updateLabelState, {});
    const [counters, setCounters] = useReducer(updateCounterState, { "counters": 1, "0": 0 });
    var counterCount = counters["counters"];
    var primaryCounters = [];
    for (let i = 0; i < counterCount; i++) {
        primaryCounters.push(<BlockCounter
            key={i}
            label={labels[i.toString()] || ""}
            setLabel={(newLabel) => setLabels({ idx: i, value: newLabel.toString() })}
            count={counters[i.toString()]}
            setCount={(newValue) => setCounters({
                key: i.toString(),
                value: newValue
            })}
        />)
    }
    let totalCount = 0.0;
    for (let idx in counters) {
        if (idx !== "counters") {
            totalCount += counters[idx];
        }
    }
    console.log(counters)
    return <>
        <div className={styles["block-counter-layout"]}>
            <div className={styles["label-input"]}>
                <JsonInput counterCount={counterCount} labels={labels} setLabels={setLabels}></JsonInput>
            </div>
            <div className={styles["block-counter-counter"]}>
                <BlockCounter
                    label={"Number of Counters"}
                    setLabel={(oldValue) => { }}
                    count={counterCount}
                    setCount={
                        (newValue) => setCounters({
                            key: "counters",
                            value: newValue
                        })
                    }
                />
            </div>
            {primaryCounters}
            <div className={styles["block-counter-info"]}>
                {`Average count per counter: ${totalCount / counterCount || ""}`}
                <br />
                {`Total count: ${totalCount}`}
            </div>
        </div>
    </>
}