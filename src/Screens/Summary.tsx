import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { confirmRecipe } from '../api';
import { useRecipe } from '../Context/RecipeContext/useRecipe';
import {
  ActivityIndicator,
  Button,
  DataTable,
  MD2Colors,
  Snackbar,
} from 'react-native-paper';
import { reactNativePaperRequiredProps } from '../utils/utils';

export const Summary = () => {
  const { recipeSummary } = useRecipe();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [toastVisible, setToastVisible] = React.useState(false);

  const total = parseFloat(
    recipeSummary.reduce((acc, c) => acc + +c.summary, 0).toString(),
  ).toFixed(2);

  const onDismissSnackBar = () => setToastVisible(false);

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
    setToastVisible(true);
    setIsLoading(false);
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.cellTitle}>Category</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.cellTitle}>Price</Text>
          </DataTable.Title>
        </DataTable.Header>
        {recipeSummary.map(p => {
          return (
            <DataTable.Row
              key={p.category.name}
              {...reactNativePaperRequiredProps}>
              <DataTable.Cell>
                <Text style={styles.text}>{p.category.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.text}>{p.summary} PLN</Text>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
        <DataTable.Row {...reactNativePaperRequiredProps}>
          <DataTable.Cell>
            <Text style={styles.total}>Total</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.total}>{total} PLN</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Button
        onPress={sendSummary}
        mode="contained"
        style={{ marginTop: 20, paddingHorizontal: 20 }}>
        Send
      </Button>
      {isLoading && (
        <ActivityIndicator
          size="large"
          animating={true}
          color={MD2Colors.red800}
          style={{ marginTop: 20 }}
        />
      )}

      <Snackbar
        style={styles.toast}
        visible={toastVisible}
        onDismiss={onDismissSnackBar}>
        {isConfirmed && <Text style={styles.text}>Recipe added to sheet</Text>}
        {error && <Text style={styles.text}>{error}</Text>}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  total: { fontSize: 20, fontWeight: '500', color: 'darkred' },
  text: {
    color: 'black',
  },
  cellTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  toast: {
    position: 'absolute',
    top: '100%',
    width: '100%',
  },
});
