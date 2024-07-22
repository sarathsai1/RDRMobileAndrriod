import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoundPicker from "./RoundPicker";

type MultiSelectDropDownProps = {
    data: string[];
    label: string;
    selectedItems: string[];
    onSelectionChange: (selectedItems: string[]) => void;
};

type TagProps = {
    item: string;
    onRemove: (item: string) => void;
};

const Tag: React.FC<TagProps> = ({ item, onRemove }) => {
    return (
        <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => onRemove(item)}>
                <Image
                    source={require('../../assets/icons/close_remove.png')}
                    style={styles.tagClose}
                />
            </TouchableOpacity>
        </View>
    );
};



const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({ data, label }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | number>('');

    const handleValueChange = (itemValue: string | number) => {
        if (itemValue !== '') {
            handleSelectItem(itemValue.toString());
            setSelectedValue(''); // Reset the picker value
        }
    };

    const handleSelectItem = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        }
    };


    const removeTag = (item: string) => {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    };

    return (
        <View style={styles.container}>
            <RoundPicker
                selectedValue={selectedValue}
                items={data.map((item) => ({ label: item, value: item }))}
                placeholder={label} // Your placeholder text
                onValueChange={handleValueChange}
            />
            <View style={styles.slectedTagsConetnt}>
                {selectedItems.map((item) => (
                    <Tag key={item} item={item} onRemove={removeTag} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderRadius: 25,
        borderColor: '#D0D5DD',
        backgroundColor: '#F0F1F5',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
    },
    slectedTagsConetnt: {
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    tagText: {
        color: 'white',
    },
    tagClose: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
})

export default MultiSelectDropDown;