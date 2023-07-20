import styles from './styles.module.css'
import { FunctionComponent, useState } from "react";

interface TableRowProps {
    race: string,
    lvl: number,
    name: string,
    link: string,
    usable: boolean,
    i: number,
    hide: boolean,
    location: string[]
}

interface LocationProps {
    data: string[]
}

const Location: FunctionComponent<LocationProps> = ({data}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.expandContainer}>
        {
            data.length > 0 ?
            isExpanded ?
                <>
                    <button
                        type={"button"}
                        onClick={() => setIsExpanded(false)}
                        className={styles.locationBtn}
                    >
                        Hide
                    </button>
                    <ul className={styles.locationList}>
                        {data.map(location =>
                                <li className={styles.location}>
                                    {location}
                                </li>
                        )}
                    </ul>
                </>
                :
                <button
                    type={"button"}
                    onClick={() => setIsExpanded(true)}
                    className={styles.locationBtn}
                >
                    Expand
                </button>
                : <div className={styles.notRecruitable}>{"Not recruitable"}</div>
        }
        </div>
    )
}

export const TableRow: FunctionComponent<TableRowProps> = ({race, lvl, name, link, usable, i, hide, location}) => {
    const [isUsable, setIsUsable] = useState(usable);
    console.log(location)

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
                    <Location data={location}/>
                </td>
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