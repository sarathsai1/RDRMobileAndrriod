import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';

type SubscriptionPlansType = {
  id: string;
  name: string;
  subscriptionDuration: number;
  subscriptionPlanAmount: number;
  description: string[];
};

type SubscriptionPlansProps = {
  options: SubscriptionPlansType[];
  onSelectionChange: (selectedOption: SubscriptionPlansType) => void; // Callback function
};

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ options, onSelectionChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelection = (selectedOption: SubscriptionPlansType) => {
    setSelectedId(selectedOption.id);
    onSelectionChange(selectedOption); // Call the callback function with the selected option
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.container}
          onPress={() => handleSelection(option)}
        >
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>{option.name}</Text>
            <Text style={[styles.priceText, { marginBottom: 10 }]}>
              ₹{option.subscriptionPlanAmount} / mo (₹{option.subscriptionDuration} / year)
            </Text>
            {/* {option.plandetails.map((plans) => (
              <Text style={[styles.priceText, { fontWeight: '600' }]}>
                {plans}
              </Text>
            ))} */}
            <Text style={[styles.priceText, { fontWeight: '600' }]}>{option.description}</Text>
          </View>
          <View style={styles.radioButton}>
            <View
              style={[
                styles.radioButtonIndicator,
                option.id === selectedId && styles.radioButtonSelected,
              ]}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.text,
    backgroundColor: 'white',
  },
  textContainer: {
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  priceText: {
    color:"black",
    fontSize: 16,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5, // Ensure this is always half of the height and width
  },
  radioButtonSelected: {
    backgroundColor: 'green',
    height: 12,
    width: 12,
    borderRadius: 5,
  },

});

export default SubscriptionPlans;
