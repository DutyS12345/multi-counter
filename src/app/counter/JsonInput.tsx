import { ChangeEvent, Dispatch, useState } from "react";

import styles from "./JsonInput.module.css";
import { LabelState, LabelStateUpdate } from "./BasicCounterPage";

export type JsonInputProps = {
    counterCount: number,
    labels: LabelState,
    setLabels: Dispatch<LabelStateUpdate>
}
export function JsonInput({ counterCount, labels, setLabels }: JsonInputProps) {
    var labelJson: string[] = [];
    for (let i = 0; i < counterCount; i++) {
        labelJson.push(labels[i.toString()] || "");
    }
    var [inputText, setInputText] = useState(JSON.stringify(labelJson));
    function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
    }
    return <textarea id="tree-labels-json" className={styles["json-input"]} value={inputText} onChange={onChange}></textarea >
}
