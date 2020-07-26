import React from 'react';
import styled from 'styled-components';
import Lot from './Lot';
import { generateId } from '../tools';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 340px 100px 40px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NewLotWrapper = styled.div``;

const AddNewLotBtn = styled.div`
  width: 50px;
  text-align: center;
  background-color: rgba(249, 249, 249, 0.3);
  border-radius: 4px;
  float: right;
  margin-top: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: rgba(249, 249, 249, 0.5);
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const LotsList = ({lots, changeLots, setIsChangingLot}) => {

  const addNewLot = () => {
    changeLots((prevLots) => {
      const newLots = [...prevLots];
      newLots.push({ name: '', id: generateId(), price: 0 });
      return newLots;
    });
  };

  const updateLot = (newLotData) => {
    changeLots((prevLots) => {
      const newLots = [...prevLots].map((lot) => {
        if (lot.id === newLotData.id) {
          return newLotData;
        }

        return lot;
      });

      return newLots.sort((a,b) => b.price - a.price);
    });
  };

  const deleteLot = removedLotData => {
    if(lots.length === 1) return;
    changeLots(prevLots => [...prevLots].filter(lot => lot.id !== removedLotData.id))
  }

  return (
    <Wrapper>
      <List>
        {lots.map((lot, i) => (
          <Lot setIsChangingLot={setIsChangingLot} deleteLot={deleteLot} updateLot={updateLot} key={lot.id} pos={++i} lotData={lot} />
        ))}
      </List>
      <NewLotWrapper>
        <AddNewLotBtn onClick={addNewLot}>+</AddNewLotBtn>
      </NewLotWrapper>
    </Wrapper>
  );
};

export default LotsList;
