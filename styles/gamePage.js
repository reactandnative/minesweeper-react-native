import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 64,
  },
  board: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFFF7',
  },
  boardSquare: {
    height: 30,
    width: 30,
    backgroundColor: "#41EAD4",
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boardRow: {
    flexDirection: 'row',
  },
  questionText: {
    margin: 20,
    fontSize: 30,
    textAlign: 'center',
  },
  answerText: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  answerLetter: {
    padding: 3,
    fontSize: 40,
  }, 
  squareLetter: {
    padding: 1,
    fontSize: 20,
  },
});

