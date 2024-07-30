import { getCountries } from "@/app/services/countries";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@nextui-org/button";
import { IoMdArrowDropdown } from "react-icons/io";

type CountryProps = {
    name: {
        official: string;
    },
    cca2: string
}

const Selector = () => {
    const [countries, setCountries] = useState<CountryProps[]>();
    const [countrySelected, setCountrySelected] = useState<string>('');
    const [listOpened, setListOpened] = useState<boolean>(false);

    const getCountriesFromAPI = async () => {
        try {
            const countriesFromAPI = await getCountries();

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
    }

    return (
        <div className={styles.container}>
            {listOpened && countries?.length ? (
                <div className={styles.countriesList}>
                    {countries.map((country) => (
                        <Button
                            key={country.cca2}
                            onPress={() => handleSelect(country.name.official)}
                            className={styles.countryCard}
                        >
                            <p className={styles.countryName}>{country.name.official}</p>
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