import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ModalProps,
} from 'react-native';
import { theme } from '../../../../theme';

interface SortByModalProps extends ModalProps {
  onClose: () => void;
  options: { name: string; value: string }[];
  onOptionSelect: (value: string) => void;
}

const SortByModal: React.FC<SortByModalProps> = ({
  onClose,
  options,
  onOptionSelect,
  ...modalProps
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePress = (value: string) => {
    setSelectedOption(value);
    onOptionSelect(value);
    // onClose(); // Uncomment if you want the modal to close upon selection
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      {...modalProps}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalContent}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => handlePress(option.value)}
            >
              <Text style={styles.optionText}>{option.name}</Text>
              <View style={styles.radioCircle}>
                {selectedOption === option.value && <View style={styles.selectedRadio} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative'
  },
  modalContent: {
    // marginTop: 80, // Adjust this value to move the modal down from the top of the screen
    position: 'absolute',
    top: 130,
    left: 18,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: 250,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

export default SortByModal;
