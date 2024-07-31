import { getUniversityByCountry } from "@/app/services/universities";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Loading from "../Loading";
import { Button } from "@nextui-org/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


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
    const [perPageList, setPerPageList] = useState<boolean>(false);
    const [perPage, setPerpage] = useState<number>(5);
    const [currentPage, setCurrentpage] = useState<number>(1);
    const [calculatedPosition, setCalculatedPosition] = useState<number>(0);

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

    const handleSetPerpage = (value: number) => {
        setPerPageList(false);
        setPerpage(value);
        setCurrentpage(1);
        setCalculatedPosition(0);
    }

    const PerPageSelector = () => (
        <div className={styles.perPage}>
            <p className={styles.perPageText}>Quantidade por página:</p>
            {perPageList ?
                <div>
                    <Button onPress={() => handleSetPerpage(1)}><p>1</p></Button>
                    <Button onPress={() => handleSetPerpage(2)}><p>2</p></Button>
                    <Button onPress={() => handleSetPerpage(3)}><p>3</p></Button>
                    <Button onPress={() => handleSetPerpage(4)}><p>4</p></Button>
                    <Button onPress={() => handleSetPerpage(5)}><p>5</p></Button>
                    <Button onPress={() => handleSetPerpage(6)}><p>6</p></Button>
                    <Button onPress={() => handleSetPerpage(7)}><p>7</p></Button>
                    <Button onPress={() => handleSetPerpage(8)}><p>8</p></Button>
                    <Button onPress={() => handleSetPerpage(9)}><p>9</p></Button>
                    <Button onPress={() => handleSetPerpage(10)}><p>10</p></Button>
                </div> :
                <Button onPress={() => setPerPageList(true)}><p>{perPage}</p></Button>
                
            }
        </div>
    );

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentpage(currentPage - 1);
            setCalculatedPosition((currentPage - 1) * perPage);
        }
    }

    const handleAdvance = () => {
        if (currentPage * perPage < universities.length) {
            setCurrentpage(currentPage + 1);
            setCalculatedPosition((currentPage - 1) * perPage);
        }
    }

    const SelectCurrentPage = () => (
        <div className={styles.perPage}>
            <p className={styles.perPageText}>Página atual:</p>
            <Button color='primary' onPress={() => handleBack()}><IoIosArrowBack color='#white' /></Button>
            <p className={styles.perPageText}>...{currentPage}...</p>
            <Button onPress={() => handleAdvance()}><IoIosArrowForward color='#white' /></Button>
        </div>
    );

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.container}>
            {universities.length ? (
                <>
                    <div className={styles.menu}>
                        <PerPageSelector />
                        <SelectCurrentPage />
                    </div>
                    <Header />
                    {universities.slice(calculatedPosition, calculatedPosition + perPage).map((university) => (
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