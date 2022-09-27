import React from 'react';
import { Button, Text, View } from 'react-native';
import { confirmRecipe } from '../api';
import { useRecipe } from '../Context/RecipeContext/useRecipe';

export const Summary = () => {
  const { recipeSummary } = useRecipe();
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const total = recipeSummary.reduce((acc, c) => acc + +c.summary, 0);

  const sendSummary = async () => {
    const summary = recipeSummary.map(c => ({
      row: c.category.row,
      summary: c.summary,
      categoryName: c.category.name,
    }));

    const data = {
      summary,
      date: new Date(),
    };
    console.log('SENED SUMMARY', JSON.stringify(data));

    try {
      const response = await confirmRecipe(data);
      console.log(response);
      setIsConfirmed(true);
    } catch (e) {
      console.log('ERROR', e);
      setIsConfirmed(false);
    }
  };

  return (
    <View>
      <Text>Summary</Text>
      {recipeSummary.map((p, i) => {
        return (
          <Text style={{ color: 'black', width: '100%' }} key={i}>
            {p.category.name} - {p.summary}
          </Text>
        );
      })}
      <Text style={{ color: 'black', width: '100%' }}>TOTAL: {total}</Text>
      <Button onPress={sendSummary} title="CONFIRM" />
      {isConfirmed && (
        <Text style={{ color: 'black', width: '100%' }}>Confirmed</Text>
      )}
    </View>
  );
};
