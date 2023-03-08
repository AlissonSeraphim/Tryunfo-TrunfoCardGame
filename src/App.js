import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filters from './components/Filters';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.verificationButton = this.verificationButton.bind(this);
    this.saveCard = this.saveCard.bind(this);

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
      arrayCards: [],
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

  trunfoValidation = () => {
    const {
      arrayCards,
    } = this.state;

    return arrayCards.some((card) => card.cardTrunfo);
  };

  deleteCard = (cardName) => {
    const {
      arrayCards,
    } = this.state;

    const newArray = arrayCards.filter((card) => card.cardName !== cardName);
    console.log(newArray);
    this.setState({
      arrayCards: newArray,
    });
  };

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

    // Esta concatenando ao invés de somar os valores individuais.Resolvido.
    const sumAttribute = (+cardAttr1 + +cardAttr2 + +cardAttr3);
    // console.log(sumAttribute);
    // console.log(cardAttr1);
    // console.log(cardAttr2);

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

  saveCard(event) {
    event.preventDefault();

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      arrayCards,
      cardTrunfo,
      hasTrunfo,
    } = this.state;

    const newCardObject = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };

    console.log(arrayCards.some((card) => card.cardTrunfo));

    this.setState({

      arrayCards: [...arrayCards, newCardObject],
      // reset do formulario
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
    });
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
      arrayCards,
      searchName,
      selectRare,
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
          hasTrunfo={ this.trunfoValidation() }
          isSaveButtonDisabled={ this.verificationButton() }
          onSaveButtonClick={ this.saveCard }
          onInputChange={ this.onInputChange }
          arrayCards={ arrayCards }
        />
        <Filters
          searchName={ searchName }
          selectRare={ selectRare }
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
        <div>
          {
            arrayCards
              // .filter((card) => card.cardName.includes(searchName)) ué
              .map((card) => (
                <>
                  <Card
                    key={ card.cardName }
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <button
                    data-testid="delete-button"
                    type="button"
                    onClick={ () => { this.deleteCard(card.cardName); } }
                  >
                    Delete Card
                  </button>
                </>
              ))
          }
        </div>
      </div>
    );
  }
}

export default App;
