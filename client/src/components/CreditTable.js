import React, { useState, useEffect } from 'react';

function CreditTable() {
    const [consumerCredit, setConsumerCredit] = useState(14.5);
    const [autoCredit, setAutoCredit] = useState(3.5);
    const [mortgageCredit, setMortgageCredit] = useState(9.6);
    const [apiData, setApiData] = useState(null);
    const [updatedRates, setUpdatedRates] = useState({
        consumer: consumerCredit,
        auto: autoCredit,
        mortgage: mortgageCredit
    });

    useEffect(() => {
        fetch('http://localhost:4000/key-rates')
            .then(response => response.json())
            .then(data => {
                setApiData(data);
                data.forEach(element => {
                    switch (element.type) {
                        case 'Потребительский':
                            setConsumerCredit(element.rate);
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
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (event, type) => {
        setUpdatedRates({
            ...updatedRates,
            [type]: parseFloat(event.target.value)
        });
    };

    const handleSubmit = () => {
        fetch('http://localhost:4000/update-rates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRates)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Таблица кредитных ставок</h1>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Тип кредита</th>
                    <th>Ставка</th>
                    <th>Новая ставка</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Потребительский</td>
                    <td>{consumerCredit}</td>
                    <td><input type="number" value={updatedRates.consumer} onChange={(e) => handleInputChange(e, 'consumer')} /></td>
                </tr>
                <tr>
                    <td>Автокредит</td>
                    <td>{autoCredit}</td>
                    <td><input type="number" value={updatedRates.auto} onChange={(e) => handleInputChange(e, 'auto')} /></td>
                </tr>
                <tr>
                    <td>Ипотека</td>
                    <td>{mortgageCredit}</td>
                    <td><input type="number" value={updatedRates.mortgage} onChange={(e) => handleInputChange(e, 'mortgage')} /></td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleSubmit}>Обновить ставки</button>
        </div>
    );
}

export default CreditTable;