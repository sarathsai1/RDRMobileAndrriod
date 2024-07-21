import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface RoundPickerProps {
  label?: string;
  selectedValue: string | number;
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
  items: { label: string; value: string | number }[];
  placeholder?: string; // Placeholder text
  style?: object; // To accept custom styles
}

const RoundPicker: React.FC<RoundPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
  placeholder,
  style,
  ...props
}) => {
  // A function to render Picker Items, excluding the selected one if needed
  const renderPickerItems = () => {
    return items
      .filter(item => item.value !== selectedValue) // This excludes the selected item
      .map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ));
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.input, style]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          {...props}
        >
          {selectedValue === '' && placeholder && ( // Display placeholder if no value is selected
            <Picker.Item label={placeholder} value="PO" />
          )}
          {renderPickerItems()}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  label: {
    fontSize: 18,
    color: '#000', // Replace with your theme color
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#D0D5DD',
    backgroundColor: '#F0F1F5',
    justifyContent: 'center', // This centers the picker content
  },
});

export default RoundPicker;
