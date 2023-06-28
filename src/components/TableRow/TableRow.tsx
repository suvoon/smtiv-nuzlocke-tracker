import styles from './styles.module.css'
import { FunctionComponent, useState } from "react";

interface TableRowProps {
    race: string,
    lvl: number,
    name: string,
    link: string,
    usable: boolean,
    i: number,
    hide: boolean
}

export const TableRow: FunctionComponent<TableRowProps> = ({race, lvl, name, link, usable, i, hide}) => {
    const [isUsable, setIsUsable] = useState(usable);

    function swapUsable() {
        const items = JSON.parse(localStorage.getItem("demon-list") || '{}');
        items[i] = !isUsable

        localStorage.setItem("demon-list",
            JSON.stringify(items)
        )

        setIsUsable(!isUsable);
    }

    return (
        <>
            <tr className={`${isUsable ? "" : styles.inactive} ${(hide && !isUsable) ? styles.hidden : ""}`}>
                <td>{race}</td>
                <td>{lvl}</td>
                <td><a className={styles.link} href={`https://aqiu384.github.io${link}`}>{name}</a></td>
                <td>
                    <button
                        className={styles.statusBtn}
                        onClick={swapUsable}
                    >
                        Change status
                    </button>
                </td>
            </tr>
        </>
    )
}