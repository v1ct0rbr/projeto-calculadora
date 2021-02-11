import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MyButton from './components/MyButton'
import OpButton from './components/OperationButton'
import { MainStyle } from './assets/style'


export default function App() {

  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")
  const [result, setResult] = useState(0)
  const [operation, setOperation] = useState("")
  const [decimalNumber, setDecimalNumber] = useState(false)

  const [textCalc, setTextCalc] = useState("0")
  const [typingNumber, setTypingNumber] = useState("")




  var values = [];
  for (var i = 0; i < 10; i++) {
    values.unshift(i)
  }

  const clear = () => {
    setFirstNumber("")
    setResult(0)
    setSecondNumber("")
    setOperation("")
    setTextCalc("")
  }

  const clearDigit = () => {
    var stringNumber = ""
    var numberLength = ""
    if (secondNumber != "") {
      numberLength = secondNumber.length;
      
      if (numberLength > 1)
        if (numberLength == 2 && secondNumber < 0)
          setSecondNumber("")
        else {
          // setSecondNumber(parseFloat(stringNumber.slice(0, numberLength - 1)))
          setSecondNumber(secondNumber.slice(0, numberLength - 1))
        }
      else {
        setSecondNumber("")
      }
    }
    else if (operation != "")
      setOperation(0)
    else if (firstNumber != "") {
      numberLength = firstNumber.length;
      
      if (numberLength > 1)
        if (numberLength == 2 && firstNumber < 0)
          // setFirstNumber(0)
          setFirstNumber("")
        else
          // setFirstNumber(parseFloat(stringNumber.slice(0, numberLength - 1)))
          setFirstNumber(firstNumber.slice(0, numberLength - 1))
      else {
        // setFirstNumber(0)
        setFirstNumber("")
      }
    }

  }
  const clearNumber = () => {

    if (secondNumber != "") {
      // setSecondNumber(0)
      setSecondNumber("")
    } else if (operation != "") {
      setOperation("")
    } else if (firstNumber != "") {
      // setFirstNumber(0)
      setFirstNumber("")
    }

  }


  const negateValue = () => {
    if (operation == "") {


      // setFirstNumber(-1 * firstNumber);
      setFirstNumber((-1 * parseFloat(firstNumber)).toString());
      // setTextCalc(textCalc + operation + firstNumber)
    } else {

      // setSecondNumber(-1 * secondNumber)
      setSecondNumber((-1 * parseFloat(secondNumber)).toString());
      // setTextCalc(textCalc + operation + secondNumber)
    }
  }

  const changeToDecimalNumber = () => {
    if (decimalNumber == true)
      setDecimalNumber(false)
    else
      setDecimalNumber(true)
  }

  const setValue = (val) => {
    var number = 0
    if (operation == "") {
      // setFirstNumber(parseFloat(firstNumber.toString() + (decimalNumber == true && firstNumber % 1 == 0 ? "." : "") + val.toString()));
      setFirstNumber(firstNumber + (decimalNumber == true && parseFloat(firstNumber) % 1 == 0 ? "." : "") + val);
      // setTextCalc(textCalc + operation + firstNumber)
    } else {

      // setSecondNumber(parseFloat(secondNumber.toString() + (decimalNumber == true && secondNumber % 1 == 0 ? "." : "") + val.toString()))
      setSecondNumber(secondNumber + (decimalNumber == true && parseFloat(secondNumber) % 1 == 0 ? "." : "") + val)
      // setTextCalc(textCalc + operation + secondNumber)
    }
    setDecimalNumber(false)
  }

  const calculoAux = (op) => {
    if (operation != "") {
      setTextCalc(textCalc + firstNumber.toString() + operation)
      calculoResultado();
      setOperation(op)

    } else {
      setOperation(op)
      setTextCalc(textCalc + secondNumber.toString() + (op == operation ? '' : operation))
    }

  }

  const calculoResultado = () => {
    var calc = 0;
    var number1 = parseFloat(firstNumber);
    var number2 = parseFloat(secondNumber);
    switch (operation) {
      case "+":
        calc = number1 + number2
        break;
      case "-":
        calc = number1 - number2

        break;
      case "*":
        calc = number1 * number2


        break;
      case "/":
        try {
          calc = firstNumber / secondNumber
        }
        catch (error) {
          alert(error)
        }
        break;
      case "%":
        calc = (number1 / 100) * number2 
        break;
      default:
        break;

    }
    setResult(calc)
    setFirstNumber(calc)
    setSecondNumber("")
    setOperation("")

  }
  return (
    <React.Fragment>
      <StatusBar hidden />
      <View style={styles.container} >

        <View style={styles.top}>
          <Text style={styles.textCalc}>
            {/* {firstNumber != 0 ? firstNumber.toString() : ""} {operation} {secondNumber != 0 ? secondNumber.toString() : ''} */}
            {firstNumber != "0" ? firstNumber : ""} {operation} {secondNumber != "0" ? secondNumber : ''}

          </Text>
          <Text style={styles.textResult}>{result}</Text>
        </View>

        <View style={styles.board} >

          <OpButton value={'%'} setOperation={setOperation} />
          <OpButton value={'CE'} setOperation={clearNumber} />
          <OpButton value={'C'} icon={'backspace'} setOperation={clearDigit} />
          <OpButton value={'AC'} setOperation={clear} />

          <MyButton value={7} setValue={setValue} />
          <MyButton value={8} setValue={setValue} />
          <MyButton value={9} setValue={setValue} />

          <OpButton value={'*'} icon={'times'} setOperation={calculoAux} />

          <MyButton value={4} setValue={setValue} />
          <MyButton value={5} setValue={setValue} />
          <MyButton value={6} setValue={setValue} />

          <OpButton value={'-'} icon={'minus'} setOperation={calculoAux} />

          <MyButton value={1} setValue={setValue} />
          <MyButton value={2} setValue={setValue} />
          <MyButton value={3} setValue={setValue} />

          <OpButton value={'+'} icon={'plus'} setOperation={calculoAux} />

          <OpButton value={'.'} setOperation={changeToDecimalNumber} />


          <MyButton value={0} setValue={setValue} />
          <TouchableOpacity onPress={() => { calculoResultado(); setOperation(""); }} style={[MainStyle.button, MainStyle.blueButton]}>
            <Text style={MainStyle.textButton}>=</Text>
          </TouchableOpacity>

          <OpButton value={'/'} icon={'divide'} setOperation={calculoAux} />
          <OpButton value={'+/-'} icon={'exclamation'} setOperation={negateValue} />

        </View>
      </View>
    </React.Fragment >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: '#4c4646',
    height: '100%',
  },
  top: {
    width: "100%",
    padding: 5,
    paddingBottom: 20,
    marginBottom: 30,
    marginTop: 30,
    paddingRight: 20
  },
  textCalc: {
    fontSize: 20, textAlign: "right",
    color: 'white',
    fontWeight: "200"
  },
  textResult: {
    fontSize: 50, textAlign: "right",
    color: 'white',
    fontWeight: "900"
  },
  board: {
    flexDirection: "row",
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: "center"
  },
});
