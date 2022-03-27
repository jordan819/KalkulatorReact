import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions
} from 'react-native'
import MathView, { MathText } from 'react-native-math-view';

var mexp = require('math-expression-evaluator');

class HomeScreen extends Component {
  state = {
    result: 0,
    isComa: false,
    isVerticalOrientation: true,
    array: [
        {
          title: 'example title 1',
          subtitle: 'example subtitle 1',
        },
        {
          title: 'example title 2',
          subtitle: 'example subtitle 2',
        },
        {
          title: 'example title 3',
          subtitle: 'example subtitle 3',
        },
      ],
  }

  buttons = () => {
    return this.state.array.map((element) => {
      return (
        <View style={element.style}>
          <Text>{element.title}</Text>
          <Text>{element.subtitle}</Text>
        </View>
      );
    });
  };

  toDisplay = () => {
    let newString = this.state.result.toString();
    console.log(newString);
    newString = newString.replace(/root/g, '√').replace(/pi/g, 'π');
    return newString;
  }

  checkIfDeviceIsInVerticalOrHorizontalOrientation = () => {
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
      if(screenWidth > screenHeight){
        this.setState({isVerticalOrientation: false})
      }else{
        this.setState({isVerticalOrientation: true})
      }
  }

  handleInput(button) {

    if(button == 'pm') {
      this.setState({
        result: this.state.result * -1
      })
      return
    }

    if(button == '%') {
      this.setState({
        result: this.state.result/100
      })
      return
    }

    if (button == 'AC') {
      this.setState({
        result: 0,
        isComa: false
      })
      return
    }

    if (button == '=') {
      // const exp = this.state.result.replace('X', '*')
      // let newResult = mexp.eval(exp);
      console.log('Przed, result: ', this.state.result)
      let newResult = mexp.eval(this.state.result);
      console.log('Po')

      this.setState({
        result: newResult,
        isOperatorSelected: false,
        selectedOperator: '',
        isComa: false
      })

      return
    }

    if (button == '.') {
      if(this.state.result == 0){
        this.setState({
          isComa: true,
          result: '0' + button
        })
      } else if(!this.state.isComa){
        this.setState({
          isComa: true,
          result: this.state.result + button
        })
      }
    } else if (this.state.result == 0 && (button !== '*' && button !== '/' && button !== '+' && button !== '-' &&
                                    button !== '=')) {
      this.setState({
        result: button
      })
    } else {
        if (button == '*' || button == '/' || button == '+' || button == '-') {
          this.setState({
            result: this.state.result + button,
            isComa: false
          })
        } else if(button == '.' && !this.state.isComa){
          this.setState({
            isComa: true,
            result: this.state.result + '.'
          })
        } else {
          this.setState({
            result: this.state.result + button
          })
        }
    }
  }



 render() {
    if(this.state.isVerticalOrientation)
      return (
      <View onLayout={()=>this.checkIfDeviceIsInVerticalOrHorizontalOrientation()} style={styles.container}>

        <View style={styles.result}><Text style={styles.resultText}>{this.state.result}</Text></View>

        <View style={styles.allButtons}>

          <View style={styles.row}>

            <TouchableOpacity
             style={styles.button}
             onPress={() => this.handleInput('AC')}
            >
                    <MathView config={{ ex: 20 }} style={styles.baseText} math='AC'/>
            </TouchableOpacity>

            <View style={[styles.button, styles.wideButton]}></View>

            <TouchableOpacity
              style={[styles.button, styles.operator]}
              onPress={() => this.handleInput('/')}
            >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='\div'/>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('7')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='7'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('8')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='8'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('9')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='9'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.operator]}
                onPress={() => this.handleInput('*')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='\times'/>
              </TouchableOpacity>

          </View>

          <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('4')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='4'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('5')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='5'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('6')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='6'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.operator]}
                onPress={() => this.handleInput('-')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='-'/>
              </TouchableOpacity>

          </View>

          <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('1')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='1'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('2')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='2'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('3')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='3'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.operator]}
                onPress={() => this.handleInput('+')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='+'/>
              </TouchableOpacity>
          </View>

          <View style={styles.row}>
              <TouchableOpacity
                style={[styles.button, styles.wideButton]}
                onPress={() => this.handleInput('0')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='0'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('.')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math=','/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.operator]}
                onPress={() => this.handleInput('=')}
              >
                <MathView config={{ ex: 20 }} style={styles.baseText} math='='/>
              </TouchableOpacity>
          </View>

        </View>

      </View>
    )
    else
      return (
        <View onLayout={()=>this.checkIfDeviceIsInVerticalOrHorizontalOrientation()} style={styles.container}>

          <View style={styles.result}>
            <Text style={styles.resultTextRow}>
              {this.toDisplay()}
            </Text>
          </View>

          <View style={styles.allButtons}>

            <View style={styles.row}>

              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('root')}
              >
                <MathView style={styles.baseTextRow} math='\sqrt{x}'/>
              </TouchableOpacity>

              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('!')}
              >
                <MathView style={styles.baseTextRow} math='x!'/>
              </TouchableOpacity>

              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('AC')}
              >
                      <MathView style={styles.baseTextRow} math='AC'/>
              </TouchableOpacity>

              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('pm')}
              >
                <MathView style={styles.baseTextRow} math='\pm'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('%')}
              >
                <MathView style={styles.baseTextRow} math='\%'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.operator]}
                onPress={() => this.handleInput('/')}
              >
                  <MathView style={styles.baseTextRow} math='÷'/>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                 style={styles.button}
                 onPress={() => this.handleInput('e^')}
                >
                  <MathView style={styles.baseTextRow} math='e^x'/>
                </TouchableOpacity>

                <TouchableOpacity
                 style={styles.button}
                 onPress={() => this.handleInput('10^')}
                >
                  <MathView style={styles.baseTextRow} math='10^x'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('7')}
                >
                  <MathView style={styles.baseTextRow} math='7'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('8')}
                >
                  <MathView style={styles.baseTextRow} math='8'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('9')}
                >
                  <MathView style={styles.baseTextRow} math='9'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.operator]}
                  onPress={() => this.handleInput('*')}
                >
                  <MathView style={styles.baseTextRow} math='\times'/>
                </TouchableOpacity>

            </View>

            <View style={styles.row}>
                <TouchableOpacity
                 style={styles.button}
                 onPress={() => this.handleInput('ln')}
                >
                  <MathView style={styles.baseTextRow} math='ln'/>
                </TouchableOpacity>

                <TouchableOpacity
                 style={styles.button}
                 onPress={() => this.handleInput('log')}
                >
                  <MathView style={styles.baseTextRow} math='log'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('4')}
                >
                  <MathView style={styles.baseTextRow} math='4'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('5')}
                >
                  <MathView style={styles.baseTextRow} math='5'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('6')}
                >
                  <MathView style={styles.baseTextRow} math='6'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.operator]}
                  onPress={() => this.handleInput('-')}
                >
                  <MathView style={styles.baseTextRow} math='-'/>
                </TouchableOpacity>

            </View>

            <View style={styles.row}>
              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('e')}
              >
                <MathView style={styles.baseTextRow} math='e'/>
              </TouchableOpacity>

              <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleInput('^2')}
              >
                <MathView style={styles.baseTextRow} math='x^2'/>
              </TouchableOpacity>

              <TouchableOpacity
               style={[styles.button, styles.lightGrey]}
               onPress={() => this.handleInput('1')}
              >
                <MathView style={styles.baseTextRow} math='1'/>
              </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('2')}
                >
                  <MathView style={styles.baseTextRow} math='2'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('3')}
                >
                  <MathView style={styles.baseTextRow} math='3'/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.operator]}
                  onPress={() => this.handleInput('+')}
                >
                  <MathView style={styles.baseTextRow} math='+'/>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('pi')}
              >
                <MathView style={styles.baseTextRow} math='\pi'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleInput('^3')}
              >
                <MathView style={styles.baseTextRow} math='x^3'/>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.wideButton, styles.lightGrey]}
                onPress={() => this.handleInput('0')}
              >
                <MathView style={styles.baseTextRow} math='0'/>
              </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.lightGrey]}
                  onPress={() => this.handleInput('.')}
                >
                  <MathView style={styles.baseTextRow} math=','/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.operator]}
                  onPress={() => this.handleInput('=')}
                >
                  <MathView style={styles.baseTextRow} math='='/>
                </TouchableOpacity>
            </View>

          </View>

        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525252'
  },
  result: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 15
  },
  darkGrey: {
    backgroundColor: '#404040'
  },
  lightGrey: {
    backgroundColor: '#7d7d7d'
  },
  resultText: {
    fontSize: 60
  },
  resultTextRow: {
    fontSize: 45
  },
  allButtons: {
    flex: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#474747',
    padding: 10,
    margin: 1
  },
  wideButton: {
    paddingHorizontal: 21,
    flex: 2
  },
  operator: {
    backgroundColor: '#c95400'
  },
  baseText: {
    color: '#ffffff',
    fontSize: 40
  },
  baseTextRow: {
    color: '#ffffff',
    fontSize: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default HomeScreen;
