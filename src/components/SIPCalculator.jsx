import { useState, useEffect } from 'react'
import './SIPCalculator.css'

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [salary, setSalary] = useState(30000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [initialStepUp, setInitialStepUp] = useState(100)
  const [initialStepUpYears, setInitialStepUpYears] = useState(3)
  const [laterStepUp, setLaterStepUp] = useState(10)
  const [salaryIncrement, setSalaryIncrement] = useState(10)
  const [additionalYears, setAdditionalYears] = useState(5)
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0
  })
  const [yearlyBreakdown, setYearlyBreakdown] = useState([])

  useEffect(() => {
    calculateSIP()
  }, [monthlyInvestment, salary, salaryIncrement, expectedReturn, timePeriod, initialStepUp, initialStepUpYears, laterStepUp, additionalYears])

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const annualRate = expectedReturn / 100
    const years = timePeriod
    const initialStepUpRate = initialStepUp / 100
    const laterStepUpRate = laterStepUp / 100
    const salaryIncrementRate = salaryIncrement / 100
    
    let totalInvestment = 0
    let futureValue = 0
    let currentMonthlyInvestment = monthlyInvestment
    let currentSalary = salary
    const breakdown = []
    
    // Calculate year by year with step-up for SIP period
    for (let year = 1; year <= years; year++) {
      const monthsInYear = 12
      const yearlyInvestment = currentMonthlyInvestment * monthsInYear
      const yearlySalary = currentSalary * monthsInYear
      const remainingSalary = currentSalary - currentMonthlyInvestment
      
      // Calculate for this year's SIP investment
      for (let month = 1; month <= monthsInYear; month++) {
        totalInvestment += currentMonthlyInvestment
        
        // Calculate the remaining months until end of investment period
        const remainingMonths = (years - year) * 12 + (monthsInYear - month)
        
        // Future value of this investment
        const fv = currentMonthlyInvestment * Math.pow(1 + monthlyRate, remainingMonths)
        futureValue += fv
      }
      
      // Store breakdown for this year
      const investmentPercentageOfSalary = (currentMonthlyInvestment / currentSalary) * 100
      
      breakdown.push({
        year,
        monthlySalary: Math.round(currentSalary),
        monthlyInvestment: Math.round(currentMonthlyInvestment),
        remainingSalary: Math.round(remainingSalary),
        investmentPercentage: investmentPercentageOfSalary,
        isLumpsumYear: false,
        totalInvestedTillDate: Math.round(totalInvestment),
        estimatedValueTillDate: Math.round(futureValue),
        returnsTillDate: Math.round(futureValue - totalInvestment)
      })
      
      // Increase monthly investment by step-up percentage for next year
      if (year < years) {
        // Use initial step-up rate for first X years, then later step-up rate
        if (year < initialStepUpYears) {
          currentMonthlyInvestment = currentMonthlyInvestment * (1 + initialStepUpRate)
        } else {
          currentMonthlyInvestment = currentMonthlyInvestment * (1 + laterStepUpRate)
        }
        
        // Increase salary by salary increment rate
        currentSalary = currentSalary * (1 + salaryIncrementRate)
      }
    }
    
    // Store SIP ending value
    const sipEndingValue = futureValue
    
    // Calculate additional years with lump sum (accumulated value)
    if (additionalYears > 0) {
      let lumpsumValue = sipEndingValue
      
      for (let year = 1; year <= additionalYears; year++) {
        // Grow the lump sum by annual return rate
        lumpsumValue = lumpsumValue * (1 + annualRate)
        
        // Add to breakdown
        breakdown.push({
          year: years + year,
          monthlySalary: 0,
          monthlyInvestment: 0,
          remainingSalary: 0,
          investmentPercentage: 0,
          isLumpsumYear: true,
          totalInvestedTillDate: Math.round(totalInvestment),
          estimatedValueTillDate: Math.round(lumpsumValue),
          returnsTillDate: Math.round(lumpsumValue - totalInvestment)
        })
      }
      
      futureValue = lumpsumValue
    }
    
    const estimatedReturns = futureValue - totalInvestment

    setResults({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue)
    })
    
    setYearlyBreakdown(breakdown)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const investmentPercentage = ((monthlyInvestment / salary) * 100).toFixed(1)

  return (
    <div className="sip-calculator">
      <h1>SIP Calculator</h1>
      <p className="subtitle">Calculate your Systematic Investment Plan returns</p>
      
      <div className="calculator-container">
        <div className="input-section">
          <div className="input-group full-width">
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

          <div className="input-group">
            <label>
              <span>Monthly Salary</span>
              <span className="value">{formatCurrency(salary)}</span>
            </label>
            <input
              type="range"
              min="30000"
              max="500000"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>₹30,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Salary Increment Per Year</span>
              <span className="value">{salaryIncrement}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={salaryIncrement}
              onChange={(e) => setSalaryIncrement(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Monthly Investment</span>
              <span className="value">{formatCurrency(monthlyInvestment)} <span className="percentage">({investmentPercentage}%)</span></span>
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
              <span>Initial Step Up (First {initialStepUpYears} Years)</span>
              <span className="value">{initialStepUp}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={initialStepUp}
              onChange={(e) => setInitialStepUp(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Initial Step Up Period</span>
              <span className="value">{initialStepUpYears} Years</span>
            </label>
            <input
              type="range"
              min="1"
              max={timePeriod}
              step="1"
              value={initialStepUpYears}
              onChange={(e) => setInitialStepUpYears(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>1 Year</span>
              <span>{timePeriod} Years</span>
            </div>
          </div>

          <div className="input-group">
            <label>
              <span>Later Step Up (After {initialStepUpYears} Years)</span>
              <span className="value">{laterStepUp}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={laterStepUp}
              onChange={(e) => setLaterStepUp(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="input-group full-width">
            <label>
              <span>Continue Investment as Lump Sum (Additional Years)</span>
              <span className="value">{additionalYears} Years</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={additionalYears}
              onChange={(e) => setAdditionalYears(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0 Years</span>
              <span>20 Years</span>
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

        <div className="breakdown-section">
          <h2>Year-by-Year Breakdown</h2>
          <div className="table-container">
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Monthly Salary</th>
                  <th>Monthly Investment</th>
                  <th>Investment %</th>
                  <th>Remaining Salary</th>
                  <th>Total Invested</th>
                  <th>Estimated Value</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((row) => {
                  // Determine color class based on investment percentage
                  let percentageClass = 'percentage-green'
                  if (row.investmentPercentage > 30) {
                    percentageClass = 'percentage-red'
                  } else if (row.investmentPercentage > 20) {
                    percentageClass = 'percentage-yellow'
                  }
                  
                  return (
                    <tr key={row.year} className={row.isLumpsumYear ? 'lumpsum-row' : ''}>
                      <td>{row.year}</td>
                      <td>{row.isLumpsumYear ? '-' : formatCurrency(row.monthlySalary)}</td>
                      <td>{row.isLumpsumYear ? 'Lump Sum Growth' : formatCurrency(row.monthlyInvestment)}</td>
                      <td className={row.isLumpsumYear ? '' : percentageClass}>
                        {row.isLumpsumYear ? '-' : `${row.investmentPercentage.toFixed(1)}%`}
                      </td>
                      <td>{row.isLumpsumYear ? '-' : formatCurrency(row.remainingSalary)}</td>
                      <td>{formatCurrency(row.totalInvestedTillDate)}</td>
                      <td>{formatCurrency(row.estimatedValueTillDate)}</td>
                      <td className="positive">{formatCurrency(row.returnsTillDate)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SIPCalculator
