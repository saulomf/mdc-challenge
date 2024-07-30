import { getUniversityByCountry } from "@/app/services/universities";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

type ListProps = {
    countrySelected: string;
}

type University = {
    alpha_two_code: string,
    web_pages: string[],
    country: string,
    domains: string[],
    name: string,
    //state-province: string;
}

const List = ({ countrySelected }: ListProps) => {
    const [universities, setUniversities] = useState<University[]>([]);

    const getUniversitiesFromAPI = useCallback(async () => {
        try {
            const universitiesFronAPI = await getUniversityByCountry(countrySelected);

            setUniversities(universitiesFronAPI);
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }, [countrySelected]);

    useEffect(() => {
        if (countrySelected) {
            getUniversitiesFromAPI();
        }
    }, [countrySelected, getUniversitiesFromAPI]);

    const CustomTableRow = (university: University) => (
        <TableRow key={university.domains[0]}>
            <TableCell></TableCell>
        </TableRow>
    )

    return (
        <div className={styles.container}>
            {universities.length ? (
                <Table>
                    <TableHeader>
                        <TableColumn>Número</TableColumn>
                        <TableColumn>Nome da instituição</TableColumn>
                        <TableColumn>Site</TableColumn>
                        <TableColumn>Domínio</TableColumn>
                        <TableColumn>Estado</TableColumn>
                        {universities.map((university) => {
                            <CustomTableRow university={university} />
                        })}
                    </TableHeader>
                </Table>
            ) :
            <p>Nenhuma universidade encontrada</p>}
        </div>
    );
};

export default List;