import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({hyva, neutraali, huono}) => {
  
  let summa = hyva + neutraali + huono

  if (summa === 0){
    return (
      <div>ei yhtään palautetta annettu</div>
    )
  }
  let tulos = hyva - huono
  let ka = tulos / summa
  let prosentti = hyva / summa * 100
  
  return (
      <table>
        <tbody>
          <Statistic statistic = "hyvä" value = {hyva}/>
          <Statistic statistic = "neutraali" value = {neutraali}/>
          <Statistic statistic = "huono" value = {huono}/>
          <Statistic statistic = "keskiarvo" value = {ka}/>
          <Statistic statistic = "positiivisia" value = {prosentti}/>
        </tbody>
      </table>
    
  )
}

const Statistic = ({statistic, value}) => {
  if (statistic === "positiivisia"){
    return (
      <tr>
        <td>{statistic}</td>
        <td>{value}</td>
        <td> % </td>
    </tr>
    )
  }
  
  return (
    <tr>
      <td>{statistic}</td>
      <td>{value}</td>
    </tr>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0

    }
  }

  klikHyva = () => {
    return () => {
      this.setState({ hyva: this.state.hyva + 1})
    }
  }

  klikNeutraali = () => {
    return () => {
      this.setState({ neutraali: this.state.neutraali + 1})
    }
  }

  klikHuono = () => {
    return () => {
      this.setState({ huono: this.state.huono + 1})
    }
  }

  laskeKA = () => {
    let summa = this.state.hyva+this.state.neutraali+this.state.huono
    let tulos = this.state.hyva - this.state.huono
    let ka = tulos / summa
    return (
      ka
    )
  }

  render() {
    return (
      <div>
        
          <h1>anna palautetta</h1>
          <Button
            handleClick={this.klikHyva()}
            text="Hyvä"
          />
          <Button
            handleClick={this.klikNeutraali()}
            text="Neutraali"
          />
          <Button
            handleClick={this.klikHuono()}
            text="Huono"
          />
          <h1>statistiikka</h1>
          <Statistics 
          hyva = {this.state.hyva}
          neutraali = {this.state.neutraali}
          huono = {this.state.huono}
          />
        
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)