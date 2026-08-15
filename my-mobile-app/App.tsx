import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

export default function TicTacToe() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== '');

  const handlePress = (index: number) => {
    if (board[index] !== '' || winner || gameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      Alert.alert('Game Over', `Player ${newWinner} wins!`, [
        { text: 'Play Again', onPress: resetGame },
      ]);
      setGameOver(true);
    } else if (newBoard.every((cell) => cell !== '')) {
      Alert.alert('Game Over', "It's a draw!", [
        { text: 'Play Again', onPress: resetGame },
      ]);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
    setGameOver(false);
  };

  const getStatus = () => {
    if (winner) {
      return `Player ${winner} wins!`;
    } else if (isBoardFull) {
      return "It's a draw!";
    } else {
      return `Current Player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{getStatus()}</Text>

      <View style={styles.board}>
        {board.map((value, index) => (
          <Pressable
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
            disabled={value !== '' || winner !== null}
          >
            <Text style={styles.cellText}>{value}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    fontWeight: '500',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#00d4ff',
    marginBottom: 30,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#00d4ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  button: {
    backgroundColor: '#00d4ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
});

