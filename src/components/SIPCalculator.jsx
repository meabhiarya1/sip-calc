import { useState, useEffect } from 'react'
import './SIPCalculator.css'

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0
  })

  useEffect(() => {
    calculateSIP()
  }, [monthlyInvestment, expectedReturn, timePeriod])

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = timePeriod * 12
    
    // SIP Future Value Formula: FV = P × [(1 + r)^n - 1] / r × (1 + r)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    
    const totalInvestment = monthlyInvestment * months
    const estimatedReturns = futureValue - totalInvestment

    setResults({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue)
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="sip-calculator">
      <h1>SIP Calculator</h1>
      <p className="subtitle">Calculate your Systematic Investment Plan returns</p>
      
      <div className="calculator-container">
        <div className="input-section">
          <div className="input-group">
            <label>
              <span>Monthly Investment</span>
              <span className="value">{formatCurrency(monthlyInvestment)}</span>
            </label>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Expected Return Rate (p.a.)</span>
              <span className="value">{expectedReturn}%</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Time Period</span>
              <span className="value">{timePeriod} Years</span>
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-card">
            <h3>Invested Amount</h3>
            <p className="amount invested">{formatCurrency(results.totalInvestment)}</p>
          </div>

          <div className="result-card">
            <h3>Estimated Returns</h3>
            <p className="amount returns">{formatCurrency(results.estimatedReturns)}</p>
          </div>

          <div className="result-card total">
            <h3>Total Value</h3>
            <p className="amount total-value">{formatCurrency(results.totalValue)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SIPCalculator
