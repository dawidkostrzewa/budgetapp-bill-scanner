import React from 'react';
import { Button, Text, View } from 'react-native';
import { confirmRecipe } from '../api';
import { useRecipe } from '../Context/RecipeContext/useRecipe';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export const Summary = () => {
  const { recipeSummary } = useRecipe();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

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
      setIsLoading(true);
      const response = await confirmRecipe(data);
      if (response.error) {
        setError(`${response.error} ${response.message}`);
        setIsLoading(false);
        return;
      }
      setIsConfirmed(true);
    } catch (e) {
      console.log(e);
      setError(JSON.stringify(e));
      setIsConfirmed(false);
    }
    setIsLoading(false);
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
      {isLoading && (
        <ActivityIndicator
          size="large"
          animating={true}
          color={MD2Colors.red800}
          style={{ marginTop: 20 }}
        />
      )}
      {isConfirmed && (
        <Text style={{ color: 'black', width: '100%' }}>Confirmed</Text>
      )}
      {error && <Text style={{ color: 'black', width: '100%' }}>{error}</Text>}
    </View>
  );
};
