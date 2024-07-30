import { getCountries } from "@/app/services/countries";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@nextui-org/button";
import { IoMdArrowDropdown } from "react-icons/io";

type CountryProps = {
    name: {
        common: string;
    },
    cca2: string
}

type SelectedProps = {
    handleParentSelect: (name: string) => void;
}

const Selector = ({ handleParentSelect }: SelectedProps) => {
    const [countries, setCountries] = useState<CountryProps[]>();
    const [countrySelected, setCountrySelected] = useState<string>('');
    const [listOpened, setListOpened] = useState<boolean>(false);

    const getCountriesFromAPI = async () => {
        try {
            const countriesFromAPI: CountryProps[] = await getCountries();
            countriesFromAPI.sort((a, b) => a.name.common.localeCompare(b.name.common))
            setCountries(countriesFromAPI);
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        getCountriesFromAPI();
    }, []);

    const handleSelect = (name: string) => {
        setListOpened(false);
        setCountrySelected(name);
        handleParentSelect(name);
    }

    return (
        <div className={styles.container}>
            {listOpened && countries?.length ? (
                <div className={styles.countriesList}>
                    {countries.map((country) => (
                        <Button
                            key={country.cca2}
                            onPress={() => handleSelect(country.name.common)}
                            className={styles.countryCard}
                        >
                            <p className={styles.countryName}>{country.name.common}</p>
                        </Button>
                    ))}
                </div>
            ) :
            <Button
                    onPress={() => setListOpened(true)}
                    className={styles.countrySelected}
                >
                    <p className={styles.countryName}>{countrySelected || 'Selecione um país'}</p>
                    <IoMdArrowDropdown size={32} color='black' />
                </Button>}
        </div>
    );
}

export default Selector;