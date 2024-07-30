import { getUniversityByCountry } from "@/app/services/universities";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Loading from "../Loading";

type ListProps = {
    countrySelected: string;
}

type University = {
    alpha_two_code: string,
    web_pages: string[],
    country: string,
    domains: string[],
    name: string,
    "state-province": string;
}

const List = ({ countrySelected }: ListProps) => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUniversitiesFromAPI = useCallback(async () => {
        try {
            const universitiesFronAPI = await getUniversityByCountry(countrySelected);

            setUniversities(universitiesFronAPI);
            setIsLoading(false);
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }, [countrySelected]);

    useEffect(() => {
        if (countrySelected) {
            setIsLoading(true);
            getUniversitiesFromAPI();
        }
    }, [countrySelected, getUniversitiesFromAPI]);

    const CellText = (text: string) => {
        return (
            <div className={styles.cell}>
                <p className={styles.cellText}>{text}</p>
            </div>
        );
    }

    const HeaderText = (text: string) => {
        return (
            <div className={styles.cell}>
                <p className={styles.HeaderText}>{text}</p>
            </div>
        );
    }

    const Header = () => (
        <div className={styles.header}>
            {HeaderText('Número')}
            <div className={styles.divider} />
            {HeaderText('Nome da instituição')}
            <div className={styles.divider} />
            {HeaderText('Site')}
            <div className={styles.divider} />
            {HeaderText('Domínio')}
            <div className={styles.divider} />
            {HeaderText('Estado')}
        </div>
    );

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.container}>
            {universities.length ? (
                <>
                    <Header />
                    {universities.map((university) => (
                        <div key={university.alpha_two_code} className={styles.line}>
                            {CellText(university.alpha_two_code)}
                            <div className={styles.divider} />
                            {CellText(university.name)}
                            <div className={styles.divider} />
                            {CellText(university.web_pages[0])}
                            <div className={styles.divider} />
                            {CellText(university.domains[0])}
                            <div className={styles.divider} />
                            {CellText(university['state-province'])}
                        </div>
                    ))}
                </>
            ) :
            <p className={styles.notFound}>Nenhuma universidade encontrada...</p>}
        </div>
    );
};

export default List;