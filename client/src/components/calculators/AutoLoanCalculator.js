import React, {useState} from 'react';

const AutoLoanCalculator = ({autoCredit}) => {
    const [loanTerm, setLoanTerm] = useState(12);
    const [loanAmount, setLoanAmount] = useState(100000);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const handleLoanAmountChange = (event) => {
        setLoanAmount(event.target.value);
    };

    const handleLoanTermChange = (event) => {
        setLoanTerm(event.target.value);
    };

    const calculateMonthlyPayment = () => {
        const monthlyInterestRate = autoCredit / 100 / 12;
        const numberOfPayments = loanTerm;
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        const payment = loanAmount * (numerator / denominator);
        if (Number.isFinite(payment)) {
            setMonthlyPayment(payment.toFixed(2));
        }else{
            setMonthlyPayment("Не верно указаны данные");
        }
    };

    return (
        <div>
            <h1>Калькулятор Авто кредита</h1>
            <div>
                <label>Процентная ставка (%): {autoCredit}</label>
            </div>
            <div>
                <label>Сумма кредита : </label>
                <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                />
                <input
                    type="range"
                    min="100000"
                    max="5000000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Срок кредита (месяцы): {loanTerm}</label>
                <input
                    type="range"
                    min="1"
                    max="48"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                />
            </div>
            <button onClick={calculateMonthlyPayment}>Рассчитать</button>
            <div>
                <h2>Ежемесячный платеж: {monthlyPayment}</h2>
            </div>
        </div>
    );
};

export default AutoLoanCalculator;