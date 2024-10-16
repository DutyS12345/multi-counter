import { Dispatch, useState } from "react";

import styles from "./JsonInput.module.css";

export type LabelState = {
    [index: string]: string,
}
export type JsonInputProps = {
    counterCount: number,
    labels: LabelState,
    setLabels: Dispatch<LabelStateUpdate>
}
export type LabelStateUpdate = {
    idx?: number;
    value?: string;
    values?: LabelState;
}
export default function JsonInput({ counterCount, labels, setLabels }: JsonInputProps) {
    var labelJson: string[] = [];
    for (let i = 0; i < counterCount; i++) {
        labelJson.push(labels[i.toString()] || "");
    }
    var [inputText, setInputText] = useState(JSON.stringify(labelJson));
    return <textarea id="tree-labels-json" className={styles["json-input"]} value={inputText} onChange={(e) => {
        setInputText(e.target.value === "" ? JSON.stringify(labelJson) : e.target.value);
        try {
            var jInput = JSON.parse(e.target.value);
            if (!(jInput instanceof Array)) {
            } else {
                let newLabels: LabelState = {}
                for (let i = 0; i < jInput.length; i++) {
                    if (jInput[i] != "") {
                        newLabels[i.toString()] = jInput[i];
                    }
                }
                setLabels({ values: newLabels });
            }
        } catch (error) {
            console.log("cannot parse " + e.target.value)
        }
    }}></textarea >
}

export function updateLabelState(state: LabelState, action: LabelStateUpdate): LabelState {
    console.log(action)
    if (action.idx != undefined && action.value != undefined) {
        return {
            ...state,
            [action.idx.toString()]: action.value,
        }
    } else if (action.values != undefined) {
        return { ...action.values };
    }
    return state;
}