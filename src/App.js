import * as React from "react";
import { Button, ChakraProvider, Flex, Text, VStack } from "@chakra-ui/react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// bikin reducer
const ticTacToe = createSlice({
  name: "ticTacToe",
  initialState: {
    squares: Array(9).fill(null),
    winner: null,
    nextValue: "X",
    status: "Next player: X",
  },
  reducers: {
    selectSquare(state, action) {
      if (!state.winner && !state.squares[action.payload]) {
        const newSquares = [...state.squares];
        newSquares[action.payload] = calculateNextValue(state.squares);
        const winner = calculateWinner(newSquares);
        const nextValue = calculateNextValue(newSquares);
        const status = calculateStatus(winner, newSquares, nextValue);
        return {
          squares: newSquares,
          winner,
          status,
        };
      }
    },
    // Todo: bikin reducer restart
  },
});

// action
export const { selectSquare } = ticTacToe.actions;

// store
const store = configureStore({
  reducer: ticTacToe.reducer,
});

function Board() {
  const { status, squares } = useSelector((state) => state);
  const dispatch = useDispatch();
  function selectSquareHandler(squareIndex) {
    dispatch(selectSquare(squareIndex));
  }

  function renderSquare(i) {
    return (
      <Button
        w="100px"
        h="100px"
        variant="outline"
        borderWidth="2px"
        borderColor="gray"
        marginLeft="8px"
        onClick={() => selectSquareHandler(i)}
      >
        {squares[i]}
      </Button>
    );
  }

  return (
    <VStack>
      <Text>{status}</Text>
      <Flex>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Flex>
      <Flex>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Flex>
      <Flex>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Flex>
      <Button>
        {/* Todo: styling restart */}
        restart
      </Button>
    </VStack>
  );
}

function Game() {
  return (
    // Todo: styling board
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Game />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
