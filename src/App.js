import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.verificationButton = this.verificationButton.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      // isSaveButtonDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  verificationButton() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    if (!cardName || !cardDescription || !cardImage || !cardRare) {
      console.log('algum campo está vazio');
      return true;
    }

    // Esta concatenando ao invés de somar os valores individuais.
    const sumAttribute = (+cardAttr1 + +cardAttr2 + +cardAttr3);
    console.log(sumAttribute);
    console.log(cardAttr1);
    console.log(cardAttr2);

    const limitSum = 210;
    const limitAttribute = 90;
    const negativeNumbers = 0;

    if (cardAttr1 > limitAttribute
      || cardAttr2 > limitAttribute
      || cardAttr3 > limitAttribute) {
      console.log('extrapolou o limite individual');
      return true;
    }

    if (cardAttr1 < negativeNumbers
      || cardAttr2 < negativeNumbers
      || cardAttr3 < negativeNumbers) {
      console.log('Não aceita numeros negativos');
      return true;
    }

    if (sumAttribute > limitSum) {
      console.log('extrapolou o limite da soma total');
      return true;
    }

    return false;
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ this.verificationButton() }
          onInputChange={ this.onInputChange }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
