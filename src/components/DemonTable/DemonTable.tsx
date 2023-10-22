import { FunctionComponent, useCallback, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from './styles.module.css'
import { TableRow } from "../TableRow/TableRow";
import logo from "../../assets/logo.webp";
import data from "../../data/demonArr.json"

type DemonData = Array<[string, number, string, string, number, string[]]>

const demonArr = data as DemonData;

const storageSetter = () => {
    if (!localStorage.getItem("demon-list") && localStorage.getItem("demon-list") !== null) {
        localStorage.setItem("demon-list", JSON.stringify(Array(415).fill(true)))
    }
    return JSON.parse(localStorage.getItem("demon-list") || '{}')

}

const useSortBy = () => {
    const [sortBy, setSortBy] = useState("default");
    const switchSortBy = useCallback((newValue: string) => {
        setSortBy((currentValue) => {
            if ((newValue === currentValue.slice(0, 4)) && (currentValue.slice(-3) === "des")) {
                return newValue + "-asc"
            } else {
                return newValue + "-des"
            }
        })
    }, []);
    return { sortBy, switchSortBy };
}

interface CustomSortedProps {
    usable: boolean[],
    sortby: string,
    hide: boolean
}

const CustomSorted: FunctionComponent<CustomSortedProps> = ({ usable, sortby, hide }) => {
    let el = 4, rev = false;

    switch (sortby) {
        case "name-asc":
            el = 2;
            rev = false;
            break
        case "name-des":
            el = 2;
            rev = true;
            break
        case "race-asc":
            el = 0;
            rev = false;
            break
        case "race-des":
            el = 0;
            rev = true;
            break
        case "levl-asc":
            el = 1;
            rev = true;
            break
        case "levl-des":
            el = 1;
            rev = false;
            break
        default:
            el = 4;
            rev = false;
    }

    let res = [...demonArr]
        .sort((a, b) => {
            const f = a[el], l = b[el];
            if ((el === 2) || (el === 0)) {
                if (f < l) {
                    return 1;
                }
                if (f > l) {
                    return -1;
                }
                return 0;
            } else if (typeof f === "number" && typeof l === "number") {
                return f - l
            }
            return 0
        })

    rev ? res.reverse() : true;

    return (
        <>
            {
                res
                    .map((e, i) => {
                        return (
                            <TableRow
                                key={e[4]}
                                race={e[0]}
                                lvl={e[1]}
                                name={e[2]}
                                link={e[3]}
                                location={e[5]}
                                usable={usable[i]}
                                i={e[4]}
                                hide={hide}
                            />
                        )
                    })
            }
        </>
    )
}

export const DemonTable = () => {
    const usableArr: boolean[] = storageSetter();
    const { sortBy, switchSortBy } = useSortBy();
    const [hide, setHide] = useState(false);

    return (
        <>
            <div className={styles.logoContainer}>
                <img className={styles.logo} alt={"logo"} src={logo} />
            </div>
            <div className={styles.tableBlock}>
                <Table striped bordered hover variant={"dark"}>
                    <thead className={styles.stickyHeader}>
                        <tr><th className={styles.headerBorderTop} colSpan={6}></th></tr>
                        <tr>
                            <th>
                                <button
                                    onClick={() => { switchSortBy("race") }}
                                    className={`${styles.sortBtn}
                                 ${sortBy === "race-asc" ? styles.down
                                            : sortBy === "race-des" ? styles.up : ""
                                        }`}
                                >
                                    Race
                                </button>
                            </th>
                            <th>
                                <button
                                    onClick={() => { switchSortBy("levl") }}
                                    className={`${styles.sortBtn}
                                 ${sortBy === "levl-asc" ? styles.down
                                            : sortBy === "levl-des" ? styles.up : ""
                                        }`}
                                >
                                    Level
                                </button>
                            </th>
                            <th>
                                <button
                                    onClick={() => { switchSortBy("name") }}
                                    className={`${styles.sortBtn}
                                 ${sortBy === "name-asc" ? styles.down
                                            : sortBy === "name-des" ? styles.up : ""
                                        }`}
                                >
                                    Name
                                </button>
                            </th>
                            <th>Location</th>
                            <th>
                                <button
                                    onClick={() => { setHide(!hide) }}
                                    className={`${styles.sortBtn} ${styles.hidden}`}
                                >
                                    Eliminated
                                </button>
                            </th>
                        </tr>
                        <tr><th className={styles.headerBorder} colSpan={6}></th></tr>
                    </thead>
                    <tbody className={styles.demonTableBody}>
                        <CustomSorted
                            usable={usableArr}
                            sortby={sortBy}
                            hide={hide}
                        />
                    </tbody>
                </Table>
            </div>
        </>
    )
}