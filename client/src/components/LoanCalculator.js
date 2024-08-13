import React, {useState, useEffect} from 'react';
import ConsumerLoanCalculator from './calculators/ConsumerLoanCalculator';
import AutoLoanCalculator from './calculators/AutoLoanCalculator';
import MortgageLoanCalculator from "./calculators/MortgageLoanCalculator";

const LoanCalculators = () => {
    const [consumerCredit, setInterestRate] = useState(9);
    const [autoCredit, setAutoCredit] = useState(6);
    const [mortgageCredit, setMortgageCredit] = useState(10000);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/key-rates')
            .then(response => response.json())
            .then(data => {
                setApiData(data);
                data.map(element => {
                    switch (element.type) {
                        case 'Потребительский':
                            setInterestRate(element.rate);
                            break;
                        case 'Автокредит':
                            setAutoCredit(element.rate);
                            break;
                        case 'Ипотека':
                            setMortgageCredit(element.rate);
                            break;
                        default:
                            console.warn(`Неизвестный тип данных: ${element.type}`);
                    }
                })
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
        < ConsumerLoanCalculator
            consumerCredit={consumerCredit}
        />
        < AutoLoanCalculator
            autoCredit={autoCredit}
        />
        < MortgageLoanCalculator
            mortgageCredit={mortgageCredit}
        />
        </div>
    );
};

export default LoanCalculators;